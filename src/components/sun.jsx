import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei"; 

const Sun = ({ DOMAIN_URL, targetSelected }) => {
	const sunDiameter = 0.009304945274; //1,392,000km
	const url = `${DOMAIN_URL}2k_sun.jpg`;
	const planetTexture = useLoader(TextureLoader, url);
	const zoomLevel = 50;

	return (
		<>
			<mesh>
				<sphereGeometry args={[sunDiameter, 32, 32]} position={[0,0,0]} />
				<meshBasicMaterial map={planetTexture} />
			</mesh>
			<Html position={[0,0,0]}>
				<div className="satellite-label" onClick={() => targetSelected("Sun", "none", zoomLevel, 0,0,0)}>Sun</div>
			</Html>
		</>
	);
};

export default Sun;
