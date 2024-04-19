
import { useState, useEffect } from "react";
import { TextureLoader } from "three"; 
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbitCoordinates } from "../../map/coordinate-calculations";

const Mars = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, searchTerm, innerLabels }) => {
	console.log("Mars()");
	const url = `${DOMAIN_URL}2k_mars.jpg`;
	const planetTexture = useLoader(TextureLoader, url);
	const yearLength = 688;
	const zoomLevel = 0.25;
	const marsDiameter = 4.53148e-5; //6779 km
	const marsKeplerianValues = {
			semiMajorAxis: [1.52371034, 0.00001847],
			eccentricity: [0.0933941, 0.00007882],
			inclination: [1.84969142, -0.00813131],
			meanLongitude: [-4.55343205, 19140.30268499],
			longitudePerihelion: [-23.94362959, 0.44441088],
			longitudeAscendNode: [49.55953891, -0.29257343],
	};

	let labelJSX = null;

	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [marsOrbit, setMarsOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		console.log("useEffect() mars orbit");
		let orbitPath = buildOrbitCoordinates(marsKeplerianValues, julianEphemerisDate, yearLength);

		//To connect orbit path from last point to first point
		orbitPath.push(orbitPath[0]);

		setMarsOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		console.log("useEffect() mars position");
		let coords = buildOrbitCoordinates(marsKeplerianValues, julianEphemerisDate, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]);
	}, [julianEphemerisDate]);

	if (searchTerm === "mars") {
		zoomToObject("mars", zoomLevel, x, y, z);
	}

	if (innerLabels === true) {
		labelJSX = <div className="satellite-label" onClick={() => zoomToObject("mars", zoomLevel, x, y, z)}>Mars</div>
	} else {
		labelJSX = null;
	}

	return (
		<>
			<mesh position={[x,y,z]}>
				<sphereGeometry args={[marsDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={marsOrbit} color={"red"} lineWidth={2}/>
			<Html position={[x,y,z]}>
				{labelJSX}
			</Html>
		</>
	);
};

export default Mars;