import TWEEN from "@tweenjs/tween.js";
import { useFrame } from "@react-three/fiber";

//Need this for TWEEN to work for some reason
const Tween = () => {
	console.log("Tween()");
	useFrame(() => {
		TWEEN.update();
	});
};
export default Tween;
