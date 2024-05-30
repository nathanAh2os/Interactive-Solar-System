import { useEffect } from "react";
import { useControls, LevaPanel, button } from "leva";

const ErisInfo = () => {
	console.log("ErisInfo()");

	//Options created within the useControls hook will be persisted between React re-renders, similar to how useState works.
	const [, set] = useControls("Physical", () => ({
		Type: "",
		Age: "",
		"Equatorial Diameter": "",
		"Polar Diameter": "",
		"Temperature Range": "",
		"Mean Temperature": "",
		"Surface Gravity": "",
		"Mean Body Density": "",
		"Highest Point": "", 
		"Lowest Point": ""
	}), { store: infoStore }); 
	
	const [, setPressure] = useControls("Atmosphere Composition", () => ({
		"Pressure": ""
	}), { store: infoStore }); 

	const [, setOrbital] = useControls("Orbitals", () => ({
		"Orbital Period": "",
		"Rotational Period": "",
		"Average Orbital Speed": "",
		"Eccentricity": ""
 	}), { store: infoStore });

	//zoomToObject(object, zoomLevel, x, y, z)
	const moons = useControls("Moons", {
		"Phobos:": button(() => setMoon())
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
			set({ "Temperature Range": "" });
			set({ "Mean Temperature": "" });
		} else if (tempUnit === "F") {
			set({ "Temperature Range": "" });
			set({ "Mean Temperature": "" });
		}
	}, [tempUnit]);

	//Pressures
 	useEffect(() => {
		if (pressureUnit === "atm") {
			setPressure({ "Pressure": "", });
		} else if (pressureUnit === "PA") {
			setPressure({ "Pressure": "", });
		}
	}, [pressureUnit]);

	//Lengths
	useEffect(() => {
		if (lengthUnit === "km") {
			set({ "Equatorial Diameter": "" });
			set({ "Polar Diameter": "" });
			set({ "Highest Point": "" });
			set({ "Lowest Point": "" });
		} else if (lengthUnit === "mi") { //km to mi, divide the length value by 1.609344
			set({ "Equatorial Diameter": "" });
			set({ "Polar Diameter": "" });
			set({ "Highest Point": "" });
			set({ "Lowest Point": "" });
		} else if (lengthUnit === "m") {
			set({ "Equatorial Diameter": "" });
			set({ "Polar Diameter": "" });
			set({ "Highest Point": "" });
			set({ "Lowest Point": "" });
		} else if (lengthUnit === "ft") { //m to ft, multiply the length value by 3.2808399
			set({ "Equatorial Diameter": "" });
			set({ "Polar Diameter": "" });
			set({ "Highest Point": "" });
			set({ "Lowest Point": "" });
		}
	}, [lengthUnit]);

	//Orbitals
	useEffect(() => {
		if (orbitalUnit === "sidereal") {
			setOrbital({ "Orbital Period": "" });
			setOrbital({ "Rotational Period": "" });
		} else if (orbitalUnit === "solar/synodic") {
			setOrbital({ "Orbital Period": "" });
			setOrbital({ "Rotational Period": "" });
		}
	}, [orbitalUnit]);

	const setMoon = () => {
		console.log("setMoon()");
	}

	return <LevaPanel store={infoStore} flat titleBar={{title: "Eris Info"}} />;
};

export default ErisInfo;