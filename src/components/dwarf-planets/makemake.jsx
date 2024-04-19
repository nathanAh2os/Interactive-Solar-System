import { useEffect, useState } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import buildOrbitCoordinates from "../../map/coordinate-calculations";

const Makemake = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, searchTerm }) => {
	console.log("Makemake()");
	const yearLength = 90556;
	const zoomLevel = 0.25;
	const makemakeDiameter = 1.58826e-5; //2376 km
	const url = `${DOMAIN_URL}2k_neptune.jpg`;
	const planetTexture = useLoader(TextureLoader, url);

/* 	const makemakeKeplerianValues = {
			semiMajorAxis: [39.48211675, -0.00031596],
			eccentricity: [0.2488273, 0.0000517],
			inclination: [17.14001206, 0.00004818],
			meanLongitude: [238.92903833, 145.20780515],
			longitudePerihelion: [224.06891629, -0.04062942],
			longitudeAscendNode: [110.30393684, -0.01183482],
	}; */

	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [makemakeOrbit, setMakemakeOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		console.log("useEffect() makemake orbit");
		let orbitPath = buildOrbitCoordinates(makemakeKeplerianValues, julianEphemerisDate, yearLength);

		//To connect orbit path from last point to first point
		orbitPath.push(orbitPath[0]);

		setMakemakeOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		console.log("useEffect() makemake position");
		let coords = buildOrbitCoordinates(makemakeKeplerianValues, julianEphemerisDate, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]);
	}, [julianEphemerisDate]);

	if (searchTerm === "makemake") {
		zoomToObject("makemake", zoomLevel, x, y, z);
	}

	return (
		<>
			<mesh position={[x,y,z]}>
				<sphereGeometry args={[makemakeDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={plutoOrbit} color={"#E2FF0D"} lineWidth={2} />
			<Html position={[x,y,z]}>
				<div className="satellite-label" onClick={() => zoomToObject("makemake", zoomLevel, x, y, z)}>Makemake</div>
			</Html>
		</>
	);
};

export default Makemake;
