import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei"; 

const Sun = ({ DOMAIN_URL, zoomToObject, searchTerm }) => {
	const sunDiameter = 0.009304945274; //1,392,000km
	const url = `${DOMAIN_URL}2k_sun.jpg`;
	const planetTexture = useLoader(TextureLoader, url);

	//Must make an unique group to prevent cross-component conflicts with other tweens ???
	//let tweenGroupSun = new TWEEN.Group();

	if (searchTerm === "sun") {
		zoomToObject("sun", 50, 0, 0, 0);
	}

/* 	useFrame(() => {
		tweenGroupSun.update();
	}); */

	return (
		<>
			<mesh>
				<sphereGeometry args={[sunDiameter, 32, 32]} position={[0,0,0]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Html position={[0,0,0]}>
				<div className="satellite-label" onClick={() => zoomToObject("sun", 50, 0, 0, 0)}>Sun</div>
			</Html>
		</>
	);
};

export default Sun;
