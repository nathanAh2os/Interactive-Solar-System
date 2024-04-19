import { useControls, folder } from "leva";

const JupiterInfo = () => {
	console.log("JupiterInfo()");

	const earthOptions = useControls("Earth Info", {
 	 	Physical: folder({
			Type: "Gas Giant",
			Age: "~4.5 billion Earth Years",
			"Mean Equatorial Diameter": "138,347km | 86,881mi",
			"Mean Polar Diameter": "133,709km | 83,082mi",
			"Mean 'Surface' Temperature": "-110°C | -166°F",
			"Mean Outer Layer Temperature.": "725 °C | 1,340 °F",
			"'Surface' Gravity": "2.53g", 	 
			"Atmosphere Composition": "89% hydrogen, 10% helium, 1% other",
			"Mean Density": "1.33g/cm3"
  		}),
  		Orbital: folder({
			"Year Length": "11.86yr | 4,332.59d",
			"Day Length": "9h 55m 30s",
			"Average Orbital Speed": "13.07km/s | 8.12 mi/s",
			"Eccentricity": "0.0489"
 		}),
		//
		Satellites: folder({
			"Moon": "love"
		}),
	});

	return null;
};

export default JupiterInfo;