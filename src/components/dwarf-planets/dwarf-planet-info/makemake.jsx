import { useControls, folder } from "leva";

const MakemakeInfo = () => {
	console.log("MakemakeInfo()");

	const makemakeOptions = useControls("Makemake Info", {
 	 	Physical: folder({
			Type: "Dwarf Planet",
			Age: "~4.5 billion Earth Years",
			"Equatorial Diameter": "~1,188.3km | ~738mi", 
			"Polar Diameter" : "~1,188.3km | ~738mi",
			"Temperature Range": "-240.15 °C to -218.15 °C | -400.27 °F to -360.67 °F",
			"Mean Surface Temperature": "-225 °C | -375 °F",	
			"Surface Gravity": "0.063g", 	 
			"Atmosphere Pressure": "Trace, 0.00000987atm | 0.000001MPA",
			"Atmosphere Composition": "~90% nitrogen, ~0.25% methane, ~0.15% carbon dioxide, ~9.6% complex compounds",
			"Mean Body Density": "1.85 g/cm3",
			"Highest Point": "Tenzing Montes, peak 'T2', ~6.2km | ~3.9mi | ~20,592ft", 
			"Lowest Point": "Unknown"
  		}),
  		Orbital: folder({
			"Year Length": "247.94y | 90,560d",
			"Day Length": "6.4d | 153.3h", 
			"Average Orbital Speed": "4.74km/s",
			"Eccentricity": "0.2488"
 		}),
		Satellites: folder({
			"Moon": "love"
		}),
	});

	return null;
};

export default MakemakeInfo;