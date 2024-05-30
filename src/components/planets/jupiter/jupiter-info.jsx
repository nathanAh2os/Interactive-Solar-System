import { useEffect } from "react";
import { useControls, LevaPanel, button } from "leva";

const JupiterInfo = ({ infoStore, tempUnit, lengthUnit, orbitalUnit }) => {
	console.log("JupiterInfo()");

	//https://www.britannica.com/place/Jupiter-planet/Radio-emission
	//Include Layers Info?
	//Jupiter Upper Atmosphere - 1,340 F (725 C)
	//Surface, "Features": "Hydrogen Gas & Ammonia Crystal Clouds"
	//Liquid Hydrogen Ocean 10,000° K
	//Core not sure if solid

/* Outer Layer: The outermost layer is the gaseous envelope, primarily composed of hydrogen and helium.
Liquid Metallic Hydrogen Layer: Deeper down, the pressure and temperature increase significantly. 
Here, hydrogen transitions from a molecular fluid to a metallic fluid.
Solid Core: At the very center, there’s a solid core made of heavy elements, 
possibly surrounded by a layer of liquid metallic hydrogen. */

	//Options created within the useControls hook will be persisted between React re-renders, similar to how useState works.
	const [, set] = useControls("Physical", () => ({
		Type: "Gas Giant",
		Age: "~4.5 billion Earth Years",
		"Mean Equatorial Diameter": "142,984km",
		"Mean Polar Diameter": "133,708km",
		"Mean Density": "1.33g/cm3",
		"Surface Defined": "where pressure = earth's surface pressure (1atm)",
		"Mean 'Surface' Gravity": "~2.53g",
		"Mean 'Surface' Temperature": "-145°C",
	}), { store: infoStore }); 

	useControls("Atmosphere Composition", () => ({
		"Hydrogen": "~89%",
		"Helium": "~10%",
		"Methane": "~0.3%",
		"Ammonia": "~0.026%",
		"Other": "~0.5%"
	}), { store: infoStore }); 

	const [, setOrbital] = useControls("Orbitals", () => ({
		"Orbital Period": "11.862 yr | 4,332.590d", 
		"Rotational Period": "9h 55m 30s | 0.413542d",
		"Average Orbital Speed": "13.07km/s",
		"Eccentricity": "0.0487"
 	}), { store: infoStore });

	//https://en.wikipedia.org/wiki/Moons_of_Jupiter
	//zoomToObject(object, zoomLevel, x, y, z)
	const moons = useControls("Galilean Satellites", {
		"Ganymede:": button(() => setMoon()),
		"Callisto": button(() => setMoon()),
		"Io": button(() => setMoon()),
		"Europa": button(() => setMoon())
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
			set({ "Mean 'Surface' Temperature": "-145°C" });
		} else if (tempUnit === "F") {
			set({ "Mean 'Surface' Temperature": "-229°F" });
		}
	}, [tempUnit]);

	//Lengths
	useEffect(() => {
		if (lengthUnit === "km") {
			set({ "Mean Equatorial Diameter": "~142,984km" });//
			set({ "Mean Polar Diameter": "~133,708km" });//
		} else if (lengthUnit === "mi") { //km to mi, divide the length value by 1.609344
			set({ "Mean Equatorial Diameter": "~88,846mi" }); //88,846.14mi
			set({ "Mean Polar Diameter": "~83,082mi" }); //83,082.30mi
		} else if (lengthUnit === "m") {
			set({ "Mean Equatorial Diameter": "142,984,000m" });
			set({ "Mean Polar Diameter": "133,708,000m" });
		} else if (lengthUnit === "ft") { //m to ft, multiply the length value by 3.2808399
			set({ "Mean Equatorial Diameter": "469,107,612ft" }); //469,107,612.26ft
			set({ "Mean Polar Diameter": "438,674,541ft" }); //438,674,541.35ft
		}
	}, [lengthUnit]);

	//Orbitals
	useEffect(() => {
		if (orbitalUnit === "sidereal") {
			setOrbital({ "Orbital Period": "11.862 yr | 4,332.590d" });
			setOrbital({ "Rotational Period": "9h 55m 30s | 0.413542d" });
		} else if (orbitalUnit === "solar/synodic") {
			setOrbital({ "Orbital Period": "398.880d" });
			setOrbital({ "Rotational Period": "9h 55m 33s | 0.413575d" });
		}
	}, [orbitalUnit]);

	const setMoon = () => {
		console.log("setMoon()");
	}

	return <LevaPanel store={infoStore} flat titleBar={{title: "Jupiter Info"}} />;
};

export default JupiterInfo;