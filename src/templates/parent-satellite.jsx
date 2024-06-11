import { useEffect, useState } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 
import { Sphere } from "@react-three/drei";

import { buildOrbit } from "../map/coordinate-calculations";
import { calculateKeplerianRates } from "../map/coordinate-calculations";

const ParentSatellite = ({ data, DOMAIN_URL, julianEphemerisDate, targetSelected, innerLabels, planetOrbitColor, setParentTargetCoords, parentTarget }) => {
	console.log("ParentSatellite()");
	//const url = `${DOMAIN_URL}2k_earth_daymap.jpg`;
	const satelliteName = data.name;
	const url = DOMAIN_URL + data.url;
	const zoomLevel = data.zoomLevel;
	const planetTexture = useLoader(TextureLoader, url);
	const meanAngularMotion = (2 * Math.PI) / (data.siderealPeriod);
	const timeOfPeriapse = (data.m_a - meanAngularMotion * data.t_a) / (-1 * meanAngularMotion);
	const currentMeanAnomoly = (julianEphemerisDate - timeOfPeriapse) * meanAngularMotion;
	const diameter = data.diameter;
	const terms = {
			meanAngularMotion: meanAngularMotion,
			timeOfPeriapse: timeOfPeriapse,
			centerOfRotation: [0.111111111,0.111111111,0.111111111], //Sun coords
			currentMeanAnomoly: currentMeanAnomoly
	};
	let labelJSX = null;

	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [orbit, setOrbit] = useState([0, 0, 0]);

	//Called initally once, used to build orbit
	useEffect(() => {
		let keplerianRates = calculateKeplerianRates(julianEphemerisDate, data.keplerianJ2000, data.keplerianArbitrary);
		let orbitPath = buildOrbit(julianEphemerisDate, data.keplerianJ2000, keplerianRates, terms, data.siderealPeriod);
		//console.log(orbitPath);
		orbitPath.push(orbitPath[0]); //To connect orbit path from last point to first point
		setOrbit(orbitPath);
	}, [])

	//Called initally & whenever date updates, used to build planet and set planet position
	useEffect(() => {
		let keplerianRates = calculateKeplerianRates(julianEphemerisDate, data.keplerianJ2000, data.keplerianArbitrary);
		let coords = buildOrbit(julianEphemerisDate, data.keplerianJ2000, keplerianRates, terms, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]); 
		if (satelliteName === parentTarget) {
			setParentTargetCoords([coords[0][0], coords[0][1], coords[0][2]]);
		}
	}, [julianEphemerisDate]);

	if (data.innerSatellite === true && innerLabels === true) {
		labelJSX = <div className="satellite-label" onClick={() => targetSelected(satelliteName, "none", zoomLevel, x, y, z)}>{data.name}</div>
	}
 	else if (data.innerSatellite === true && innerLabels === false) {
		labelJSX = null;
	} else if (data.innerSatellite === false) {
		labelJSX = <div className="satellite-label" onClick={() => targetSelected(satelliteName, "none", zoomLevel, x, y, z)}>{data.name}</div>
	}

	return (
		<>
{/*  			<mesh position={[x, y, z]} >
				<sphereGeometry args={[diameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh> */}
			<Line points={orbit} color={planetOrbitColor} lineWidth={2} renderOrder={1}>
				<lineBasicMaterial />
			</Line>
			<Sphere position={[x, y, z]} renderOrder={0} >
				<sphereGeometry args={[diameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</Sphere>
 			<Html position={[x, y, z]}>
				{labelJSX}
			</Html>
		</>
	);
};

export default ParentSatellite; 