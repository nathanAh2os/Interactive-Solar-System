//https://ssd.jpl.nasa.gov/planets/approx_pos.html
//http://www.stjarnhimlen.se/comp/ppcomp.html#19
//https://wgc.jpl.nasa.gov:8443/webgeocalc/#OrbitalElements

export const buildOrbit = (julianEphemerisDate, kepJ2000, kepRates, data, length) => {
	let orbitPath = [];
	let numberOfPlots = 360;
	let currentMeanAnomoly = data.currentMeanAnomoly;

	if (length > numberOfPlots || length === 1) {
		numberOfPlots = length;
	}

	//Call calculation functions to determine planet orbit position on each day
	for (let i = 0; i < numberOfPlots; i++) {
		let trueKepValues = setTrueKepValues(julianEphemerisDate, kepJ2000, kepRates);
		let eccentricAnomoly = calculateEccentricAnomaly(currentMeanAnomoly, trueKepValues.eccentricity);
		let trueAnomoly = calculateTrueAnomaly(
			eccentricAnomoly,
			trueKepValues.semiMajorAxis,
			trueKepValues.eccentricity
		);
		let currentCoordinate = calculateCoordinates(
			trueKepValues,
			trueAnomoly,
			eccentricAnomoly,
			data.centerOfRotation
		);
		orbitPath.push([currentCoordinate[0], currentCoordinate[1], currentCoordinate[2]]);

		julianEphemerisDate = julianEphemerisDate + length / numberOfPlots;
		currentMeanAnomoly = (julianEphemerisDate - data.timeOfPeriapse) * data.meanAngularMotion;
	}
	return orbitPath;
};

export const calculateKeplerianRates = (T, kepJ2000, kepArbitrary) => {
	//a_r = a_a + a_0 / T
	let semiMajorAxisRate = (kepArbitrary.semiMajorAxis - kepJ2000.semiMajorAxis) / T;
	let eccentricityRate = (kepArbitrary.eccentricity - kepJ2000.eccentricity) / T;
	let inclinationRate = (kepArbitrary.inclination - kepJ2000.inclination) / T;
	let longitudeAscendNodeRate = (kepArbitrary.longitudeAscendNode - kepJ2000.longitudeAscendNode) / T;
	let argumentOfPerihelionRate = (kepArbitrary.argumentOfPerihelion - kepJ2000.argumentOfPerihelion) / T;

	return {
		semiMajorAxisRate: semiMajorAxisRate,
		eccentricityRate: eccentricityRate,
		inclinationRate: inclinationRate,
		longitudeAscendNodeRate: longitudeAscendNodeRate,
		argumentOfPerihelionRate: argumentOfPerihelionRate,
	};
};

//Compute the true value of each of the body's five Keplerian elements based on the Julian Date
//We don't need to calculate the mean anomaly because it has a constant rate
const setTrueKepValues = (julianEphemerisDate, kepJ2000, kepRates) => {
	const J2000 = 2451545; //Julian Ephemeris Date of the reference epoch, J2000
	const centuries = 36525;
	let numberOfCenturiesPast = (julianEphemerisDate - J2000) / centuries;
	// a_t = a_0 + a_r * T
	let trueKeplerianValues = {
		semiMajorAxis: kepJ2000.semiMajorAxis + kepRates.semiMajorAxisRate * numberOfCenturiesPast,
		eccentricity: kepJ2000.eccentricity + kepRates.eccentricityRate * numberOfCenturiesPast,
		inclination: kepJ2000.inclination + kepRates.inclinationRate * numberOfCenturiesPast,
		argumentOfPerihelion: kepJ2000.argumentOfPerihelion + kepRates.argumentOfPerihelionRate * numberOfCenturiesPast,
		longitudeAscendNode: kepJ2000.longitudeAscendNode + kepRates.longitudeAscendNodeRate * numberOfCenturiesPast,
	};
	return trueKeplerianValues;
};

