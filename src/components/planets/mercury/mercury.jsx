import { useEffect, useState } from "react";
import { TextureLoader } from "three"; 
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbit } from "../../../map/coordinate-calculations";
import { calculateKeplerianRates } from "../../../map/coordinate-calculations";

const Mercury = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, target, innerLabels, orbitColor }) => {
	const url = `${DOMAIN_URL}2k_mercury.jpg`;
	const zoomLevel = 0.125;
	const planetTexture = useLoader(TextureLoader, url);
	const siderealPeriod = 87.97;
	const meanAngularMotion = (2 * Math.PI) / (siderealPeriod);
	const T_a = 2480186.5; //Arbitrary Julian Date
	const M_a = 4.68047944; //Arbitrary Mean Anomoly, obtained from SPICE & associated with J_a
	const timeOfPeriapse = (M_a - meanAngularMotion * T_a) / (-1 * meanAngularMotion);
	const currentMeanAnomoly = (julianEphemerisDate - timeOfPeriapse) * meanAngularMotion;
	const mercuryDiameter = 0.0000326141; //4879 km
	const mercuryKeplerianJ2000 = { //obtained from SPICE, J = 2451545
			semiMajorAxis: 0.30749918,
			eccentricity: 0.20563016,
			inclination: 7.00501430,
			longitudeAscendNode: 48.33053855,
			argumentOfPerihelion: 29.12428449,
	};
	const mercuryKeplerianArbitrary = { //obtained from SPICE, J = 2480186.5
			semiMajorAxis: 0.30749112,
			eccentricity: 0.20565207,
			inclination: 7.00034185,
			longitudeAscendNode: 48.23282258,
			argumentOfPerihelion: 29.34772765,
	};
	const mercuryData = {
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
	let [mercuryOrbit, setMercuryOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		let mercuryKeplerianRates = calculateKeplerianRates(julianEphemerisDate, mercuryKeplerianJ2000, mercuryKeplerianArbitrary);
		let orbitPath = buildOrbit(julianEphemerisDate, mercuryKeplerianJ2000, mercuryKeplerianRates, mercuryData, siderealPeriod);
		orbitPath.push(orbitPath[0]); //To connect orbit path from last point to first point
		setMercuryOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		let mercuryKeplerianRates = calculateKeplerianRates(julianEphemerisDate, mercuryKeplerianJ2000, mercuryKeplerianArbitrary);
		let coords = buildOrbit(julianEphemerisDate, mercuryKeplerianJ2000, mercuryKeplerianRates, mercuryData, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]); 
	}, [julianEphemerisDate]);

	if (target === "mercury") {
		zoomToObject("mercury", "none", zoomLevel, x, y, z);
	}

	if (innerLabels === true) {
		labelJSX = <div className="satellite-label" onClick={() => zoomToObject("mercury", "none", zoomLevel, x, y, z)}>Mercury</div>
	} else {
		labelJSX = null;
	}

	return (
		<>
			<mesh position={[x,y,z]}>
				<sphereGeometry args={[mercuryDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={mercuryOrbit} color={orbitColor} lineWidth={2}/>
			<Html position={[x,y,z]}>
				{labelJSX}
			</Html>
		</>
	);
};

export default Mercury;
