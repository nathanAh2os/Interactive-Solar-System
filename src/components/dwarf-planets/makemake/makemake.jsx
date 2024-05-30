import { useEffect, useState } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbit } from "../../../map/coordinate-calculations";
import { calculateKeplerianRates } from "../../../map/coordinate-calculations";

const Makemake = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, target, innerLabels, moonLabels, orbitColor }) => {
	console.log("Makemake()");
	const url = `${DOMAIN_URL}2k_earth_daymap.jpg`;
	const zoomLevel = 0.25;
	const planetTexture = useLoader(TextureLoader, url);
	const T_a = 2480186.5; //Arbitrary Julian Date
	const M_a = "?"; //Arbitrary Mean Anomoly, obtained from SPICE & associated with J_a
	const siderealPeriod = "?";
	const meanAngularMotion = (2 * Math.PI) / (siderealPeriod);
	const timeOfPeriapse = (M_a - meanAngularMotion * T_a) / (-1 * meanAngularMotion);
	const currentMeanAnomoly = (julianEphemerisDate - timeOfPeriapse) * meanAngularMotion;
	const earthDiameter = 8.5175009e-5; //12,742 km 
	const earthKeplerianJ2000 = { //obtained from SPICE, J = 2451545
			semiMajorAxis: 0.98329413,
			eccentricity: 0.01670545,
			inclination: 0.00010346,
			longitudeAscendNode: 140.29227980,
			argumentOfPerihelion: 322.62519121,
	};
	const earthKeplerianArbitrary = { //obtained from SPICE, J = 2480186.5
			semiMajorAxis: 0.98334884,
			eccentricity: 0.0166693,
			inclination: 0.01024504,
			longitudeAscendNode: 175.07134969,
			argumentOfPerihelion: 290.39955817,
	};
	const earthData = {
			meanAngularMotion: meanAngularMotion,
			timeOfPeriapse: timeOfPeriapse,
			centerOfRotation: [0,0,0],
			currentMeanAnomoly: currentMeanAnomoly
	};
	let labelJSX = null;
	let showMoonJSX = null;

	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [earthOrbit, setEarthOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		let earthKeplerianRates = calculateKeplerianRates(julianEphemerisDate, earthKeplerianJ2000, earthKeplerianArbitrary);
		let orbitPath = buildOrbit(julianEphemerisDate, earthKeplerianJ2000, earthKeplerianRates, earthData, siderealPeriod);
		orbitPath.push(orbitPath[0]); //To connect orbit path from last point to first point
		setEarthOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		let earthKeplerianRates = calculateKeplerianRates(julianEphemerisDate, earthKeplerianJ2000, earthKeplerianArbitrary);
		let coords = buildOrbit(julianEphemerisDate, earthKeplerianJ2000, earthKeplerianRates, earthData, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]); 
	}, [julianEphemerisDate]);

	if (innerLabels === true) {
		labelJSX = <div className="satellite-label" onClick={() => zoomToObject("makemake", zoomLevel, x, y, z)}>Makemake</div>
	} else {
		labelJSX = null;
	}

	if (target === "makemake") {
		showMoonJSX = null; //something later
	} else {
		showMoonJSX = null;
	}
	return (
		<>
 			<mesh position={[x, y, z]}>
				<sphereGeometry args={[earthDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={earthOrbit} color={orbitColor} lineWidth={2} />
 			<Html position={[x, y, z]}>
				{labelJSX}
			</Html>
			{showMoonJSX}
		</>
	);
};

export default Makemake;