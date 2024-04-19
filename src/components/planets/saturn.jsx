import { useEffect, useState } from "react";
import { TextureLoader } from "three"; 
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbitCoordinates } from "../../map/coordinate-calculations";

const Saturn = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, searchTerm={searchTerm} }) => {
	const url = `${DOMAIN_URL}2k_saturn.jpg`;
	const planetTexture = useLoader(TextureLoader, url);
	const yearLength = 10757;
	const zoomLevel = 0.50;
	const saturnDiameter = 0.0007785137546; //116,464 km
	const saturnKeplerianValues = {
			semiMajorAxis: [9.53667594, -0.0012506],
			eccentricity: [0.05386179, -0.00050991],
			inclination: [2.48599187, 0.00193609],
			meanLongitude: [49.95424423, 1222.49362201],
			longitudePerihelion: [92.59887831, -0.41897216],
			longitudeAscendNode: [113.66242448, -0.28867794],
	};

	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [saturnOrbit, setSaturnOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		console.log("useEffect() saturn orbit");
		let orbitPath = buildOrbitCoordinates(saturnKeplerianValues, julianEphemerisDate, yearLength);

		//To connect orbit path from last point to first point
		orbitPath.push(orbitPath[0]);

		setSaturnOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		console.log("useEffect() saturn position");
		let coords = buildOrbitCoordinates(saturnKeplerianValues, julianEphemerisDate, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]);
	}, [julianEphemerisDate]);

	if (searchTerm === "saturn") {
		zoomToObject("saturn", zoomLevel, x, y, z);
	}

	return (
		<>
			<mesh position={[x,y,z]}>
				<sphereGeometry args={[saturnDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={saturnOrbit} color={"#66EA05"} lineWidth={2}/>
			<Html position={[x,y,z]}>
				<div className="satellite-label" onClick={() => zoomToObject("saturn", zoomLevel, x, y, z)}>Saturn</div>
			</Html>
		</>
	);
};

export default Saturn;