const calculateEccentricAnomaly = (meanAnomaly, eccentricity) => {
	//To calculate the eccentric anomaly, we use Kepler's equation:
	//meanAnomaly = eccentricAnomaly - (eccentricity)sin(eccentricAnomaly) --> M = E = eSin(E)
	//However, Kepler's equation cannot be solved algebraically and requires Newton iterations
	//We will iterate within 0.001 values or 100 times over
	let E = null;
	let F = null;
	let dp = 5; //Decimal places
	let delta = Math.pow(10, -dp);
	let i = 0;
	let maxIter = 30;
	if (eccentricity < 0.8) {
		E = meanAnomaly;
	} else {
		E = Math.PI;
	}
	F = E - eccentricity * Math.sin(meanAnomaly) - meanAnomaly;
	while (Math.abs(F) > delta && i < maxIter) {
		E = E - F / (1.0 - eccentricity * Math.cos(E));
		F = E - eccentricity * Math.sin(E) - meanAnomaly;
		i = i + 1;
	}
	E = E / (Math.PI / 180);
	//eccentricAnomaly = Math.round(E * Math.pow(10, dp)) / Math.pow(10, dp);
	let eccentricAnomaly = E;
	//eccentricAnomaly = Math.round(eccentricity * Math.pow(10, dp)) / Math.pow(10, dp);
	return eccentricAnomaly;
};

const calculateTrueAnomaly = (eccentricAnomaly, semiMajorAxis, eccentricity) => {
	let eccentricAnomalyRad = (eccentricAnomaly * Math.PI) / 180;
	let distanceX = semiMajorAxis * (Math.cos(eccentricAnomalyRad) - eccentricity);
	let distanceY = semiMajorAxis * (Math.sqrt(1 - eccentricity * eccentricity) * Math.sin(eccentricAnomalyRad));
	let trueAnomaly = Math.atan2(distanceY, distanceX);
	return trueAnomaly;
};

const calculateCoordinates = (trueKepValues, trueAnomaly, eccentricAnomaly, centerCoords) => {
	//Convert from degrees to radians
	let longitudeAscendNodeRad = (trueKepValues.longitudeAscendNode * Math.PI) / 180;
	let eccentricAnomalyRad = (eccentricAnomaly * Math.PI) / 180;
	let argumentOfPerihelionRad = (trueKepValues.argumentOfPerihelion * Math.PI) / 180;
	let inclinationRad = (trueKepValues.inclination * Math.PI) / 180;

	//4) Compute planet's heliocentric coordinates
	let distanceX = trueKepValues.semiMajorAxis * (Math.cos(eccentricAnomalyRad) - trueKepValues.eccentricity);
	let distanceY =
		trueKepValues.semiMajorAxis *
		(Math.sqrt(1 - trueKepValues.eccentricity * trueKepValues.eccentricity) * Math.sin(eccentricAnomalyRad));
	let r = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
	let x =
		r *
		(Math.cos(longitudeAscendNodeRad) * Math.cos(argumentOfPerihelionRad + trueAnomaly) -
			Math.sin(longitudeAscendNodeRad) *
				Math.sin(argumentOfPerihelionRad + trueAnomaly) *
				Math.cos(inclinationRad));
	let y =
		r *
		(Math.sin(longitudeAscendNodeRad) * Math.cos(argumentOfPerihelionRad + trueAnomaly) +
			Math.cos(longitudeAscendNodeRad) *
				Math.sin(argumentOfPerihelionRad + trueAnomaly) *
				Math.cos(inclinationRad));
	let z = r * (Math.sin(argumentOfPerihelionRad + trueAnomaly) * Math.sin(inclinationRad));
	//Apply center coords (if around sun just adding 0)
	x = x + centerCoords[0];
	y = y + centerCoords[1];
	z = z + centerCoords[2];
	let coordinates = [x, y, z];
	return coordinates;
};
