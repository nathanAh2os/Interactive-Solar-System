import { useEffect, useState } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbitCoordinates } from "../../map/coordinate-calculations";

const Jupiter = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, searchTerm }) => {
	const url = `${DOMAIN_URL}2k_jupiter.jpg`;
	const planetTexture = useLoader(TextureLoader, url);
	const yearLength = 4334;
	const zoomLevel = 0.50;
	const jupiterDiameter = 0.0009346523406; //139,822 km
	const jupiterKeplerianValues = {
			semiMajorAxis: [5.202887, -0.00011607],
			eccentricity: [0.04838624, -0.00013253],
			inclination: [1.30439695, -0.00183714],
			meanLongitude: [34.39664051, 3034.74612775],
			longitudePerihelion: [14.72847983, 0.21252668],
			longitudeAscendNode: [100.47390909, 0.20469106]
	};

	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [jupiterOrbit, setJupiterOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		console.log("useEffect() jupiter orbit");
		let orbitPath = buildOrbitCoordinates(jupiterKeplerianValues, julianEphemerisDate, yearLength);

		//To connect orbit path from last point to first point
		orbitPath.push(orbitPath[0]);

		setJupiterOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		console.log("useEffect() jupiter position");
		let coords = buildOrbitCoordinates(jupiterKeplerianValues, julianEphemerisDate, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]);
	}, [julianEphemerisDate]);

	if (searchTerm === "jupiter") {
		zoomToObject("jupiter", zoomLevel, x, y, z);
	}

	return (
		<>
			<mesh position={[x,y,z]}>
				<sphereGeometry args={[jupiterDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={jupiterOrbit} color={"#0D86FF"} lineWidth={2}/>
			<Html position={[x,y,z]}>
				<div className="satellite-label" onClick={() => zoomToObject("jupiter", zoomLevel, x, y, z)}>Jupiter</div>
			</Html>
		</>
	);
};

export default Jupiter;