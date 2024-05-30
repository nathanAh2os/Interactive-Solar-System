import { useEffect, useState } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbit } from "../../../map/coordinate-calculations";
import { calculateKeplerianRates } from "../../../map/coordinate-calculations";

const EarthMoon = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, moonLabels, moonOrbitColor, earthCoords }) => {
	console.log("EarthMoon()");
	const url = `${DOMAIN_URL}2k_neptune.jpg`;
	const zoomLevel = 0.25;
	const planetTexture = useLoader(TextureLoader, url);
	const siderealPeriod = 27.322;
	const meanAngularMotion = (2 * Math.PI) / (siderealPeriod);
	const T_a = 2480186.5; //Arbitrary Julian Date
	const M_a = 4.96980439; //Arbitrary Mean Anomoly, obtained from SPICE & associated with J_a
	const timeOfPeriapse = (M_a - meanAngularMotion * T_a) / (-1 * meanAngularMotion);
	const currentMeanAnomoly = (julianEphemerisDate - timeOfPeriapse) * meanAngularMotion;
	const earthMoonDiameter = 1.58826e-5; //2376 km
	const moonKeplerianJ2000 = { //obtained from SPICE, J = 2451545
			semiMajorAxis: 0.00244289,
			eccentricity: 0.05357474,
			inclination: 5.24027300,
			longitudeAscendNode: 123.95805544,
			argumentOfPerihelion: 315.43420620,
	};
	const moonKeplerianArbitrary = { //obtained from SPICE, J = 2480186.5
			semiMajorAxis: 0.0024487,
			eccentricity: 0.04985445,
			inclination: 5.24150766,
			longitudeAscendNode: 48.21595207,
			argumentOfPerihelion: 355.27377926,
	};
	const moonData = {
			meanAngularMotion: meanAngularMotion,
			timeOfPeriapse: timeOfPeriapse,
			centerOfRotation: earthCoords,
			currentMeanAnomoly: currentMeanAnomoly
		};
	//State values
 	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0); 
	let [earthMoonOrbit, setEarthMoonOrbit] = useState([0,0,0]);
	let labelJSX = null;

	//Called once, used to build orbit
	useEffect(() => {
		let moonKeplerianRates = calculateKeplerianRates(julianEphemerisDate, moonKeplerianJ2000, moonKeplerianArbitrary);
		let orbitPath = buildOrbit(julianEphemerisDate, moonKeplerianJ2000, moonKeplerianRates, moonData, siderealPeriod);
		orbitPath.push(orbitPath[0]); //To connect orbit path from last point to first point
		setEarthMoonOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		let moonKeplerianRates = calculateKeplerianRates(julianEphemerisDate, moonKeplerianJ2000, moonKeplerianArbitrary);
		let coords = buildOrbit(julianEphemerisDate, moonKeplerianJ2000, moonKeplerianRates, moonData, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]); 
	}, [julianEphemerisDate]);

	if (moonLabels === true) {
		labelJSX = <div className="satellite-label" onClick={() => zoomToObject("earth", "moon", zoomLevel, x, y, z)}>Moon</div>
	} else {
		labelJSX = null;
	}

	return (
		<>
 			<mesh position={[x,y,z]}>
				<sphereGeometry args={[earthMoonDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh> 
			<Line points={earthMoonOrbit} color={moonOrbitColor} lineWidth={2} />
			<Html position={[x, y, z]}>
				{labelJSX}
			</Html>
		</>
	);
};

export default EarthMoon;
