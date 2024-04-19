import { useControls, folder } from "leva";

const MarsInfo = () => {
	console.log("MarsInfo()");

	const marsOptions = useControls("Mars Info", {
 	 	Physical: folder({
			Type: "Terrestial/Rocky Body",
			Age: "~4.5 billion Earth Years",
			"Mean Diameter": "6,794km | 4,220.6mi",  
			"Temp. Range": "−110 °C to 35 °C | −166 °F to 95 °F",
			"Mean Temp.": "−60 °C | −80 °F",	
			"Surface Gravity": "0.38g", 	 
			"Atmos. Pressure": "Low, 0.0063atm | 0.00064MPA",
			"Atmos. Makeup": "95.97% carbon dioxide, 1.93% argon,1.89% nitrogen, 0.146% oxygen, 0.0557% carbon monoxide, 0.0210% water vapor",
			"Mean Body Density": "3.93g/cm3", 
			"Highest Point": "Olympus Mons, 21.9km | 13.6mi | 72,000ft", 
			"Lowest Point": "Hellas Impact Crater, -8.2km, -5.1mi, -26,902ft"
  		}),
  		Orbital: folder({
			"Year Length": "686.98 Earth Days",
			"Day Length": "1.03 Earth Days | 24.62 hours",
			"Average Orbital Speed": "24.07 km/s",
			"Eccentricity": "0.0934"
 		}),
		Satellites: folder({
			"Phobos": folder({ 
				Type: "Moon", 
				"Mean Diameter": "22km | 14mi",  
				"Mean Density": "1.86g/cm3",
				"Atmosphere": "None",
				"Avg Orbital Speed": "2.14km/s",
				"Sunlit Mean Temp": "−4 °C | 25 °F",
				"Shadowed Mean Temp": "−112 °C | −170 °F",
				"Surface Gravity": "0.00058g",
				"Eccentricity":	"0.0151",
				"Orbital Period (sidereal)": "0.323 d | 7.65 hours"
			}),
			"Deimos": "love"
			 //6.2 km (3.9 mi)
		}),
	});

	return null;
};

export default MarsInfo;