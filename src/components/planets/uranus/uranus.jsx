import { useEffect, useState } from "react";
import { TextureLoader } from "three"; 
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbit } from "../../../map/coordinate-calculations";
import { calculateKeplerianRates } from "../../../map/coordinate-calculations";

const Uranus = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, target, orbitColor }) => {
	const url = `${DOMAIN_URL}2k_uranus.jpg`;
	const zoomLevel = 0.50;
	const planetTexture = useLoader(TextureLoader, url);
	const siderealPeriod = 30689.15;
	const meanAngularMotion = (2 * Math.PI) / (siderealPeriod);
	const T_a = 2480186.5; //Arbitrary Julian Date
	const M_a = 1.95547809; //Arbitrary Mean Anomoly, obtained from SPICE & associated with J_a
	const timeOfPeriapse = (M_a - meanAngularMotion * T_a) / (-1 * meanAngularMotion);
	const currentMeanAnomoly = (julianEphemerisDate - timeOfPeriapse) * meanAngularMotion;
	const uranusDiameter = 0.000339068997; //50,724 km
	const uranusKeplerianJ2000 = { //obtained from SPICE, J = 2451545
			semiMajorAxis: 18.3778869,
			eccentricity: 0.04435828,
			inclination: 0.77265893,
			longitudeAscendNode: 74.00247588,
			argumentOfPerihelion: 96.62326523,
	};
	const uranusKeplerianArbitrary = { //obtained from SPICE, J = 2480186.5
			semiMajorAxis: 18.4063347,
			eccentricity: 0.04591317,
			inclination: 0.77099597,
			longitudeAscendNode: 74.02983165,
			argumentOfPerihelion: 103.06980275,
	};
	const uranusData = {
			meanAngularMotion: meanAngularMotion,
			timeOfPeriapse: timeOfPeriapse,
			centerOfRotation: [0,0,0],
			currentMeanAnomoly: currentMeanAnomoly
	};
	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [uranusOrbit, setUranusOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		let uranusKeplerianRates = calculateKeplerianRates(julianEphemerisDate, uranusKeplerianJ2000, uranusKeplerianArbitrary);
		let orbitPath = buildOrbit(julianEphemerisDate, uranusKeplerianJ2000, uranusKeplerianRates, uranusData, siderealPeriod);
		orbitPath.push(orbitPath[0]); //To connect orbit path from last point to first point
		setUranusOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		let uranusKeplerianRates = calculateKeplerianRates(julianEphemerisDate, uranusKeplerianJ2000, uranusKeplerianArbitrary);
		let coords = buildOrbit(julianEphemerisDate, uranusKeplerianJ2000, uranusKeplerianRates, uranusData, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]); 
	}, [julianEphemerisDate]);

	if (target === "uranus") {
		zoomToObject("uranus", "none", zoomLevel, x, y, z);
	}

	return (
		<>
			<mesh position={[x,y,z]}>
				<sphereGeometry args={[uranusDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={uranusOrbit} color={orbitColor} />
			<Html position={[x,y,z]}>
				<div className="satellite-label" onClick={() => zoomToObject("uranus", "none", zoomLevel, x, y, z)}>Uranus</div>
			</Html>
		</>
	);
};

export default Uranus;
