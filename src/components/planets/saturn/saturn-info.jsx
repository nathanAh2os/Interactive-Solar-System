import { useEffect } from "react";
import { useControls, LevaPanel, button } from "leva";

const SaturnInfo = ({ infoStore, tempUnit, lengthUnit, orbitalUnit }) => {
	console.log("SaturnInfo()");

	//Options created within the useControls hook will be persisted between React re-renders, similar to how useState works.
	const [, set] = useControls("Physical", () => ({
		Type: "Gas Giant",
		Age: "~4.5 billion Earth Years",
		"Mean Equatorial Diameter": "~120,536km",
		"Mean Polar Diameter": "~108,728km",
		"Mean Density": "0.687g/cm3",
		"Surface Defined": "where pressure = earth's surface pressure (1atm)",
		"Mean 'Surface' Gravity": "1.065g", 	 
		"Mean 'Surface' Temperature": "-140°C",
	}), { store: infoStore }); 

	useControls("Atmosphere Composition", () => ({
		"Hydrogen": "~96.29%",
		"Helium": "~3.25%",
		"Methane": "~0.45%",
		"Other": "~0.01%"
	}), { store: infoStore }); 

	const [, setOrbital] = useControls("Orbitals", () => ({
		"Orbital Period": "29.4475yr | 10,755.70d",
		"Rotational Period": "10h 33m 38s",
		"Average Orbital Speed": "9.68km/s ",
		"Eccentricity": "0.0565"
 	}), { store: infoStore });

	//https://en.wikipedia.org/wiki/Moons_of_Saturn
	//zoomToObject(object, zoomLevel, x, y, z)
	const moons = useControls("Major Satellites", {
		"Titan:": button(() => setMoon()),
		"Rhea": button(() => setMoon()),
		"Iapetus": button(() => setMoon()),
		"Dione": button(() => setMoon()),
		"Tethys": button(() => setMoon()),
		"Enceladus": button(() => setMoon()),
		"Mimas": button(() => setMoon())
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
			set({ "Mean 'Surface' Temperature": "-140°C" });
		} else if (tempUnit === "F") {
			set({ "Mean 'Surface' Temperature": "-220°F" });
		}
	}, [tempUnit]);

	//Lengths
	useEffect(() => {
		if (lengthUnit === "km") {
			set({ "Mean Equatorial Diameter": "~120,536km" });//
			set({ "Mean Polar Diameter": "~108,728km" });//
		} else if (lengthUnit === "mi") { //km to mi, divide the length value by 1.609344
			set({ "Mean Equatorial Diameter": "~74,898mi" }); //74897.598
			set({ "Mean Polar Diameter": "~67,560mi" }); //67560.447
		} else if (lengthUnit === "m") {
			set({ "Mean Equatorial Diameter": "120,536,000m" });
			set({ "Mean Polar Diameter": "108,728,000m" });
		} else if (lengthUnit === "ft") { //m to ft, multiply the length value by 3.2808399
			set({ "Mean Equatorial Diameter": "395,461,440ft" }); //469,107,612.26ft
			set({ "Mean Polar Diameter": "356,716,800ft" }); //438,674,541.35ft
		}
	}, [lengthUnit]);

	//Orbitals
	useEffect(() => {
		if (orbitalUnit === "sidereal") {
			setOrbital({ "Orbital Period": "29.4475yr | 10,755.70d" });
			setOrbital({ "Rotational Period": "10h 33m 38s" });
		} else if (orbitalUnit === "solar/synodic") {
			setOrbital({ "Orbital Period": "378.09d" });
			setOrbital({ "Rotational Period": "10h 32m 36s" });
		}
	}, [orbitalUnit]);

	const setMoon = () => {
		console.log("setMoon()");
	}

	return <LevaPanel store={infoStore} flat titleBar={{title: "Saturn Info"}} />;
};

export default SaturnInfo;