import { useEffect, useState } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbitCoordinates } from "../../map/coordinate-calculations";

import EarthMoon from "../moons/earth-moon";

const Earth = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, searchTerm, innerLabels }) => {
	console.log("Earth()");
	const yearLength = 366; //365.25 days
	const zoomLevel = 0.25;
	const earthDiameter = 8.5175009e-5; //12,742 km 
	const url = `${DOMAIN_URL}2k_earth_daymap.jpg`;
	const planetTexture = useLoader(TextureLoader, url);
	const earthKeplerianValues = {
			semiMajorAxis: [1.00000261, 0.00000562],
			eccentricity: [0.01671123, -0.00004392],
			inclination: [-0.00001531, -0.01294668],
			meanLongitude: [100.46457166, 35999.37244981],
			longitudePerihelion: [102.93768193, 0.32327364],
			longitudeAscendNode: [0, 0],
	};

	let labelJSX = null;
	let showMoonJSX = null;

	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [earthOrbit, setEarthOrbit] = useState([0, 0, 0]);
	let [showMoon, setShowMoon] = useState(false);

	//Called once, used to build orbit
	useEffect(() => {
		let orbitPath = buildOrbitCoordinates(earthKeplerianValues, julianEphemerisDate, yearLength);

		//To connect orbit path from last point to first point
		orbitPath.push(orbitPath[0]);

		setEarthOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		console.log("earth() useEffect() coords");
		let coords = buildOrbitCoordinates(earthKeplerianValues, julianEphemerisDate, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]);
		setShowMoon(true);
	}, [julianEphemerisDate]);

	if (searchTerm === "earth") {
		zoomToObject("earth", zoomLevel, x, y, z)
	}

	if (innerLabels === true) {
		labelJSX = <div className="satellite-label" onClick={() => zoomToObject("earth", zoomLevel, x, y, z)}>Earth</div>
	} else {
		labelJSX = null;
	}

	if (showMoon === false) {
		showMoonJSX = null;
	} else {
				showMoonJSX = <EarthMoon 
				DOMAIN_URL={DOMAIN_URL} 
				julianEphemerisDate={julianEphemerisDate} 
				zoomToObject={zoomToObject} 
				searchTerm={searchTerm}
				innerLabels={innerLabels}
				earthCoords={[x, y, z]}
			/>
	}

	return (
		<>
 			<mesh position={[x, y, z]}>
				<sphereGeometry args={[earthDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={earthOrbit} color={"#2d35d2"} lineWidth={2} />
 			<Html position={[x, y, z]}>
				{labelJSX}
			</Html>
			{showMoonJSX}
		</>
	);
};

export default Earth;