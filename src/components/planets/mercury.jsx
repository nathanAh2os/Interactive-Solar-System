import { useEffect, useState } from "react";
import { TextureLoader } from "three"; 
import { useLoader } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei"; 

import { buildOrbitCoordinates } from "../../map/coordinate-calculations";

const Mercury = ({ DOMAIN_URL, julianEphemerisDate, zoomToObject, searchTerm, innerLabels }) => {
	const url = `${DOMAIN_URL}2k_mercury.jpg`;
	const planetTexture = useLoader(TextureLoader, url);
	const yearLength = 88; //87.97 days
	const zoomLevel = 0.125;
	const mercuryDiameter = 0.0000326141; //4879 km
	const mercuryKeplerianValues = {
		semiMajorAxis: [0.38709927, 0.00000037], //a
		eccentricity: [0.20563593, 0.00001906], //e
		inclination: [7.00497902, -0.00594749], //i
		meanLongitude: [252.2503235, 149472.67411175], //L = M + w1
		longitudePerihelion: [77.45779628, 0.16047689], //w1 = N + w
		longitudeAscendNode: [48.33076593, -0.12534081], //N
	};

/* 	N =  48.3313 + 3.24587E-5 * d
    i = 7.0047 + 5.00E-8 * d
    w =  29.1241 + 1.01444E-5 * d
    a = 0.387098  (AU)
    e = 0.205635 + 5.59E-10 * d
    M = 168.6562 + 4.0923344368 * d */

/* 	The primary orbital elements are here denoted as:
    N = longitude of the ascending node
    i = inclination to the ecliptic (plane of the Earth's orbit)
    w = argument of perihelion
    a = semi-major axis, or mean distance from Sun
    e = eccentricity (0=circle, 0-1=ellipse, 1=parabola)
    M = mean anomaly (0 at perihelion; increases uniformly with time)
Related orbital elements are:
    w1 = N + w   = longitude of perihelion
    L  = M + w1  = mean longitude
    q  = a*(1-e) = perihelion distance
    Q  = a*(1+e) = aphelion distance
    P  = a ^ 1.5 = orbital period (years if a is in AU, astronomical units)
    T  = Epoch_of_M - (M(deg)/360_deg) / P  = time of perihelion
    v  = true anomaly (angle between position and perihelion)
    E  = eccentric anomaly */

	let labelJSX = null;

	//State values
	let [x, setX] = useState(0);
	let [y, setY] = useState(0);
	let [z, setZ] = useState(0);
	let [mercuryOrbit, setMercuryOrbit] = useState([0, 0, 0]);

	//Called once, used to build orbit
	useEffect(() => {
		console.log("useEffect() mercury orbit");
		let orbitPath = buildOrbitCoordinates(mercuryKeplerianValues, julianEphemerisDate, yearLength);

		//To connect orbit path from last point to first point
		orbitPath.push(orbitPath[0]);

		setMercuryOrbit(orbitPath);
	}, [])

	//Called whenever date updates, used to build planet and set planet position
	useEffect(() => {
		console.log("useEffect() mercury position");
		let coords = buildOrbitCoordinates(mercuryKeplerianValues, julianEphemerisDate, 1);
		setX(coords[0][0]);
		setY(coords[0][1]);
		setZ(coords[0][2]);
	}, [julianEphemerisDate]);

	if (searchTerm === "mercury") {
		zoomToObject("mercury", zoomLevel, x, y, z);
	}

	if (innerLabels === true) {
		labelJSX = <div className="satellite-label" onClick={() => zoomToObject("mercury", zoomLevel, x, y, z)}>Mercury</div>
	} else {
		labelJSX = null;
	}

	return (
		<>
			<mesh position={[x,y,z]}>
				<sphereGeometry args={[mercuryDiameter, 32, 32]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Line points={mercuryOrbit} color={"#722018"} lineWidth={2}/>
			<Html position={[x,y,z]}>
				{labelJSX}
			</Html>
		</>
	);
};

export default Mercury;
