import { useEffect, useState } from "react";
import { TextureLoader } from "three"; 
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbitCoordinates } from "../../map/coordinate-calculations";

const Uranus = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, searchTerm }) => {
	const url = `${DOMAIN_URL}2k_uranus.jpg`;
	const planetTexture = useLoader(TextureLoader, url);
	const yearLength = 30689;
	const zoomLevel = 0.50;
	const uranusDiameter = 0.000339068997; //50,724 km
	const uranusKeplerianValues = {
			semiMajorAxis: [19.18916464, -0.00196176],
			eccentricity: [0.04725744, -0.00004397],
			inclination: [0.77263783, -0.00242939],
			meanLongitude: [313.23810451, 428.48202785],
			longitudePerihelion: [170.9542763, 0.40805281],
			longitudeAscendNode: [74.01692503, 0.04240589],
	};

	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [uranusOrbit, setUranusOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		console.log("useEffect() uranus orbit");
		let orbitPath = buildOrbitCoordinates(uranusKeplerianValues, julianEphemerisDate, yearLength);

		//To connect orbit path from last point to first point
		orbitPath.push(orbitPath[0]);

		setUranusOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		console.log("useEffect() uranus position");
		let coords = buildOrbitCoordinates(uranusKeplerianValues, julianEphemerisDate, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]);
	}, [julianEphemerisDate]);

	if (searchTerm === "uranus") {
		zoomToObject("uranus", zoomLevel, x, y, z);
	}

	return (
		<>
			<mesh position={[x,y,z]}>
				<sphereGeometry args={[uranusDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={uranusOrbit} color={"#0D86FF"} />
			<Html position={[x,y,z]}>
				<div className="satellite-label" onClick={() => zoomToObject("uranus", zoomLevel, x, y, z)}>Uranus</div>
			</Html>
		</>
	);
};

export default Uranus;
