import { useEffect } from "react";
import { useControls, LevaPanel, button } from "leva";

const NeptuneInfo = ({ infoStore, tempUnit, pressureUnit, lengthUnit, orbitalUnit }) => {
	console.log("NeptuneInfo()");

	//Options created within the useControls hook will be persisted between React re-renders, similar to how useState works.
	const [, set] = useControls("Physical", () => ({
		Type: "Ice Giant",
		Age: "~4.5 billion Earth Years",
		"Equatorial Diameter": "~49,528km",
		"Polar Diameter": "~48,682km",
		"Mean Density": "1.64 g/cm3",
		"Surface Defined": "where pressure = earth's surface pressure (1atm)",
		"Mean 'Surface' Gravity": "1.14g", 	 
		"Mean 'Surface' Temperature": "-200°C",
	}), { store: infoStore }); 

	useControls("Atmosphere Composition", () => ({
		"Hydrogen": "~80%",
		"Helium": "~18.4%",
		"Methane": "~1.5%",
		"Other": "~0.1%"
	}), { store: infoStore }); 

	const [, setOrbital] = useControls("Orbitals", () => ({
		"Orbital Period": "164.8yr | 60,195d", //164.8 yr OR syndoic 367.49 days
		"Rotational Period": "16h 6min 36s | 0.6713d", //Synodic rotation period	0.67125 d 16 h 6 m 36 s[6]
		"Average Orbital Speed": "5.43km/s",
		"Eccentricity": "0.008678"
 	}), { store: infoStore });

	//zoomToObject(object, zoomLevel, x, y, z)
	//https://en.wikipedia.org/wiki/Moons_of_Neptune
	const moons = useControls("Major Moon", {
		"Triton": button(() => setMoon())
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
			set({ "Mean 'Surface' Temperature": "-200°C" });
		} else if (tempUnit === "F") {
			set({ "Mean 'Surface' Temperature": "-330°F" });
		}
	}, [tempUnit]);

	//Lengths
	useEffect(() => {
		if (lengthUnit === "km") {
			set({ "Equatorial Diameter": "~49,528km" });//
			set({ "Polar Diameter": "~48,682km" });//
		} else if (lengthUnit === "mi") { //km to mi, divide the length value by 1.609344
			set({ "Equatorial Diameter": "~30,775mi" }); //30,775.2724
			set({ "Polar Diameter": "~30,250mi" }); //30,249.5924
		} else if (lengthUnit === "m") {
			set({ "Equatorial Diameter": "~49,528,000m" });
			set({ "Polar Diameter": "~48,682,000m" });
		} else if (lengthUnit === "ft") { //m to ft, multiply the length value by 3.2808399
			set({ "Equatorial Diameter": "~162,867,826ft" }); //8.3855.E+07
			set({ "Polar Diameter": "~159,717,848ft" }); //81935040
		}
	}, [lengthUnit]);

	//Orbitals
	useEffect(() => {
		if (orbitalUnit === "sidereal") {
			setOrbital({ "Orbital Period": "164.8yr | 60,195d" });
			setOrbital({ "Rotational Period": "16h 6min 36s | 0.6713d" });
		} else if (orbitalUnit === "solar/synodic") {
			setOrbital({ "Orbital Period": "367.49d" });
			setOrbital({ "Rotational Period": "16h 6m 36s | 0.67125d" });
		}
	}, [orbitalUnit]);

	const setMoon = () => {
		console.log("setMoon()");
	}

	return <LevaPanel store={infoStore} flat titleBar={{title: "Uranus Info"}} />;
};

export default NeptuneInfo;