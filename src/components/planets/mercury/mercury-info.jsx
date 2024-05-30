import { useEffect } from "react";
import { useControls, LevaPanel } from "leva";

const MercuryInfo = ({ infoStore, tempUnit, pressureUnit, lengthUnit, orbitalUnit }) => {
	console.log("MercuryInfo()");

	//Options created within the useControls hook will be persisted between React re-renders, similar to how useState works.
	const [, set] = useControls("Physical", () => ({
		Type: "Terrestial/Rocky Body",
		Age: "~ 4.5 billion Years",
		"Mean Equatorial Diameter": "2440.5km",
		"Mean Polar Diameter": "2438.3km",
		"Temperature Range": "-180°C to 427°C",
		"Mean Temperature": "~167°C",
		"Surface Gravity": "~0.36g",
		"Mean Body Density": "5.427g/cm3 (42% Iron)",
		"Highest Point": "Unnamed | 4.48km", 
		"Lowest Point": "Rachmaninoff Basin | -5.38km"
	}), { store: infoStore }); 

	const [, setPressure] = useControls("Atmosphere Composition", () => ({
		"Pressure": "Trace | Highly Variable | 4.9e-15atm",
		"Contains More Of": "Hydrogen, Helium, Oxygen",
		"Contains Less Of": "Sodium, Potassium, Calcium, Magnesium",
	}), { store: infoStore }); 

	const [, setOrbital] = useControls("Orbitals", () => ({
		"Orbital Period": "87.969d",
		"Rotational Period": "58.650d",
		"Average Orbital Speed": "47.36km/s",
		"Eccentricity": "~0.21"
 	}), { store: infoStore });

	useEffect(() => {
		//Adds read-only attribute to every input field
		let inputElements = document.getElementsByClassName("leva-c-ghmOOI");
		for (let i = 0; i < inputElements.length; i++) {
			let element = inputElements.item(i);
			element.setAttribute("readonly", "true");
		}
/* 		let numberedInputs = document.getElementsByClassName("leva-c-ghmOOI-gsXdEb-levaType-number");
		for (let i = 0; i < numberedInputs.length; i++) {
			let element = numberedInputs.item(i);
			element.classList.remove("leva-c-ghmOOI-gsXdEb-levaType-number");
		} */
	});

	//Temperatures
	useEffect(() => {
		if (tempUnit === "C") {
			set({ "Temperature Range": "-180 °C to 427 °C" });
			set({ "Mean Temperature": "~ 167 °C" });
		} else if (tempUnit === "F") {
			set({ "Temperature Range": "-292 °F to 800.6 °F" });
			set({ "Mean Temperature": "~ 332.6 °F" });
		}
	}, [tempUnit]);

	//Pressures
 	useEffect(() => {
		if (pressureUnit === "atm") {
			setPressure({ "Pressure": "Trace | Highly Variable | 4.9e-15atm", });
		} else if (pressureUnit === "PA") {
			setPressure({ "Pressure": "Trace | Highly Variable | 4.9649e-10PA", });
		}
	}, [pressureUnit]);

	//Lengths
	useEffect(() => {
		if (lengthUnit === "km") {
			set({ "Mean Equatorial Diameter": "2,440.5km" });
			set({ "Mean Polar Diameter": "2,438.3km" });
			set({ "Highest Point": "Unnamed | 4.48km" });
			set({ "Lowest Point": "Rachmaninoff Basin | -5.38km" });
		} else if (lengthUnit === "mi") {
			set({ "Mean Equatorial Diameter": "1,516.46mi" });
			set({ "Mean Polar Diameter": "1,515.09mi" });
			set({ "Highest Point": "Unnamed | 2.78mi" });
			set({ "Lowest Point": "Rachmaninoff Basin | -3.34mi" });
		} else if (lengthUnit === "m") {
			set({ "Mean Equatorial Diameter": "2,440,500m" });
			set({ "Mean Polar Diameter": "2,438,300m" });
			set({ "Highest Point": "Unnamed | 4,480m" });
			set({ "Lowest Point": "Rachmaninoff Basin | -3,340m" });
		} else if (lengthUnit === "ft") {
			set({ "Mean Equatorial Diameter": "8,006,908.8ft" });
			set({ "Mean Polar Diameter": "7,999,675.2ft" });
			set({ "Highest Point": "Unnamed | 14,678.4ft" });
			set({ "Lowest Point": "Rachmaninoff Basin | -17,635.2ft" });
		}
	}, [lengthUnit]);

	//Orbitals
	useEffect(() => {
		if (orbitalUnit === "sidereal") {
			setOrbital({ "Orbital Period": "87.969d" });
			setOrbital({ "Rotational Period": "58.650d" });
		} else if (orbitalUnit === "solar/synodic") {
			setOrbital({ "Orbital Period": "87.968d" });
			setOrbital({ "Rotational Period": "175.941d" });
		}
	}, [orbitalUnit]);

	return <LevaPanel store={infoStore} flat titleBar={{title: "Mercury Info"}} />;;
};

export default MercuryInfo;