import { button } from "leva"; //For parseMoonsInfo

export const parsePhysicalInfo = (data) => {
	console.log("parsePhysicalInfo()");
	let physicalObj = { Classification: data.classification };
	let dimensionsObj;
	let temperaturesObj;
	let gravityObj;
	let densityObj;
	let elevationPointsObj;

	//Set dimensions
	switch (data.shape) {
		case "Sphere": //length, width, height the same
			dimensionsObj = { "Mean Diameter": "~ " + data.meanDiameter + "km" };
			break;
		case "Oblate Spheroid": //length & width same but height different
			dimensionsObj = {
				"Equatorial Diameter": "~ " + data.equatorialDiameter + "km",
				"Polar Diameter": "~ " + data.polarDiameter + "km",
			};
			break;
		case "Triaxial Ellipsoid": //length, width, height are all different
		case "Irregular":
			dimensionsObj = {
				Dimensions: data.length + "km X " + data.width + "km X " + data.height + "km",
			};
			break;
		default:
			break;
	}
	physicalObj = Object.assign(physicalObj, dimensionsObj);

	//Set temperatures
	if (
		data.minTemperature === "N/A" ||
		data.maxTemperature === "N/A" ||
		data.minTemperature === "Unknown" ||
		data.maxTemperature === "Unknown"
	) {
		temperaturesObj = { "Mean Temperature": "~ " + data.meanTemperature + "°C" };
	} else if (data.meanTemperature === "N/A" || data.meanTemperature === "Unknown") {
		//Case, mercury, ceres because temperatures vary so wildly
		temperaturesObj = { "Temperature Range": data.minTemperature + "°C to " + data.maxTemperature + "°C" };
	} else {
		temperaturesObj = {
			"Temperature Range": data.minTemperature + "°C to " + data.maxTemperature + "°C",
			"Mean Temperature": "~ " + data.meanTemperature + "°C",
		};
	}
	physicalObj = Object.assign(physicalObj, temperaturesObj);

	//polesSurfaceGravity: 0.000734,
	//majorAxisSurfaceGravity: 0.000286,

	//Set gravity
	if (data.surfaceGravity === "Unknown" || data.surfaceGravity === "N/A") {
		gravityObj = {};
	} else if (data.surfaceGravity === "Variable") {
		gravityObj = {
			"Major Axis Surface Gravity": "~ " + data.majorAxisSurfaceGravity + "g",
			"Poles Surface Gravity": "~ " + data.polesSurfaceGravity + "g",
		};
	} else {
		gravityObj = { "Surface Gravity": "~ " + data.surfaceGravity + "g" };
	}
	physicalObj = Object.assign(physicalObj, gravityObj);

	//Set density
	if (data.meanBodyDensity === "Unknown" || data.meanBodyDensity === "N/A") {
		densityObj = {};
	} else {
		densityObj = { "Mean Body Density": "~ " + data.meanBodyDensity + "g/cm3" };
	}
	physicalObj = Object.assign(physicalObj, densityObj);

	//Set highest and lowest points
	if (data.highestPointName === "N/A" || data.highestPointName === "Unknown") {
		elevationPointsObj = {};
	} else {
		if (data.lowestPointName === "Unknown") {
			elevationPointsObj = {
				"Highest Point": data.highestPointName + " | " + data.highestPointValue + "km",
			};
		} else {
			elevationPointsObj = {
				"Highest Point": data.highestPointName + " | " + data.highestPointValue + "km",
				"Lowest Point": data.lowestPointName + " | " + data.lowestPointValue + "km",
			};
		}
	}
	physicalObj = Object.assign(physicalObj, elevationPointsObj);

	return physicalObj;
};

export const parseAtmosphereInfo = (data) => {
	let atmosphereObj = null;
	if (data.atmosphere === "None") {
		atmosphereObj = { Atmosphere: "None" };
	} else if (data.atmosphere === "Gas Giant" || data.atmosphere === "Ice Giant") {
		atmosphereObj = data.atmosphereComposition;
	} else {
		let pressureObj = { Pressure: "~ " + data.pressure + "atm" };
		atmosphereObj = Object.assign(pressureObj, data.atmosphereComposition);
	}
	return atmosphereObj;
};

export const parseOrbitalInfo = (data) => {
	let orbitalObj = {
		"Orbital Period": data.orbitalSidereal,
		"Rotational Period": data.rotationalSidereal,
		"Average Orbital Speed": data.averageOrbitalSpeed + "km/s",
		Eccentricity: data.eccentricity,
	};
	return orbitalObj;
};

export const parseMoonsInfo = (data, targetMoonsCoords, zoomToObject) => {
	let moonsObj = {};
	console.log("parseMoonsInfo()");
	console.log(targetMoonsCoords);

	data.moons.forEach((moon, i) => {
		if (moon !== "none" && moon !== "N/A") {
			//targetMoonsCoords.forEach((value, index) => {
			console.log(targetMoonsCoords[i]);
			//console.log(targetMoonsCoords[i]["zoomLevel"]);
			let moonBtn = {
				[moon]: button(() =>
					zoomToObject(
						data.name,
						moon,
						targetMoonsCoords[i].zoomLevel, //value[index].zoomLevel,
						targetMoonsCoords[i].x, //value[index].x,
						targetMoonsCoords[i].y, //value[index].y,
						targetMoonsCoords[i].z //value[index].z
					)
				),
			};
			Object.assign(moonsObj, moonBtn);
			//});
		}
	});
	return moonsObj;
};

export const setReturnBtn = (classification, currentParentCoords, parentSatellite, parentZoomLevel, zoomToObject) => {
	let returnBtn = {};
	let x = currentParentCoords[0];
	let y = currentParentCoords[1];
	let z = currentParentCoords[2];

	if (classification === "Moon") {
		returnBtn = {
			["Return to Parent Satellite"]: button(() =>
				zoomToObject(parentSatellite, "none", parentZoomLevel, x, y, z)
			),
		};
	}
	return returnBtn;
};

//Utility functions
const setMoon = (parentSatellite, moon, targetMoonsCoords, zoomToObject) => {
	console.log("setMoon()");
	console.log(parentSatellite);
	console.log(moon);
	console.log(targetMoonsCoords);
	console.log(zoomToObject);
	targetMoonsCoords.forEach((value) => {
		console.log(value);
		console.log(moon);
		if (value.name === moon) {
			zoomToObject(parentSatellite, moon, value.zoomLevel, value.x, value.y, value.z);
		}
	});
};
