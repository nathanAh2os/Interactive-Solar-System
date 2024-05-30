import { useEffect } from "react";
import { useControls, LevaPanel, button } from "leva";

const MarsInfo = ({ infoStore, tempUnit, pressureUnit, lengthUnit, orbitalUnit }) => {
	console.log("MarsInfo()");

/* 		Satellites: folder({
			Phobos: folder({ 
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
			 //6.2 km (3.9 mi) */


	//Options created within the useControls hook will be persisted between React re-renders, similar to how useState works.
	const [, set] = useControls("Physical", () => ({
		Type: "Terrestial/Rocky Body",
		Age: "~4.5 billion Years",
		"Mean Equatorial Diameter": "6,792.4km",
		"Mean Polar Diameter": "6,752.4km",
		"Temperature Range": "-110°C to 35°C",
		"Mean Temperature": "-60°C",
		"Surface Gravity": "~0.38g",
		"Mean Body Density": "3.93g/cm3",
		"Highest Point": "Olympus Mons | 21.9km", 
		"Lowest Point": "Hellas Impact Crater | -8.2km"
	}), { store: infoStore }); 
	
	const [, setPressure] = useControls("Atmosphere Composition", () => ({
		"Pressure": "Thin | 0.0060atm",
		"Carbon Dioxide (CO2)": "~95%",
		"Nitrogen (N)": "~2.8%",
		"Argon (Ar)": "~2%",
		"Oxygen (O2)": "~0.174%",
		"Carbon Monoxide (CO)": "~0.0747%",
		"Water Vapor": "~0.03% (variable)"
	}), { store: infoStore }); 

	const [, setOrbital] = useControls("Orbitals", () => ({
		"Orbital Period": "686.980d",
		"Rotational Period": "24h 37m 22.7s | 1.026d",
		"Average Orbital Speed": "24.07km/s",
		"Eccentricity": "0.0934"
 	}), { store: infoStore });

	//zoomToObject(object, zoomLevel, x, y, z)
	const moons = useControls("Moons", {
		"Phobos:": button(() => setMoon()),
		"Deimos": button(() => setMoon()),
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
			set({ "Temperature Range": "-110°C to 35°C" });
			set({ "Mean Temperature": "-60°C" });
		} else if (tempUnit === "F") {
			set({ "Temperature Range": "-166°F to 95°F" });
			set({ "Mean Temperature": "-80°F" });
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
			set({ "Mean Equatorial Diameter": "6,792.4km" });
			set({ "Mean Polar Diameter": "6,752.4km" });
			set({ "Highest Point": "Olympus Mons | 21.9km" });
			set({ "Lowest Point": "Hellas Impact Crater | -8.2km" });
		} else if (lengthUnit === "mi") { //km to mi, divide the length value by 1.609344
			set({ "Mean Equatorial Diameter": "4,220.6mi" });
			set({ "Mean Polar Diameter": "4,195.7mi" });
			set({ "Highest Point": "Olympus Mons | 13.6mi" });
			set({ "Lowest Point": "Hellas Impact Crater | -5.1mi" });
		} else if (lengthUnit === "m") {
			set({ "Mean Equatorial Diameter": "6,792,400m" });
			set({ "Mean Polar Diameter": "6,752,400m" });
			set({ "Highest Point": "Olympus Mons | 21,900m" });
			set({ "Lowest Point": "Hellas Impact Crater | -8,200km" });
		} else if (lengthUnit === "ft") { //m to ft, multiply the length value by 3.2808399
			set({ "Mean Equatorial Diameter": "22,284,776.9ft" });
			set({ "Mean Polar Diameter": "22,153,543.3ft" });
			set({ "Highest Point": "Olympus Mons | 72,000ft" });
			set({ "Lowest Point": "Hellas Impact Crater | -26,902ft" });
		}
	}, [lengthUnit]);

	//We are assuming synodic days for "d" unit
	//In the case of a tidally locked planet, the same side always faces its parent star, and its synodic day is infinite. 
	//Its sidereal day, however, is equal to its orbital period.

	//Orbitals
	useEffect(() => {
		if (orbitalUnit === "sidereal") {
			setOrbital({ "Orbital Period": "686.980d" });
			setOrbital({ "Rotational Period": "24h 37m 22.7s | 1.026d" });
		} else if (orbitalUnit === "solar/synodic") {
			setOrbital({ "Orbital Period": "779.940d" });
			setOrbital({ "Rotational Period": "24h 39m 36s | 1.027d" });
		}
	}, [orbitalUnit]);

	const setMoon = () => {
		console.log("setMoon()");
	}

	return <LevaPanel store={infoStore} flat titleBar={{title: "Mars Info"}} />;
};

export default MarsInfo;