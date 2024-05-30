import { useEffect } from "react";
import { useControls, LevaPanel } from "leva";

const VenusInfo = ({ infoStore, tempUnit, pressureUnit, lengthUnit, orbitalUnit }) => {
	console.log("VenusInfo()");

	//Options created within the useControls hook will be persisted between React re-renders, similar to how useState works.
	const [, set] = useControls("Physical", () => ({
		Type: "Terrestial/Rocky Body",
		Age: "~4.5 billion Years",
		"Mean Equatorial Diameter": "12,103.6km",
		"Mean Polar Diameter": "12,103.6km",
		"Temperature Range": "380°C to 482°C",
		"Mean Temperature": "~464°C",
		"Surface Gravity": "~0.904g",
		"Mean Body Density": "5.243g/cm3 (Iron & Nickel)",
		"Highest Point": "Maxwell Mons | 11km", 
		"Lowest Point": "Diana Chasma | -2.9km"
	}), { store: infoStore }); 

	const [, setPressure] = useControls("Atmosphere Composition", () => ({
		"Pressure": "Very Dense | 92atm",
		"Carbon Dioxide (CO2)": "~96.5%",
		"Nitrogen (N)": "~3.5%",
		"Other": "~0.01%"
	}), { store: infoStore }); 

	const [, setOrbital] = useControls("Orbitals", () => ({
		"Orbital Period": "224.701d",
		"Rotational Period": "243.025d",
		"Average Orbital Speed": "35.02km/s",
		"Eccentricity": "~0.006772"
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
			set({ "Temperature Range": "380°C to 482°C" });
			set({ "Mean Temperature": "~464°C" });
		} else if (tempUnit === "F") {
			set({ "Temperature Range": "716°F to 900°F" });
			set({ "Mean Temperature": "~867.2°F" });
		}
	}, [tempUnit]);

	//Pressures
 	useEffect(() => {
		if (pressureUnit === "atm") {
			setPressure({ "Pressure": "Very Dense | 92atm", });
		} else if (pressureUnit === "PA") {
			setPressure({ "Pressure": "Very Dense | 9,321,900PA", });
		}
	}, [pressureUnit]);

	//Lengths
	useEffect(() => {
		if (lengthUnit === "km") {
			set({ "Mean Equatorial Diameter": "12,103.6km" });
			set({ "Mean Polar Diameter": "12,103.6km" });
			set({ "Highest Point": "Maxwell Mons | 11km" });
			set({ "Lowest Point": "Diana Chasma | -2.9km" });
		} else if (lengthUnit === "mi") { //km to mi, divide the length value by 1.609344
			set({ "Mean Equatorial Diameter": "7,520.83mi" });
			set({ "Mean Polar Diameter": "7,520.83mi" });
			set({ "Highest Point": "Maxwell Mons | 6.84mi" });
			set({ "Lowest Point": "Diana Chasma | -1.80mi" });
		} else if (lengthUnit === "m") {
			set({ "Mean Equatorial Diameter": "12,103,600m" });
			set({ "Mean Polar Diameter": "12,103,600m" });
			set({ "Highest Point": "Maxwell Mons | 11,000m" });
			set({ "Lowest Point": "Diana Chasma | -2,900m" });
		} else if (lengthUnit === "ft") { //m to ft, multiply the length value by 3.2808399
			set({ "Mean Equatorial Diameter": "39,709,973.8ft" });
			set({ "Mean Polar Diameter": "39,709,973.8ft" });
			set({ "Highest Point": "Maxwell Mons | 36,089.2ft" });
			set({ "Lowest Point": "Diana Chasma | -9,514.4ft" });
		}
	}, [lengthUnit]);

	//We are assuming synodic days for "d" unit
	//In the case of a tidally locked planet, the same side always faces its parent star, and its synodic day is infinite. 
	//Its sidereal day, however, is equal to its orbital period.

	//Orbitals
	useEffect(() => {
		if (orbitalUnit === "sidereal") {
			setOrbital({ "Orbital Period": "224.701d" });
			setOrbital({ "Rotational Period": "243.025d" });
		} else if (orbitalUnit === "solar/synodic") {
			setOrbital({ "Orbital Period": "224.695d" });
			setOrbital({ "Rotational Period": "116.75" });
		}
	}, [orbitalUnit]);

	return <LevaPanel store={infoStore} flat titleBar={{title: "Venus Info"}} />;
};

export default VenusInfo;