import { useEffect, useState } from "react";
import { TextureLoader } from "three"; 
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbit } from "../../../map/coordinate-calculations";
import { calculateKeplerianRates } from "../../../map/coordinate-calculations";

const Venus = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, target, innerLabels, orbitColor }) => {
	const url = `${DOMAIN_URL}2k_venus_surface.jpg`;
	const zoomLevel = 0.125;
	const planetTexture = useLoader(TextureLoader, url);
	const siderealPeriod = 224.7;
	const meanAngularMotion = (2 * Math.PI) / (siderealPeriod);
	const T_a = 2480186.5; //Arbitrary Julian Date
	const M_a = 3.80692329; //Arbitrary Mean Anomoly, obtained from SPICE & associated with J_a
	const timeOfPeriapse = (M_a - meanAngularMotion * T_a) / (-1 * meanAngularMotion);
	const currentMeanAnomoly = (julianEphemerisDate - timeOfPeriapse) * meanAngularMotion;
	const venusDiameter = 8.0910243e-5; //12,104 km
	const venusKeplerianJ2000 = { //obtained from SPICE, J = 2451545
			semiMajorAxis: 0.71844093,
			eccentricity: 0.00675735,
			inclination: 3.39458965,
			longitudeAscendNode: 76.67837412,
			argumentOfPerihelion: 55.20203103,
	};
	const venusKeplerianArbitrary = { //obtained from SPICE, J = 2480186.5
			semiMajorAxis: 0.71846185,
			eccentricity: 0.00672519,
			inclination: 3.39403329,
			longitudeAscendNode: 76.46266923,
			argumentOfPerihelion: 54.81687779,
	};
	const venusData = {
			meanAngularMotion: meanAngularMotion,
			timeOfPeriapse: timeOfPeriapse,
			centerOfRotation: [0,0,0],
			currentMeanAnomoly: currentMeanAnomoly
	};
	let labelJSX = null;

	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [venusOrbit, setVenusOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		let venusKeplerianRates = calculateKeplerianRates(julianEphemerisDate, venusKeplerianJ2000, venusKeplerianArbitrary);
		let orbitPath = buildOrbit(julianEphemerisDate, venusKeplerianJ2000, venusKeplerianRates, venusData, siderealPeriod);
		orbitPath.push(orbitPath[0]); //To connect orbit path from last point to first point
		setVenusOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		let venusKeplerianRates = calculateKeplerianRates(julianEphemerisDate, venusKeplerianJ2000, venusKeplerianArbitrary);
		let coords = buildOrbit(julianEphemerisDate, venusKeplerianJ2000, venusKeplerianRates, venusData, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]); 
	}, [julianEphemerisDate]);

	if (target === "venus") {
		zoomToObject("venus", "none", zoomLevel, x, y, z);
	}

	if (innerLabels === true) {
		labelJSX = <div className="satellite-label" onClick={() => zoomToObject("venus", "none", zoomLevel, x, y, z)}>Venus</div>
	} else {
		labelJSX = null;
	}

	return (
		<>
			<mesh position={[x,y,z]}>
				<sphereGeometry args={[venusDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={venusOrbit} color={orbitColor}/>
			<Html position={[x,y,z]}>
				{labelJSX}
			</Html>
		</>
	);
};

export default Venus;
