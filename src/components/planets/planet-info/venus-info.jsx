import { useControls, folder } from "leva";

const VenusInfo = () => {
	console.log("VenusInfo()");

	const venusOptions = useControls("Venus Info", {
 	 	Physical: folder({
			Type: "Terrestial/Rocky Body",
			Age: "~4.5 billion Earth Years",
			"Mean Diameter": "12,103.6km | 7,520.8mi",
			"Temp. Range": "380 °C to 482 °C | 716 °F to 900 °F",
			"Median Temp.": "464 °C | 867 °F",	
			"Surface Gravity": "0.904g", 	 
			"Atmos. Pressure": "Very Dense, 92atm | 9.3MPA",
			"Atmos. Makeup": "96.5% carbon dioxide, 3.5% nitrogen, 0.01% other",
			"Mean Body Density": "5.243 g/cm3 (Iron & Nickel)",
			"Highest Point": "Skadi Mons, 11km | 6.8mi | 36,000ft",
			"Lowest Point": "Diana Chasma, -2.9km, -1.8mi, -9514.4ft"
  		}),
  		Orbital: folder({
			"Year Length": "224.7 Earth Days",
			"Day Length": "583.92 Earth Days",
			"Average Orbital Speed": "35.02 km/s",
			"Eccentricity": "0.006772"
 		}),
		Moons: folder(
			"None"
 		),
	});

	return null;
};

export default VenusInfo;