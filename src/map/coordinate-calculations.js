//https://ssd.jpl.nasa.gov/planets/approx_pos.html
////http://www.stjarnhimlen.se/comp/ppcomp.html#19

//Called from jsx components
export const buildOrbitCoordinates = (keplerianValues, julianEphemerisDate, yearLength) => {
	let orbitPath = [];

	//Call calculation functions to determine planet orbit position on each day
	for (let i = 0; i < yearLength; i++) {
		let trueKeplerianValues = setTrueKeplerianValues(keplerianValues, julianEphemerisDate);
		//console.log(trueKeplerianValues);
		let meanAnomaly = calculateMeanAnomaly(
			trueKeplerianValues.meanLongitude,
			trueKeplerianValues.longitudePerihelion
		);
		let eccentricAnomaly = calculateEccentricAnomaly(meanAnomaly, trueKeplerianValues.eccentricity);
		let currentCoordinate = calculateCoordinates(eccentricAnomaly, trueKeplerianValues);
		//orbitPath.push(new THREE.Vector3(currentCoordinate[0], currentCoordinate[1], currentCoordinate[2]));
		orbitPath.push([currentCoordinate[0], currentCoordinate[1], currentCoordinate[2]]);
		julianEphemerisDate++;
	}
	return orbitPath;
};

//https://orbital-mechanics.space/the-orbit-equation/elliptical-orbits.html
export const buildMoonOrbitCoordinates = (a, e, parentCoords) => {
	console.log("buildMoonOrbitCoordinates()");
	let orbitPath = [];

	for (let i = 1; i < 361; i++) {
		let radianAngle = (i * Math.PI) / 180;
		let r = a * (((1 - e) ^ 2) / (1 + e * Math.cos(radianAngle)));
		let distanceX = Math.abs(r) * Math.cos(radianAngle);
		let distanceY = Math.abs(r) * Math.sin(radianAngle);
		let z = parentCoords[2];
		let x = parentCoords[0] + distanceX;
		let y = parentCoords[1] + distanceY;
		orbitPath.push([x, y, z]);
	}
	return orbitPath;
};

//Compute the true value of each of the planet's six Keplerian elements based on the Julian Date
const setTrueKeplerianValues = (keplerianValues, julianEphemerisDate) => {
	//2451545 is the Julian Ephemeris Date of the reference epoch
	let numberOfCenturiesPast = (julianEphemerisDate - 2451545) / 36525;
	let trueKeplerianValues = {
		semiMajorAxis: keplerianValues.semiMajorAxis[0] + keplerianValues.semiMajorAxis[1] * numberOfCenturiesPast,
		eccentricity: keplerianValues.eccentricity[0] + keplerianValues.eccentricity[1] * numberOfCenturiesPast,
		inclination: keplerianValues.inclination[0] + keplerianValues.inclination[1] * numberOfCenturiesPast,
		meanLongitude: keplerianValues.meanLongitude[0] + keplerianValues.meanLongitude[1] * numberOfCenturiesPast,
		longitudePerihelion:
			keplerianValues.longitudePerihelion[0] + keplerianValues.longitudePerihelion[1] * numberOfCenturiesPast,
		longitudeAscendNode:
			keplerianValues.longitudeAscendNode[0] + keplerianValues.longitudeAscendNode[1] * numberOfCenturiesPast,
	};
	return trueKeplerianValues;
};

const calculateMeanAnomaly = (meanLongitude, longitudePerihelion) => {
	//Compute argument of perihelion, and mean anomaly, M
	//We obtain the modulas of the mean anomaly between -360 <= M <= 360
	//let perihelion = longitudePerihelion - longitudeAscendNode;
	let meanAnomaly = meanLongitude - longitudePerihelion;
	meanAnomaly = (meanAnomaly * Math.PI) / 180;
	return meanAnomaly;
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

const calculateCoordinates = (eccentricAnomaly, trueKeplerianValues) => {
	//Convert from degrees to radians
	let eccentricAnomalyRad = (eccentricAnomaly * Math.PI) / 180;
	let longitudeAscendNodeRad = (trueKeplerianValues.longitudeAscendNode * Math.PI) / 180;
	//let longitudePerihelionRad = (trueKeplerianValues.longitudePerihelion * Math.PI) / 180;
	let longitudePerihelionRad = (trueKeplerianValues.longitudeAscendNode * Math.PI) / 180;
	let inclinationRad = (trueKeplerianValues.inclination * Math.PI) / 180;
	let semiMajorAxis = trueKeplerianValues.semiMajorAxis;
	let eccentricity = trueKeplerianValues.eccentricity;

	//4) Compute planet's heliocentric coordinates
	let distanceX = semiMajorAxis * (Math.cos(eccentricAnomalyRad) - eccentricity);
	let distanceY = semiMajorAxis * (Math.sqrt(1 - eccentricity * eccentricity) * Math.sin(eccentricAnomalyRad));
	let trueAnomaly = Math.atan2(distanceY, distanceX);
	let argumentPerihelion = longitudePerihelionRad - longitudeAscendNodeRad;
	let r = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
	let x =
		r *
		(Math.cos(longitudeAscendNodeRad) * Math.cos(argumentPerihelion + trueAnomaly) -
			Math.sin(longitudeAscendNodeRad) * Math.sin(argumentPerihelion + trueAnomaly) * Math.cos(inclinationRad));
	let y =
		r *
		(Math.sin(longitudeAscendNodeRad) * Math.cos(argumentPerihelion + trueAnomaly) +
			Math.cos(longitudeAscendNodeRad) * Math.sin(argumentPerihelion + trueAnomaly) * Math.cos(inclinationRad));
	let z = r * (Math.sin(argumentPerihelion + trueAnomaly) * Math.sin(inclinationRad));
	let coordinates = [x, y, z];
	return coordinates;
};

//export default buildOrbitCoordinates;

//export default { buildOrbitCoordinates, buildMoonOrbitCoordinates };
