import { useEffect, useState } from "react";
import { TextureLoader } from "three"; 
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbit } from "../../../map/coordinate-calculations";
import { calculateKeplerianRates } from "../../../map/coordinate-calculations";

const Neptune = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, target, orbitColor }) => {
	const url = `${DOMAIN_URL}2k_neptune.jpg`;
	const zoomLevel = 0.25;
	const planetTexture = useLoader(TextureLoader, url);
	const siderealPeriod = 60189;
	const meanAngularMotion = (2 * Math.PI) / (siderealPeriod);
	const T_a = 2480186.5; //Arbitrary Julian Date
	const M_a = 1.6763544; //Arbitrary Mean Anomoly, obtained from SPICE & associated with J_a
	const timeOfPeriapse = (M_a - meanAngularMotion * T_a) / (-1 * meanAngularMotion);
	const currentMeanAnomoly = (julianEphemerisDate - timeOfPeriapse) * meanAngularMotion;
	const neptuneDiameter = 0.000329175808; //49,244 km
	const neptuneKeplerianJ2000 = { //obtained from SPICE, J = 2451545
			semiMajorAxis: 29.7584523,
			eccentricity: 0.01119955,
			inclination: 1.77021584,
			longitudeAscendNode: 131.78386916,
			argumentOfPerihelion: 267.04678500,
	};
	const neptuneKeplerianArbitrary = { //obtained from SPICE, J = 2480186.5
			semiMajorAxis: 29.7599168,
			eccentricity: 0.00681429,
			inclination: 1.7650089,
			longitudeAscendNode: 131.8344887,
			argumentOfPerihelion: 248.47255473,
	};
	const neptuneData = {
			meanAngularMotion: meanAngularMotion,
			timeOfPeriapse: timeOfPeriapse,
			centerOfRotation: [0,0,0],
			currentMeanAnomoly: currentMeanAnomoly
	};
	
	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [neptuneOrbit, setNeptuneOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		let neptuneKeplerianRates = calculateKeplerianRates(julianEphemerisDate, neptuneKeplerianJ2000, neptuneKeplerianArbitrary);
		let orbitPath = buildOrbit(julianEphemerisDate, neptuneKeplerianJ2000, neptuneKeplerianRates, neptuneData, siderealPeriod);
		orbitPath.push(orbitPath[0]); //To connect orbit path from last point to first point
		setNeptuneOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		let neptuneKeplerianRates = calculateKeplerianRates(julianEphemerisDate, neptuneKeplerianJ2000, neptuneKeplerianArbitrary);
		let coords = buildOrbit(julianEphemerisDate, neptuneKeplerianJ2000, neptuneKeplerianRates, neptuneData, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]); 
	}, [julianEphemerisDate]);

	if (target === "neptune") {
		zoomToObject("neptune", "none", zoomLevel, x, y, z);
	}

	return (
		<>
			<mesh position={[x,y,z]}>
				<sphereGeometry args={[neptuneDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={neptuneOrbit} color={orbitColor} lineWidth={2}/>
			<Html position={[x,y,z]}>
				<div className="satellite-label" onClick={() => zoomToObject("neptune", "none", zoomLevel, x, y, z)}>Neptune</div>
			</Html>
		</>
	);
};

export default Neptune;
