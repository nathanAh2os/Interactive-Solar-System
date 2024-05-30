import { useEffect, useState } from "react";
import { TextureLoader } from "three"; 
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbit } from "../../../map/coordinate-calculations";
import { calculateKeplerianRates } from "../../../map/coordinate-calculations";

const Saturn = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, searchTerm, orbitColor }) => {
	const url = `${DOMAIN_URL}2k_saturn.jpg`;
	const zoomLevel = 0.50;
	const planetTexture = useLoader(TextureLoader, url);
	const siderealPeriod = 10759.22;
	const meanAngularMotion = (2 * Math.PI) / (siderealPeriod);
	const T_a = 2480186.5; //Arbitrary Julian Date
	const M_a = 3.43073683; //Arbitrary Mean Anomoly, obtained from SPICE & associated with J_a
	const timeOfPeriapse = (M_a - meanAngularMotion * T_a) / (-1 * meanAngularMotion);
	const currentMeanAnomoly = (julianEphemerisDate - timeOfPeriapse) * meanAngularMotion;
	const saturnDiameter = 0.0007785137546; //116,464 km
	const saturnKeplerianJ2000 = { //obtained from SPICE, J = 2451545
			semiMajorAxis: 9.0494869, //let semiMajorAxisTrue = 9.0942981; //saturn
			eccentricity: 0.05586067,
			inclination: 2.48425239,
			longitudeAscendNode: 113.69966003,
			argumentOfPerihelion: 335.66245818,
	};
	const saturnKeplerianArbitrary = { //obtained from SPICE, J = 2480186.5
			semiMajorAxis: 9.0942981,
			eccentricity: 0.05084376,
			inclination: 2.49105172,
			longitudeAscendNode: 113.41605679,
			argumentOfPerihelion: 338.60793407,
	};
	const saturnObj = {
			meanAngularMotion: meanAngularMotion,
			timeOfPeriapse: timeOfPeriapse,
			centerOfRotation: [0,0,0],
			currentMeanAnomoly: currentMeanAnomoly
	};

	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [saturnOrbit, setSaturnOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		let saturnKeplerianRates = calculateKeplerianRates(julianEphemerisDate, saturnKeplerianJ2000, saturnKeplerianArbitrary);
		let orbitPath = buildOrbit(julianEphemerisDate, saturnKeplerianJ2000, saturnKeplerianRates, saturnObj, siderealPeriod);
		orbitPath.push(orbitPath[0]); //To connect orbit path from last point to first point
		setSaturnOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		let saturnKeplerianRates = calculateKeplerianRates(julianEphemerisDate, saturnKeplerianJ2000, saturnKeplerianArbitrary);
		let coords = buildOrbit(julianEphemerisDate, saturnKeplerianJ2000, saturnKeplerianRates, saturnObj, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]); 
	}, [julianEphemerisDate]);

	if (searchTerm === "saturn") {
		zoomToObject("saturn", "none", zoomLevel, x, y, z);
	}

	return (
		<>
			<mesh position={[x,y,z]}>
				<sphereGeometry args={[saturnDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={saturnOrbit} color={orbitColor} lineWidth={2}/>
			<Html position={[x,y,z]}>
				<div className="satellite-label" onClick={() => zoomToObject("saturn", "none", zoomLevel, x, y, z)}>Saturn</div>
			</Html>
		</>
	);
};

export default Saturn;
