import { useEffect, useState } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import buildOrbitCoordinates from "../../map/coordinate-calculations";

const Ceres = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, searchTerm }) => {
	console.log("Ceres()");
	const yearLength = 90556;
	const zoomLevel = 0.25;
	const ceresDiameter = 1.58826e-5; //2376 km
	const url = `${DOMAIN_URL}2k_neptune.jpg`;
	const planetTexture = useLoader(TextureLoader, url);
	const ceresKeplerianValues = {
			semiMajorAxis: [39.48211675, -0.00031596],
			eccentricity: [0.2488273, 0.0000517],
			inclination: [17.14001206, 0.00004818],
			meanLongitude: [238.92903833, 145.20780515],
			longitudePerihelion: [224.06891629, -0.04062942],
			longitudeAscendNode: [110.30393684, -0.01183482],
	};

	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [ceresOrbit, setCeresOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		console.log("useEffect() Ceres orbit");
		let orbitPath = buildOrbitCoordinates(ceresKeplerianValues, julianEphemerisDate, yearLength);

		//To connect orbit path from last point to first point
		orbitPath.push(orbitPath[0]);

		setCeresOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		console.log("useEffect() Ceres position");
		let coords = buildOrbitCoordinates(ceresKeplerianValues, julianEphemerisDate, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]);
	}, [julianEphemerisDate]);

	if (searchTerm === "ceres") {
		zoomToObject("ceres", zoomLevel, x, y, z);
	}

	return (
		<>
			<mesh position={[x,y,z]}>
				<sphereGeometry args={[ceresDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={CeresOrbit} color={"#E2FF0D"} lineWidth={2} />
			<Html position={[x,y,z]}>
				<div className="satellite-label" onClick={() => zoomToObject("ceres", zoomLevel, x, y, z)}>Ceres</div>
			</Html>
		</>
	);
};

export default Ceres;
