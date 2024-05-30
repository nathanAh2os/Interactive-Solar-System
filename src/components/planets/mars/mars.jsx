
import { useState, useEffect } from "react";
import { TextureLoader } from "three"; 
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbit } from "../../../map/coordinate-calculations";
import { calculateKeplerianRates } from "../../../map/coordinate-calculations";

const Mars = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, target, innerLabels, orbitColor }) => {
	const url = `${DOMAIN_URL}2k_mars.jpg`;
	const zoomLevel = 0.25;
	const planetTexture = useLoader(TextureLoader, url);
	const siderealPeriod = 686.98;
	const meanAngularMotion = (2 * Math.PI) / (siderealPeriod);
	const T_a = 2480186.5; //Arbitrary Julian Date
	const M_a = 4.68047944; //Arbitrary Mean Anomoly, obtained from SPICE & associated with J_a
	const timeOfPeriapse = (M_a - meanAngularMotion * T_a) / (-1 * meanAngularMotion);
	const currentMeanAnomoly = (julianEphemerisDate - timeOfPeriapse) * meanAngularMotion;
	const marsDiameter = 4.53148e-5; //6779 km
	const marsKeplerianJ2000 = { //obtained from SPICE, J = 2451545
		semiMajorAxis: 1.38149677,
		eccentricity: 0.09331543,
		inclination: 1.84987648,
		longitudeAscendNode: 49.56200566,
		argumentOfPerihelion: 286.53746157,
	};
	const marsKeplerianArbitrary = { //obtained from SPICE, J = 2480186.5
		semiMajorAxis: 1.38135367,
		eccentricity: 0.09345692,
		inclination: 1.84332745,
		longitudeAscendNode: 49.33101299,
		argumentOfPerihelion: 287.03898861,
	};
	const marsData = {
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
	let [marsOrbit, setMarsOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		let marsKeplerianRates = calculateKeplerianRates(julianEphemerisDate, marsKeplerianJ2000, marsKeplerianArbitrary);
		let orbitPath = buildOrbit(julianEphemerisDate, marsKeplerianJ2000, marsKeplerianRates, marsData, siderealPeriod);
		orbitPath.push(orbitPath[0]); //To connect orbit path from last point to first point
		setMarsOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		let marsKeplerianRates = calculateKeplerianRates(julianEphemerisDate, marsKeplerianJ2000, marsKeplerianArbitrary);
		let coords = buildOrbit(julianEphemerisDate, marsKeplerianJ2000, marsKeplerianRates, marsData, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]); 
	}, [julianEphemerisDate]);

	if (target === "mars") {
		zoomToObject("mars", "none", zoomLevel, x, y, z);
	}

	if (innerLabels === true) {
		labelJSX = <div className="satellite-label" onClick={() => zoomToObject("mars", "none", zoomLevel, x, y, z)}>Mars</div>
	} else {
		labelJSX = null;
	}

	return (
		<>
			<mesh position={[x,y,z]}>
				<sphereGeometry args={[marsDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={marsOrbit} color={orbitColor} lineWidth={2}/>
			<Html position={[x,y,z]}>
				{labelJSX}
			</Html>
		</>
	);
};

export default Mars;