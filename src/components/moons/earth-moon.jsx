import { useEffect, useState } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildMoonOrbitCoordinates } from "../../map/coordinate-calculations";

const EarthMoon = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, searchTerm, earthCoords }) => {
	console.log("EarthMoon()");
	console.log(earthCoords);
	const yearLength = 27; //27.322 sidereal period
	const earthMoonDiameter = 1.58826e-5; //2376 km
	const url = `${DOMAIN_URL}2k_neptune.jpg`;
	const planetTexture = useLoader(TextureLoader, url);
	const moonSemiMajorAxis = 0.00256956; //384,400km, 0.00256956au
	const moonEccentricity = 0.0554;

/* semi-major axis [au, au/century]
eccentricity
inclination [degrees, degrees/century]
mean longitude [degrees, degrees/century]
longitude of perihelion [degrees, degrees/century]
longitude of the ascending node [degrees, degrees/century] */

	//State values
/* 	let [x, setX] = useState(-0.9023937940409669);
	let [y, setY] = useState(-0.4595321155173004);
	let [z, setZ] = useState( 0.0004552195243310354); */
	let [earthMoonOrbit, setEarthMoonOrbit] = useState([0,0,0]);

	//Called once, used to build orbit
 	useEffect(() => {
		console.log("useEffect() earthMoon orbit");
		let orbitPath = buildMoonOrbitCoordinates(moonSemiMajorAxis, moonEccentricity, earthCoords);

		//To connect orbit path from last point to first point
		orbitPath.push(orbitPath[0]);
		
		setEarthMoonOrbit(orbitPath);
	}, []) 

	//Called whenever date updates, used to build planet and set planet position
/*  	useEffect(() => {
		console.log("useEffect() earthMoon position");
		let coords = buildMoonOrbitCoordinates(moonTrueKeplerianValues, julianEphemerisDate, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]);
	}, [julianEphemerisDate]);  */

/* 	if (searchTerm === "moon") {
		zoomToObject("moon", 0.25, x, y, z);
	} */

	return (
		<>
{/* 			<mesh position={[x,y,z]}>
				<sphereGeometry args={[earthMoonDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh> */}
			<Line points={earthMoonOrbit} color={"#E2FF0D"} lineWidth={2} />
			<Html position={[0.0025693643068805234, 0.000044848420800844305, -0.00011088581471925916]}>
				<div className="satellite-label" onClick={() => zoomToObject("moon", 0.25, 0.0025693643068805234, 0.000044848420800844305, -0.00011088581471925916)}>Moon</div>
			</Html>
		</>
	);
};

export default EarthMoon;
