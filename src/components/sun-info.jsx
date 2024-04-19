import { useControls, folder } from "leva";

const SunInfo = () => {
	console.log("SunInfo()");

	const sunOptions = useControls("Sun Info", {
 	 	Physical: folder({
			Type: "G-type main-sequence (Yellow Dwarf) star", 
			Age: "~4.6 billion Earth Years",
			"Mean Diameter": "1,391,400km | 864,600mi", 
			"Core Temp": "15million °C | 27million °F", 
			"Surface Temp.": "5,500 °C | 10,000 °F", 
			"Surface Gravity": "~28g", 	 
			"Composition by Mass": "73.46% hydrogen, 24.85% helium, 0.77% oxygen, 0.29% carbon, 0.16% iron, 0.12% neon, 0.09% nitrogen, 0.07% silicon, 0.05% magnesium, 0.04% sulfur",
			"Mean Body Density": "1.40 g/cm3",
  		}),
  		Orbital: folder({
			"Sidereal rotation period (equator)": "25 Earth Days",
			"Sidereal rotation period (poles)": "34.4 Earth Days",
			"Orbital Speed (Galactic Center)": "240km/s | 149mi/s",
 		}) 
	});

	return null;
};

export default SunInfo;