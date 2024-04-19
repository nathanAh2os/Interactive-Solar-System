import { useThree } from "@react-three/fiber";
import TWEEN from "@tweenjs/tween.js";

const ZoomToObject = ({ x, y, z }) => {
	const { camera } = useThree();

	//Rotate camera to point at new object
	new TWEEN.Tween(ref.current.target).to({ x: x, y: y, z: z }).easing(TWEEN.Easing.Cubic.Out).start();

	//Move the camera to new position
	new TWEEN.Tween(ref.current.object.position).to({ x: x, y: y, z: 25 }, 4000).easing(TWEEN.Easing.Cubic.Out).start();

	return null;
};

export default ZoomToObject;
