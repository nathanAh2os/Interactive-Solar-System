import { useEffect } from "react";
import { useControls, useCreateStore, LevaPanel } from "leva";

const SunInfoPanel = ({ data, tempUnit, lengthUnit }) => {
	console.log("SunInfoPanel()");
	const infoStore = useCreateStore();
	let physicalInfo = {
        Classification: data.classification,
        "Equatorial Diameter": "~ " + data.equatorialDiameter + "km",
        "Polar Diameter": "~ " + data.polarDiameter + "km",
        "Core Temperature": "~ " + data.centerTemperature + "°C",
        "Photosphere Temperature": "~ " + data.photosphereTemperature + "°C",
        "Corona Temperature": "~ " + data.coronaTemperature + "°C",
        "Photosphere Gravity": "~ " + 27.9 + "g",
		"Mean Body Density": "~ " + 1.408 + "g/cm3",
    }
	let atmosphereInfo = {
				Hydrogen: "~73.46%",
				Helium: "~24.85%",
				Oxygen: "~0.77%",
				Carbon: "~0.29%",
				Iron: "~0.16%",
				Neon: "~0.12%",
				Nitrogen: "~0.09%",
				Silicon: "~0.07%",
				Magnesium: "~0.05%",
				Sulfur: "~0.04%",
			};
	let orbitalInfo = {"Galactic Center Orbital Period": "225-250 million yrs",
			"Equatorial Rotational Period": "25.05d",
			"Polar Rotational Period": "34.40d",
			"Galactic Center Orbital Speed": 251 + "km/s",
			"Stellar Orbital Speed": 20 + "km/s",
			"Cosmic Background Orbital Speed": 370 + "km/s"}

	//Options created within the useControls hook will be persisted between React re-renders, similar to how useState works.
	const [, setPhysical] = useControls("Physical", () => (physicalInfo), { store: infoStore }); 
	const [, setPressure] = useControls("Photosphere Composition", () => (atmosphereInfo), { store: infoStore }); 
	const [, setOrbital] = useControls("Orbitals", () => (orbitalInfo), { store: infoStore });

	useEffect(() => {
		//Adds read-only attribute to every input field
		let inputElements = document.getElementsByClassName("leva-c-ghmOOI");
		for (let i = 0; i < inputElements.length; i++) {
			let element = inputElements.item(i);
			element.setAttribute("readonly", "true");
		}
		//Needed because remounting info, esp. with different data, can otherwise cause formatting issues
		let folders = document.getElementsByClassName("leva-c-hBtFDW");
		for (let folder of folders) {
			if (folder.style.height !== "0px") {
				folder.style.removeProperty("height");
			}
		}

	});

	//Lengths
	useEffect(() => {
		let x;
		let abbr;

		//So switching between info panels updates this properly
		setPhysical({ Classification: data.classification });

		if (lengthUnit === "km") {
			x = 1;
			abbr = "km";
		} else if (lengthUnit === "mi") { //km to mi, divide the length value by 1.609344, or * by reciprocal
			x = 0.62137119;
			abbr = "mi";
		}
        setPhysical({ "Equatorial Diameter": "~ " + (data.equatorialDiameter * x).toFixed(1) + abbr });
		setPhysical({ "Polar Diameter": "~ " + (data.polarDiameter * x).toFixed(1) + abbr });

		setOrbital({"Galactic Center Orbital Speed": (data.galacticCenterOrbitalSpeed * x).toFixed(2) + abbr + "/s"});
        setOrbital({"Stellar Orbital Speed": (data.stellarOrbitalSpeed * x).toFixed(2) + abbr + "/s"});
        setOrbital({"Cosmic Background Orbital Speed": (data.cosmicBackgroundOrbitalSpeed * x).toFixed(2) + abbr + "/s"});
	}, [lengthUnit]);

  	//Temperatures, °F = (°C × 1.8) + 32
	useEffect(() => {
		let x;
		let y;
		let abbr;

		if (tempUnit === "C") {
			x = 1;
			y = ""; //Set to empty string rather than 0
			abbr = "°C";
		} else if (tempUnit === "F") {
			x  = 1.8;
			y = 32;
			abbr = "°F";
		}
		setPhysical({ "Core Temperature": "~ " + (data.centerTemperature * x) + y + abbr });
        setPhysical({ "Photosphere Temperature": "~ " + (data.photosphereTemperature * x) + y + abbr });
        setPhysical({ "Corona Temperature": "~ " + (data.coronaTemperature * x) + y + abbr });
	}, [tempUnit]); 

	return <LevaPanel store={infoStore} flat titleBar={{title: data.name + " Info"}} />;
};

export default SunInfoPanel;