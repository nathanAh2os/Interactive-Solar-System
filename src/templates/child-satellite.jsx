import { useEffect, useState } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbit } from "../map/coordinate-calculations";
import { calculateKeplerianRates } from "../map/coordinate-calculations";

const ChildSatellite = ({ data, DOMAIN_URL, julianEphemerisDate, targetSelected, setTargetMoonsCoords, parentTarget, moonLabels, moonOrbitColor, centerOfRotation }) => {
	console.log("ChildSatellite()");
	//const url = `${DOMAIN_URL}2k_earth_daymap.jpg`;
    const name = data.name;
	const diameter = data.diameter;
	const siderealPeriod = data.siderealPeriod;
	const zoomLevel = data.zoomLevel;
	const keplerianJ2000 = data.keplerianJ2000;
	const keplerianArbitrary = data.keplerianArbitrary;
	const url = DOMAIN_URL + data.url;
	const planetTexture = useLoader(TextureLoader, url);
	const meanAngularMotion = (2 * Math.PI) / (siderealPeriod);
	const timeOfPeriapse = (data.m_a - meanAngularMotion * data.t_a) / (-1 * meanAngularMotion);
	const currentMeanAnomoly = (julianEphemerisDate - timeOfPeriapse) * meanAngularMotion;
	const terms = {
			meanAngularMotion: meanAngularMotion,
			timeOfPeriapse: timeOfPeriapse,
			centerOfRotation: centerOfRotation,
			currentMeanAnomoly: currentMeanAnomoly
	};
	let labelJSX = null;

	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [orbit, setOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		let keplerianRates = calculateKeplerianRates(julianEphemerisDate, keplerianJ2000, keplerianArbitrary);
		let orbitPath = buildOrbit(julianEphemerisDate, keplerianJ2000, keplerianRates, terms, siderealPeriod);
		orbitPath.push(orbitPath[0]); //To connect orbit path from last point to first point
		setOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		let keplerianRates = calculateKeplerianRates(julianEphemerisDate, keplerianJ2000, keplerianArbitrary);
		let coords = buildOrbit(julianEphemerisDate, keplerianJ2000, keplerianRates, terms, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]);
		setTargetMoonsCoords(current => [...current, {name: name, zoomLevel: zoomLevel, x: coords[0][0], y: coords[0][1], z: coords[0][2]}]);
	}, [julianEphemerisDate]);

	if (moonLabels === true) {
		labelJSX = <div className="satellite-label" onClick={() => targetSelected(parentTarget, name, zoomLevel, x, y, z)}>{name}</div>
	}

	return (
		<>
 			<mesh position={[x + centerOfRotation[0], y + centerOfRotation[1], z + centerOfRotation[2]]} renderOrder={2}>
				<sphereGeometry args={[diameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={orbit} color={moonOrbitColor} lineWidth={2} position={centerOfRotation} renderOrder={3}/>
 			<Html position={[x + centerOfRotation[0], y + centerOfRotation[1], z + centerOfRotation[2]]}>
				{labelJSX}
			</Html>
		</>
	);
};

export default ChildSatellite;