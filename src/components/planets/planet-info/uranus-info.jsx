import { useControls, folder } from "leva";

const UranusInfo = () => {
	console.log("UranusInfo()");

	const uranusOptions = useControls("Uranus Info", {
 	 	Physical: folder({
			Type: "Ice Giant",
			Age: "~4.5 billion Earth Years",
			"Equatorial Radius": "~25,559km | ~15,881.63mi",
			"Polar Radius": "~24,973km | ~15,517.53mi",
			"Mean 'Surface' Temperature": "-195 °C | -320 °F",	
			"Surface Gravity": "0.89g", 	 
			"Atmosphere Composition": "~82% hydrogen, ~15% helium, ~2.3% methane, 0.7% other",
			"Mean Density": "1.27 g/cm3"
  		}),
  		Orbital: folder({
			"Year Length": "84.3y | 30,688.5d",
			"Day Length": "17h 14m 24s",
			"Average Orbital Speed": "6.8km/s | 4.23mi/s",
			"Eccentricity": "0.04717"
 		}),
		//https://en.wikipedia.org/wiki/Moons_of_Uranus
		Satellites: folder({
			"Moon": "love"
		}),
	});

	return null;
};

export default UranusInfo;