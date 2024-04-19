import { useControls, folder } from "leva";

const NeptuneInfo = () => {
	console.log("NeptuneInfo()");

	const neptuneOptions = useControls("Neptune Info", {
 	 	Physical: folder({
			Type: "Ice Giant",
			Age: "~4.5 billion Earth Years",
			"Equatorial Diameter": "~49,528km",
			"Polar Diameter": "~48,682km", 
			"Mean 'Surface' Temperature": "-200 °C | -330 °F",	
			"Surface Gravity": "1.14g", 	 
			"Atmosphere Composition": "~80% hydrogen, ~18.4% helium, ~1.5% methane, ~0.1% other",
			"Mean Density": "1.64 g/cm3"
  		}),
  		Orbital: folder({
			"Year Length": "164.8y | ~60,182d",
			"Day Length": "16h 6m 36s",
			"Average Orbital Speed": "5.43km/s, | ",
			"Eccentricity": "0.008678"
 		}),
		//https://en.wikipedia.org/wiki/Moons_of_Neptune
		Satellites: folder({
			"Moon": "love"
		}),
	});

	return null;
};

export default NeptuneInfo;