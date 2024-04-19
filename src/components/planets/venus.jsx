import { useEffect, useState } from "react";
import { TextureLoader } from "three"; 
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbitCoordinates } from "../../map/coordinate-calculations";

const Venus = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, searchTerm, innerLabels }) => {
	const url = `${DOMAIN_URL}2k_venus_surface.jpg`;
	const planetTexture = useLoader(TextureLoader, url);
	const yearLength = 224.7;
	const zoomLevel = 0.125;
	const venusDiameter = 8.0910243e-5; //12,104 km
	const venusKeplerianValues = {
			semiMajorAxis: [0.72333566, 0.0000039],
			eccentricity: [0.00677672, -0.00004107],
			inclination: [3.39467605, -0.0007889],
			meanLongitude: [181.9790995, 58517.81538729],
			longitudePerihelion: [131.60246718, 0.00268329],
			longitudeAscendNode: [76.67984255, -0.27769418],
	};

	let labelJSX = null;

	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [venusOrbit, setVenusOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		console.log("useEffect() venus orbit");
		let orbitPath = buildOrbitCoordinates(venusKeplerianValues, julianEphemerisDate, yearLength);

		//To connect orbit path from last point to first point
		orbitPath.push(orbitPath[0]);

		setVenusOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		console.log("useEffect() venus position");
		let coords = buildOrbitCoordinates(venusKeplerianValues, julianEphemerisDate, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]);
	}, [julianEphemerisDate]);

	if (searchTerm === "venus") {
		zoomToObject("venus", zoomLevel, x, y, z);
	}

	if (innerLabels === true) {
		labelJSX = <div className="satellite-label" onClick={() => zoomToObject("venus", zoomLevel, x, y, z)}>Venus</div>
	} else {
		labelJSX = null;
	}

	return (
		<>
			<mesh position={[x,y,z]}>
				<sphereGeometry args={[venusDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={venusOrbit} color={"#d23a2d"}/>
			<Html position={[x,y,z]}>
				{labelJSX}
			</Html>
		</>
	);
};

export default Venus;
