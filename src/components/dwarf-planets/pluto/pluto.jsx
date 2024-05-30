import { useEffect, useState } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbit } from "../../../map/coordinate-calculations";
import { calculateKeplerianRates } from "../../../map/coordinate-calculations";

const Pluto = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, target, orbitColor }) => {
	console.log("Pluto()");
	const url = `${DOMAIN_URL}2k_neptune.jpg`;
	const zoomLevel = 0.125;
	const planetTexture = useLoader(TextureLoader, url);
	const siderealPeriod = 90562.56;
	const meanAngularMotion = (2 * Math.PI) / (siderealPeriod);
	const T_a = 2480186.5; //Arbitrary Julian Date
	const M_a = 2.24452195; //Arbitrary Mean Anomoly, obtained from SPICE & associated with J_a
	const timeOfPeriapse = (M_a - meanAngularMotion * T_a) / (-1 * meanAngularMotion);
	const currentMeanAnomoly = (julianEphemerisDate - timeOfPeriapse) * meanAngularMotion;
	const plutoDiameter = 1.58826e-5; //2376 km
	const plutoKeplerianJ2000 = { //obtained from SPICE, J = 2451545
			semiMajorAxis: 29.7002699,
			eccentricity: 0.24944850,
			inclination: 17.23565302,
			longitudeAscendNode: 110.03993995,
			argumentOfPerihelion: 115.17866659,
	};
	const plutoKeplerianArbitrary = { //obtained from SPICE, J = 2480186.5
			semiMajorAxis: 29.2579028,
			eccentricity: 0.25568402,
			inclination: 17.18478072,
			longitudeAscendNode: 111.16248406,
			argumentOfPerihelion: 112.60353204,
	};
	const plutoData = {
			meanAngularMotion: meanAngularMotion,
			timeOfPeriapse: timeOfPeriapse,
			centerOfRotation: [0,0,0],
			currentMeanAnomoly: currentMeanAnomoly
	};
	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [plutoOrbit, setPlutoOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		let plutoKeplerianRates = calculateKeplerianRates(julianEphemerisDate, plutoKeplerianJ2000, plutoKeplerianArbitrary);
		let orbitPath = buildOrbit(julianEphemerisDate, plutoKeplerianJ2000, plutoKeplerianRates, plutoData, siderealPeriod);
		orbitPath.push(orbitPath[0]); //To connect orbit path from last point to first point
		setPlutoOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		let plutoKeplerianRates = calculateKeplerianRates(julianEphemerisDate, plutoKeplerianJ2000, plutoKeplerianArbitrary);
		let coords = buildOrbit(julianEphemerisDate, plutoKeplerianJ2000, plutoKeplerianRates, plutoData, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]); 
	}, [julianEphemerisDate]);

	if (target === "pluto") {
		zoomToObject("pluto", "none", zoomLevel, x, y, z);
	}

	return (
		<>
			<mesh position={[x,y,z]}>
				<sphereGeometry args={[plutoDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={plutoOrbit} color={orbitColor} lineWidth={2} />
			<Html position={[x,y,z]}>
				<div className="satellite-label" onClick={() => zoomToObject("pluto", "none", zoomLevel, x, y, z)}>Pluto</div>
			</Html>
		</>
	);
};

export default Pluto;
