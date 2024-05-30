import { useEffect, useState } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbit } from "../../../map/coordinate-calculations";
import { calculateKeplerianRates } from "../../../map/coordinate-calculations";

const Jupiter = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, target, orbitColor }) => {
	const url = `${DOMAIN_URL}2k_jupiter.jpg`;
	const zoomLevel = 1.0;
	const planetTexture = useLoader(TextureLoader, url);
	const siderealPeriod = 4332.589;
	const meanAngularMotion = (2 * Math.PI) / (siderealPeriod);
	const T_a = 2480186.5; //Arbitrary Julian Date
	const M_a = 4.20022402; //Arbitrary Mean Anomoly, obtained from SPICE & associated with J_a
	const timeOfPeriapse = (M_a - meanAngularMotion * T_a) / (-1 * meanAngularMotion);
	const currentMeanAnomoly = (julianEphemerisDate - timeOfPeriapse) * meanAngularMotion;
	const jupiterDiameter = 0.0009346523406; //139,822 km
	const jupiterKeplerianJ2000 = { //obtained from SPICE, J = 2451545
			semiMajorAxis: 4.95071517,
			eccentricity: 0.04972812,
			inclination: 1.30463059,
			longitudeAscendNode: 100.49114995,
			argumentOfPerihelion: 275.45835700,
	};
	const jupiterKeplerianArbitrary = { //obtained from SPICE, J = 2480186.5
			semiMajorAxis: 4.95441073,
			eccentricity: 0.04845395,
			inclination: 1.30234005,
			longitudeAscendNode: 100.63051614,
			argumentOfPerihelion: 272.83478796,
	};
	const jupiterData = {
			meanAngularMotion: meanAngularMotion,
			timeOfPeriapse: timeOfPeriapse,
			centerOfRotation: [0,0,0],
			currentMeanAnomoly: currentMeanAnomoly
	};
	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [jupiterOrbit, setJupiterOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		let jupiterKeplerianRates = calculateKeplerianRates(julianEphemerisDate, jupiterKeplerianJ2000, jupiterKeplerianArbitrary);
		let orbitPath = buildOrbit(julianEphemerisDate, jupiterKeplerianJ2000, jupiterKeplerianRates, jupiterData, siderealPeriod);
		orbitPath.push(orbitPath[0]); //To connect orbit path from last point to first point
		setJupiterOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		let jupiterKeplerianRates = calculateKeplerianRates(julianEphemerisDate, jupiterKeplerianJ2000, jupiterKeplerianArbitrary);
		let coords = buildOrbit(julianEphemerisDate, jupiterKeplerianJ2000, jupiterKeplerianRates, jupiterData, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]); 
		//setShowMoon(true);
	}, [julianEphemerisDate]);

	if (target === "jupiter") {
		zoomToObject("jupiter", "none", zoomLevel, x, y, z);
	}

	return (
		<>
			<mesh position={[x,y,z]}>
				<sphereGeometry args={[jupiterDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={jupiterOrbit} color={orbitColor} lineWidth={2}/>
			<Html position={[x,y,z]}>
				<div className="satellite-label" onClick={() => zoomToObject("jupiter", "none", zoomLevel, x, y, z)}>Jupiter</div>
			</Html>
		</>
	);
};

export default Jupiter;