import { useControls, folder } from "leva";

const SaturnInfo = () => {
	console.log("SaturnInfo()");

	const saturnOptions = useControls("Saturn Info", {
 	 	Physical: folder({
			Type: "Gas Giant",
			Age: "~4.5 billion Earth Years",
			"Mean Equatorial Diameter": "~120,536km | ~74,898mi",
			"Mean Polar Diameter": "~108,728km | ~67,560mi",
			"Mean 'Surface' Temperature.": "-140 °C | -220 °F",	
			"'Surface' Gravity": "1.065g", 	 
			"Atmosphere Composition": "~96.29% hydrogen, ~3.25% helium, 0.45% methane, 0.01% other",
			"Mean Density": "0.687g/cm3"
  		}),
  		Orbital: folder({
			"Year Length": "29.46y | 10,759d",
			"Day Length": "10h 39m 24s",
			"Average Orbital Speed": "9.68km/s 6.01 mi/s",
			"Eccentricity": "0.0565"
 		}),
		//https://en.wikipedia.org/wiki/Moons_of_Saturn
		Satellites: folder({
			"Moon": "love"
		}),
	});

	return null;
};

export default SaturnInfo;