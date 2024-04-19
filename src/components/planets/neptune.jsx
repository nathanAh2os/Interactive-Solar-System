import { useEffect, useState } from "react";
import { TextureLoader } from "three"; 
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbitCoordinates } from "../../map/coordinate-calculations";

const Neptune = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, searchTerm }) => {
	const url = `${DOMAIN_URL}2k_neptune.jpg`;
	const planetTexture = useLoader(TextureLoader, url);
	const yearLength = 60193;
	const zoomLevel = 0.25;
	const neptuneDiameter = 0.000329175808; //49,244 km
	const neptuneKeplerianValues = {
			semiMajorAxis: [30.06992276, 0.00026291],
			eccentricity: [0.00859048, 0.00005105],
			inclination: [1.77004347, 0.00035372],
			meanLongitude: [-55.12002969, 218.45945325],
			longitudePerihelion: [44.96476227, -0.32241464],
			longitudeAscendNode: [131.78422574, -0.00508664],
	};

	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [neptuneOrbit, setNeptuneOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		console.log("useEffect() neptune orbit");
		let orbitPath = buildOrbitCoordinates(neptuneKeplerianValues, julianEphemerisDate, yearLength);

		//To connect orbit path from last point to first point
		orbitPath.push(orbitPath[0]);

		setNeptuneOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		console.log("useEffect() neptune position");
		let coords = buildOrbitCoordinates(neptuneKeplerianValues, julianEphemerisDate, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]);
	}, [julianEphemerisDate]);

	if (searchTerm === "neptune") {
		zoomToObject("neptune", zoomLevel, x, y, z);
	}

	return (
		<>
			<mesh position={[x,y,z]}>
				<sphereGeometry args={[neptuneDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={neptuneOrbit} color={"#07ED54"} lineWidth={2}/>
			<Html position={[x,y,z]}>
				<div className="satellite-label" onClick={() => zoomToObject("neptune", zoomLevel, x, y, z)}>Neptune</div>
			</Html>
		</>
	);
};

export default Neptune;
