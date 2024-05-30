import { useEffect } from "react";
import { useControls, LevaPanel, button } from "leva";

const UranusInfo = ({ infoStore, tempUnit, lengthUnit, orbitalUnit }) => {
	console.log("UranusInfo()");

	//Options created within the useControls hook will be persisted between React re-renders, similar to how useState works.
	const [, set] = useControls("Physical", () => ({
		Type: "Ice Giant",
		Age: "~4.5 billion Earth Years",
		"Equatorial Diameter": "~25,559km",
		"Polar Diameter": "~24,973km",
		"Mean Density": "1.27g/cm3",
		"Surface Defined": "where pressure = earth's surface pressure (1atm)",
		"Mean 'Surface' Gravity": "0.89g", 	 
		"Mean 'Surface' Temperature": "-195°C",
	}), { store: infoStore }); 

	useControls("Atmosphere Composition", () => ({
		"Hydrogen": "~82%",
		"Helium": "~15%",
		"Methane": "~2.3%",
		"Other": "~0.7%"
	}), { store: infoStore }); 

	const [, setOrbital] = useControls("Orbitals", () => ({
		"Orbital Period": "84.0205 yr | 30,688.5d",
		"Rotational Period": "Retrograde, 0.71833 d | 17h 14min 24s",
		"Average Orbital Speed": "6.8km/s",
		"Eccentricity": "0.04717"
 	}), { store: infoStore });

	//zoomToObject(object, zoomLevel, x, y, z)
	//https://en.wikipedia.org/wiki/Moons_of_Uranus
	const moons = useControls("Major Moons", {
		"Ariel": button(() => setMoon()),
		"Umbriel": button(() => setMoon()),
		"Titania": button(() => setMoon()),
		"Oberon": button(() => setMoon()),
		"Miranda": button(() => setMoon()),
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
			set({ "Mean 'Surface' Temperature": "-195°C" });
		} else if (tempUnit === "F") {
			set({ "Mean 'Surface' Temperature": "-320°F" });
		}
	}, [tempUnit]);

	//Lengths
	useEffect(() => {
		if (lengthUnit === "km") {
			set({ "Equatorial Diameter": "~25,559km" });//
			set({ "Polar Diameter": "~24,973km" });//
		} else if (lengthUnit === "mi") { //km to mi, divide the length value by 1.609344
			set({ "Equatorial Diameter": "~15,882mi" }); //15881.6263
			set({ "Polar Diameter": "~15,518mi" }); //15517.5028
		} else if (lengthUnit === "m") {
			set({ "Equatorial Diameter": "~25,559,000m" });
			set({ "Polar Diameter": "24,973,000m" });
		} else if (lengthUnit === "ft") { //m to ft, multiply the length value by 3.2808399
			set({ "Equatorial Diameter": "`83,855,000ft" }); //8.3855.E+07
			set({ "Polar Diameter": "81,935,040ft" }); //81935040
		}
	}, [lengthUnit]);

	//Orbitals
	useEffect(() => {
		if (orbitalUnit === "sidereal") {
			setOrbital({ "Orbital Period": "84.0205 yr | 30,688.5d" });
			setOrbital({ "Rotational Period": "Retrograde, 17h 14min 24s | 0.71833d" });
		} else if (orbitalUnit === "solar/synodic") {
			setOrbital({ "Orbital Period": "369.66d" });
			setOrbital({ "Rotational Period": "Retrograde, -17h 14m 23s | 0.71832d" });
		}
	}, [orbitalUnit]);

	const setMoon = () => {
		console.log("setMoon()");
	}

	return <LevaPanel store={infoStore} flat titleBar={{title: "Uranus Info"}} />;
};

export default UranusInfo;