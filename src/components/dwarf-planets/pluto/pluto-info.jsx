import { useEffect } from "react";
import { useControls, LevaPanel, button } from "leva";

const PlutoInfo = ({ infoStore, tempUnit, pressureUnit, lengthUnit, orbitalUnit }) => {
	console.log("PlutoInfo()");

	//https://en.wikipedia.org/wiki/Moons_of_Pluto

	//Options created within the useControls hook will be persisted between React re-renders, similar to how useState works.
	const [, set] = useControls("Physical", () => ({
		Type: "Terrestial/Rocky Body",
		Age: "~4.5 billion Years",
		"Equatorial Diameter": "~2,376.6km",
		"Polar Diameter": "~2,376.6km",
		"Temperature Range": "-240.15°C to -218.15°C",
		"Mean Temperature": "-229°C",
		"Surface Gravity": "~0.063g",
		"Mean Body Density": "1.85g/cm3",
		"Highest Point": "Tenzing Montes, peak 'T2', ~6.2km | ~3.9mi | ~20,592ft", 
		"Lowest Point": "Unknown"
	}), { store: infoStore }); 

	const [, setPressure] = useControls("Atmosphere Composition", () => ({
		"Pressure": "Trace, 0.00000987atm",
		"Nitrogen": "~90%",
		"Complex Compounds": "~9.6%",
		"Methane": "~0.25%",
		"Carbon Dioxide": "~0.15%",
	}), { store: infoStore }); 


	const [, setOrbital] = useControls("Orbitals", () => ({
		"Orbital Period": "247.94yrs | 90,560d",
		"Rotational Period": "6d 9h 17m 36s | 6.38723d",
		"Average Orbital Speed": "4.74km/s",
		"Eccentricity": "0.2488"
 	}), { store: infoStore });

	//https://en.wikipedia.org/wiki/Moons_of_Pluto
	//zoomToObject(object, zoomLevel, x, y, z)
	const moons = useControls("Moons", {
		"Charon:": button(() => setMoon()),
		"Hydra": button(() => setMoon()),
		"Nix": button(() => setMoon()),
		"Kerberos": button(() => setMoon()),
		"Styx": button(() => setMoon())
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
			set({ "Temperature Range": "-240.15°C to -218.15°C" });
			set({ "Mean Temperature": "-229°C" });
		} else if (tempUnit === "F") {
			set({ "Temperature Range": "-400.27°F to -360.67°F" });
			set({ "Mean Temperature": "-380.2°F" });
		}
	}, [tempUnit]);

	//Pressures
 	useEffect(() => {
		if (pressureUnit === "atm") {
			setPressure({ "Pressure": "Trace | 0.00000987atm", });
		} else if (pressureUnit === "PA") {
			setPressure({ "Pressure": "Trace | 1.00008PA", });
		}
	}, [pressureUnit]);

	//Lengths			"Equatorial Diameter": "~2,376.6km",
	//"Polar Diameter": "~2,376.6km",
	//"Highest Point": "Tenzing Montes, peak 'T2', ~6.2km | ~3.9mi | ~20,592ft", 
	//"Lowest Point": "Unknown"
	useEffect(() => {
		if (lengthUnit === "km") {
			set({ "Equatorial Diameter": "~2,376.6km" });
			set({ "Polar Diameter": "~2,376.6km" });
			set({ "Highest Point": "Tenzing Montes, peak 'T2', ~6.2km" });
		} else if (lengthUnit === "mi") { //km to mi, divide the length value by 1.609344
			set({ "Mean Equatorial Diameter": "~1,476.8mi" });
			set({ "Mean Polar Diameter": "~1,476.8mi" });
			set({ "Highest Point": "Tenzing Montes, peak 'T2' | ~3.85mi" });
		} else if (lengthUnit === "m") {
			set({ "Mean Equatorial Diameter": "~2,376,600m" });
			set({ "Mean Polar Diameter": "~2,376,600m" });
			set({ "Highest Point": "Tenzing Montes, peak 'T2' | ~6,200m" });
		} else if (lengthUnit === "ft") { //m to ft, multiply the length value by 3.2808399
			set({ "Mean Equatorial Diameter": "~7,797,244ft" });
			set({ "Mean Polar Diameter": "~7,797,244ft" });
			set({ "Highest Point": "Tenzing Montes, peak 'T2' | ~20,341ft" });
		}
	}, [lengthUnit]);

	//Orbitals
	useEffect(() => {
		if (orbitalUnit === "sidereal") {
			setOrbital({ "Orbital Period": "247.94yrs | 90,560d" });
			setOrbital({ "Rotational Period": "6d 9h 17m 36s | 6.38723d" });
		} else if (orbitalUnit === "solar/synodic") {
			setOrbital({ "Orbital Period": "366.73d" });
			setOrbital({ "Rotational Period": "6d 9h 17m 00s | 6.38680d" });
		}
	}, [orbitalUnit]);

	const setMoon = () => {
		console.log("setMoon()");
	}

	return <LevaPanel store={infoStore} flat titleBar={{title: "Mars Info"}} />;
};

export default PlutoInfo;