import { useEffect } from "react";
import { useControls, useCreateStore, LevaPanel } from "leva";
import { parsePhysicalInfo, parseAtmosphereInfo, parseOrbitalInfo, parseMoonsInfo, setReturnBtn } from "./parse-info";

const InfoPanel = ({ data, tempUnit, pressureUnit, lengthUnit, orbitalUnit, parentTargetCoords, parentTargetZoomLevel,
				targetMoonsCoords, zoomToObject }) => {
	console.log("InfoPanel()");
	const infoStore = useCreateStore();
	let physicalInfo = parsePhysicalInfo(data);
	let atmosphereInfo = parseAtmosphereInfo(data);
	let orbitalInfo = parseOrbitalInfo(data);
	let moonsInfo = parseMoonsInfo(data, targetMoonsCoords, zoomToObject);
	let returnBtn = setReturnBtn(data.classification, parentTargetCoords, data.parentSatellite, parentTargetZoomLevel, zoomToObject);

	//Options created within the useControls hook will be persisted between React re-renders, similar to how useState works.
	const [, setPhysical] = useControls("Physical", () => (physicalInfo), { store: infoStore }); 
	const [, setPressure] = useControls("Atmosphere Composition", () => (atmosphereInfo), { store: infoStore }); 
	const [, setOrbital] = useControls("Orbitals", () => (orbitalInfo), { store: infoStore });
	const [, setMoons]= useControls("Moons", () => (moonsInfo), { store: infoStore });
	useControls("Return", () => (returnBtn), { store: infoStore });

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

		switch (data.shape) {
			case "Sphere": //length, width, height the same
				setPhysical({ "Mean Diameter": "~ " + (data.meanDiameter * x).toFixed(1) + abbr });
				break;
			case "Oblate Spheroid": //length & width same but height different
				setPhysical({ "Equatorial Diameter": "~ " + (data.equatorialDiameter * x).toFixed(1) + abbr });
				setPhysical({ "Polar Diameter": "~ " + (data.polarDiameter * x).toFixed(1) + abbr });
				break;
			case "Triaxial Ellipsoid": //length, width, height are all different
			case "Irregular":
				setPhysical({ "Dimensions": (data.length * x).toFixed(1) + abbr + " X " + 
					(data.width * x).toFixed(1) + abbr + " X " + (data.height * x).toFixed(1) + abbr });
				break;
			default:
				break;
		}

		if (data.highestPointName !== "N/A" && data.highestPointName !== "Unknown") {
			setPhysical({ "Highest Point": data.highestPointName + " | " + (data.highestPointValue * x).toFixed(1) + abbr });
		}
		
		if (data.lowestPointName !== "N/A" && data.lowestPointName !== "Unknown") {
			setPhysical({ "Lowest Point": data.lowestPointName + " | " + (data.lowestPointValue * x).toFixed(1) + abbr });
		}

		if (data.averageOrbitalSpeed !== "N/A" && data.averageOrbitalSpeed !== "Unknown") {
		setOrbital({"Average Orbital Speed": (data.averageOrbitalSpeed * x).toFixed(2) + abbr + "/s"});
		}

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

		if (data.minTemperature === "N/A") {
			setPhysical({ "Mean Temperature": "~ " + (data.meanTemperature * x) + y + abbr });
		} else if (data.meanTemperature === "N/A") {
			setPhysical({ "Temperature Range": (data.minTemperature * x) + y + abbr + " to " 
				+ (data.maxTemperature * x) + y + abbr });
		} else {
			setPhysical({ "Temperature Range": (data.minTemperature * x) + y + abbr + " to " 
				+ (data.maxTemperature * x) + y + abbr });
			setPhysical({ "Mean Temperature": "~ " + (data.meanTemperature * x) + y + abbr });
		}

	}, [tempUnit]); 

 	//Pressure
 	useEffect(() => {
		let x;
		let abbr;

		if (pressureUnit === "atm") {
			x = 1;
			abbr = "atm";
		} else if (pressureUnit === "PA") {
			x = 101325;
			abbr = "PA";
		}

		if (data.atmosphere === "None" || data.atmosphere === "Gas Giant" || data.atmosphere === "Ice Giant" ) {
			//Do nothing
		} else {
			setPressure({ "Pressure": "~ " + (data.pressure * x) + abbr });
		}

	}, [pressureUnit]); 

 	//Orbitals
	useEffect(() => {
		if (orbitalUnit === "sidereal") {
			setOrbital({ "Orbital Period":  data.orbitalSidereal});
			setOrbital({ "Rotational Period": data.rotationalSidereal });
		} else if (orbitalUnit === "solar/synodic") {
			setOrbital({ "Orbital Period": data.orbitalSynodic });
			setOrbital({ "Rotational Period": data.rotationalSynodic });
		}
	}, [orbitalUnit]); 

	return <LevaPanel store={infoStore} flat titleBar={{title: data.name + " Info"}} />;
};

export default InfoPanel;

	/* 		let numberedInputs = document.getElementsByClassName("leva-c-ghmOOI-gsXdEb-levaType-number");
		for (let i = 0; i < numberedInputs.length; i++) {
			let element = numberedInputs.item(i);
			element.classList.remove("leva-c-ghmOOI-gsXdEb-levaType-number");
		} */

	//Needed to fix weird bug where fields that haven't been set by the other useEffect()'s will not update
	//when changing the data on the info panel (looking a new planet or moon)
/* 	useEffect(() => {
			console.log("useEffect() satellite-info data");
			setPhysical({ Classification: data.classification, });
			setPhysical({ Type: data.type });
			setPhysical({ "Surface Gravity": "~ " + data.surfaceGravity +"g" });
			setPhysical({ "Mean Body Density": "~ " + data.meanBodyDensity + "g/cm3" });
			setOrbital({"Average Orbital Speed": data.averageOrbitalSpeed});
			setOrbital({"Eccentricity": data.eccentricity});
	}, [data]);  */