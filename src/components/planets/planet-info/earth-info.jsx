import { useEffect } from "react";
import { useControls, LevaPanel, button } from "leva";

const EarthInfo = ({ infoStore, tempUnit, pressureUnit, lengthUnit, orbitalUnit }) => {
	console.log("EarthInfo()");

	//Options created within the useControls hook will be persisted between React re-renders, similar to how useState works.
	const [, set] = useControls("Physical", () => ({
		Type: "Terrestial/Rocky Body",
		Age: "~ 4.5 billion Years",
		"Mean Equatorial Diameter": "12,756.3km",
		"Mean Polar Diameter": "12,713.5km",
		"Temperature Range": "-89.2 °C to 56.7 °C",
		"Mean Temperature": "~ 14.8 °C",
		"Surface Gravity": "~ 1.0g",
		"Mean Body Density": "5.5 g/cm3",
		"Highest Point": "Mount Everest | 8.8km", 
		"Lowest Point": "Challenger Deep | -11km"
	}), { store: infoStore }); 

	const [, setPressure] = useControls("Atmosphere Composition", () => ({
		"Pressure": "Moderate, 1 atm",
		"Nitrogen (N)": "~ 78.0791%",
		"Oxygen (O)": "~ 20.949%",
		"Argon (Ar)": "~ 0.934%",
		"Water Vapor (H2O)": "≤1% (variable)",
		"Carbon Dioxide (CO2)": "~ 0.0415%",
		"Other": "~ 0.00268%"
	}), { store: infoStore }); 

	const [, setOrbital] = useControls("Orbitals", () => ({
		"Orbital Period": "365.256d",
		"Rotational Period": "23h, 56min, 4s | 0.98d",
		"Average Orbital Speed": "29.8 km/s",
		"Eccentricity": "~ 0.01671"
 	}), { store: infoStore });
	//zoomToObject(object, zoomLevel, x, y, z)
	const moons = useControls("Moons", {
		"Moon": button(() => setMoon()),
	}, { store: infoStore });

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
			set({ "Temperature Range": "-89.2 °C to 56.7 °C" });
			set({ "Mean Temperature": "~ 14.8 °C" });
		} else if (tempUnit === "F") {
			set({ "Temperature Range": "-128.5 °F to 134.0 °F" });
			set({ "Mean Temperature": "~ 58.6 °F" });
		}
	}, [tempUnit]);

	//Pressures
 	useEffect(() => {
		if (pressureUnit === "atm") {
			setPressure({ "Pressure": "Moderate | 1.0 atm", });
		} else if (pressureUnit === "PA") {
			setPressure({ "Pressure": "Moderate | 101,325 PA", });
		} else if (pressureUnit === "tor") {

		} else if (pressureUnit === "bar") {

		} else if (pressureUnit === "psi") {

		}
	}, [pressureUnit]);

	//Lengths
	useEffect(() => {
		if (lengthUnit === "km") {
			set({ "Mean Equatorial Diameter": "12,756.3km" });
			set({ "Mean Polar Diameter": "12,713.5km" });
			set({ "Highest Point": "Mount Everest, 8.8km" });
			set({ "Lowest Point": "Challenger Deep, -11km" });
		} else if (lengthUnit === "mi") {
			set({ "Mean Equatorial Diameter": "7,926.2mi" });
			set({ "Mean Polar Diameter": "7899.8mi" });
			set({ "Highest Point": "Mount Everest, 5.5mi" });
			set({ "Lowest Point": "Challenger Deep, -6.9mi" });
		} else if (lengthUnit === "m") {
			set({ "Mean Equatorial Diameter": "12,756,300m" });
			set({ "Mean Polar Diameter": "12,713,500m" });
			set({ "Highest Point": "Mount Everest, 8,800m" });
			set({ "Lowest Point": "Challenger Deep, -11,000m" });
		} else if (lengthUnit === "ft") {
			set({ "Mean Equatorial Diameter": "41,851,378ft" });
			set({ "Mean Polar Diameter": "41,710,958ft" });
			set({ "Highest Point": "Mount Everest | 29,032ft" });
			set({ "Lowest Point": "Challenger Deep | -36,201ft" });
		}
	}, [lengthUnit]);

	//We are assuming synodic days for "d" unit
	//In the case of a tidally locked planet, the same side always faces its parent star, and its synodic day is infinite. 
	//Its sidereal day, however, is equal to its orbital period.

	//Orbitals
	useEffect(() => {
		if (orbitalUnit === "sidereal") {
			setOrbital({ "Orbital Period": "365.256d" });
			setOrbital({ "Rotational Period": "23h, 56min, 4s | 0.98d" });
		} else if (orbitalUnit === "solar/synodic") {
			setOrbital({ "Orbital Period": "365.242d" });
			setOrbital({ "Rotational Period": "24h | 1.0d" });
		}
	}, [orbitalUnit]);

	const setMoon = () => {
		console.log("setMoon()");
	}

	return <LevaPanel store={infoStore} flat titleBar={{title: "Earth Info"}} />;
};

export default EarthInfo;