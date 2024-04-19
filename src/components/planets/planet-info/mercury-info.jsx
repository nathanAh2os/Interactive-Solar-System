import { useControls, folder } from "leva";

const MercuryInfo = () => {
	console.log("MercuryInfo()");

	const mercuryOptions = useControls("Mercury Info", {
 	 	Physical: folder({
			Type: "Terrestial/Rocky Body",
			Age: "~4.5 billion Earth Years",
			"Mean Diameter": "4,880km | 3032.3mi",
			"Temp Range": "-173 to 427 °C | -280 to 800 °F",
			"Dark Side Median Temp": "-163.15 °C | -261.67 °F",
			"Bright Side Median Temp": "351.85 °C | 665.33 °F",
			"Surface Gravity": "0.36g",
			"Atmos. Pressure": "Trace, 4.9e-15atm | 5e-7MPa",
			"Atmos. Makeup": "Highly variable oxygen, sodium, magnesium, hydrogen, potassium, calcium, helium",
			"Mean Body Density": "5.427 g/cm3 (42% Iron)",
			"Highest Point": "4.48km | 2.78mi | 14,678.4ft",
			"Lowest Point": "Rachmaninoff Basin, -5.38km | -3.34mi | -17635.2ft"
  		}),
  		Orbital: folder({
			"Year Length": "87.97 Earth Days",
			"Day Length": "115.88 Earth Days",
			"Average Orbital Speed": "47.36km/s",
			"Eccentricity": "0.21"
 		})
	});
	return null;
};

export default MercuryInfo;