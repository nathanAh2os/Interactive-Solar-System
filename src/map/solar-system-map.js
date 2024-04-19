//React imports
import { useRef, useEffect, useState } from "react";

//React-Three-Fiber imports
import { Canvas } from "@react-three/fiber";

//React-Three-Drei imports
import { OrbitControls } from "@react-three/drei";

//Leva imports
import { useControls, button, buttonGroup, useStoreContext, useCreateStore, LevaPanel } from "leva";
//https://github.com/pmndrs/leva#readme
//https://sbcode.net/react-three-fiber/leva/
//https://leva.mentat.org/

//Lodash imports
import { throttle } from "lodash";

//TWEEN imports
import TWEEN from "@tweenjs/tween.js";

//Scene component imports
import Sun from "../components/sun";
import Mercury from "../components/planets/mercury";
import Venus from "../components/planets/venus";
import Earth from "../components/planets/earth";
import Mars from "../components/planets/mars";
import Jupiter from "../components/planets/jupiter";
import Saturn from "../components/planets/saturn";
import Uranus from "../components/planets/uranus";
import Neptune from "../components/planets/neptune";
import Pluto from "../components/dwarf-planets/pluto";
import Tween from "./tween";

import EarthMoon from "../components/moons/earth-moon";

//Leva Satellite Info imports
import MercuryInfo from "../components/planets/planet-info/mercury-info";
import VenusInfo from "../components/planets/planet-info/venus-info";
import EarthInfo from "../components/planets/planet-info/earth-info";
import MarsInfo from "../components/planets/planet-info/mars-info";
import JupiterInfo from "../components/planets/planet-info/jupiter-info";
import SaturnInfo from "../components/planets/planet-info/saturn-info";
import UranusInfo from "../components/planets/planet-info/uranus-info";
import NeptuneInfo from "../components/planets/planet-info/neptune-info";
import PlutoInfo from "../components/dwarf-planets/dwarf-planet-info/pluto-info";

const SolarSystemMap = () => {
	console.log("SolarSystemMap()");

	const julian1970Date = 2460348.51351; //Julian Ephemeris on January 1, 1970
	const refreshTime = 360000; //1 hour
	const zoomShowInnerLabel = 5000;
	//const refreshTime = 5000;
	const DOMAIN_URL = "http://localhost:3000/";
	//const DOMAIN_URL = "https://react-map-project-95e99.web.app/";
	const cameraSettings = {
		fov: 0.25, //field of view
		near: 0.01, //near plane
		far: 10000000, //far plane
		position: [0, 0, 25000],
		aspectRatio: window.innerWidth / window.innerHeight,
	};
	const scene = { antialias: true, logarithmicDepthBuffer: true };
	const ref = useRef();

	// ********** STATE VALUES **********

	//Date.now() returns the number of milliseconds since January 1, 1970
	//86400000 is the number of milliseconds in 1 day
	//[Date.now() - 86400000] = number of days since January 1, 1970
	//Adding both values together gets our current Julian Ephemeris Date
	let [julianEphemerisDate, setDate] = useState(Date.now() / 86400000 + julian1970Date);
	let [showDwarfPlanets, setShowDwarfPlanets] = useState(false);
	let [showComets, setShowComets] = useState(false);
	let [searchTerm, setSearchTerm] = useState("");
	let [matchedSearchList, setMatchedSearchList] = useState([]);
	let [target, setTarget] = useState("none");
	let [innerLabels, setInnerLabels] = useState(false);
	console.log("julian date: ");
	console.log(julianEphemerisDate);
	//Unit state values
	let [tempUnit, setTempUnit] = useState("C");
	let [pressureUnit, setPressureUnit] = useState("atm");
	let [lengthUnit, setLengthUnit] = useState("km");
	let [orbitalUnit, setOrbitalUnit] = useState("sidereal");

	let searchList = ["mercury", "mars", "venus", "earth", "jupiter", "saturn", "uranus", "neptune"];

	//JSX values
	let matchedSearchListJSX;
	let dropDownContentJSX;
	let satelliteInfoJSX;

	const optionsStore = useCreateStore();
	const infoStore = useCreateStore();

	//Leva GUI - useControl hook automatically creates a Leva GUI Overlay
	const filterOptions = useControls(
		"Filter Options",
		{ "Dwarf Planets": showDwarfPlanets, Comets: showComets },
		{ store: optionsStore }
	);

	const controlOptions = useControls(
		"Control Options",
		{
			"Zoom Speed": { value: 5, min: 0, max: 10, step: 1 },
			"Rotate Speed": { value: 1, min: 0, max: 2, step: 0.1 },
			"Panning Speed": { value: 1, min: 0, max: 2, step: 0.1 },
			"Reset Camera": button(() => resetCamera()),
		},
		{ store: optionsStore }
	);

	const unitOptions = useControls(
		"Unit Options",
		{
			Temperature: buttonGroup({
				"°F": () => setTempUnit("F"),
				"°C": () => setTempUnit("C"),
			}),
			Pressure: buttonGroup({
				atm: () => setPressureUnit("atm"),
				PA: () => setPressureUnit("PA"),
			}),
			Length: buttonGroup({
				km: () => setLengthUnit("km"),
				mi: () => setLengthUnit("mi"),
				m: () => setLengthUnit("m"),
				ft: () => setLengthUnit("ft"),
			}),
			Orbital: buttonGroup({
				sidereal: () => setOrbitalUnit("sidereal"),
				solar: () => setOrbitalUnit("solar/synodic"),
			}),
		},
		{ store: optionsStore }
	);

	const searchOptions = useControls(
		{
			Search: {
				value: searchTerm,
				onChange: (value) => {
					console.log("onChange()");
					console.log(target);
					// imperatively update the world after Leva input changes
					let lowerCaseValue = value.toLowerCase();
					let tempArray = [];

					if (value.length > 0) {
						searchList.forEach((term) => {
							if (term.includes(lowerCaseValue)) {
								let capitalizedTerm = term.charAt(0).toUpperCase() + term.slice(1);
								tempArray.push(capitalizedTerm);
							}
						});
					}
					setMatchedSearchList(tempArray);
					setSearchTerm(lowerCaseValue);
					//selectedSearchTerm(lowerCaseValue);
				},
				transient: false,
			},
		},
		{ store: optionsStore }
	);

	if (target === "none") {
		satelliteInfoJSX = null;
	} else {
		switch (target) {
			case "mercury":
				satelliteInfoJSX = <MercuryInfo />;
				break;
			case "venus":
				satelliteInfoJSX = <VenusInfo />;
				break;
			case "earth":
				satelliteInfoJSX = (
					<EarthInfo
						infoStore={infoStore}
						tempUnit={tempUnit}
						pressureUnit={pressureUnit}
						lengthUnit={lengthUnit}
						orbitalUnit={orbitalUnit}
					/>
				);
				break;
			case "mars":
				satelliteInfoJSX = <MarsInfo />;
				break;
			case "jupiter":
				satelliteInfoJSX = <JupiterInfo />;
				break;
			case "saturn":
				satelliteInfoJSX = <SaturnInfo />;
				break;
			case "uranus":
				satelliteInfoJSX = <UranusInfo />;
				break;
			case "neptune":
				satelliteInfoJSX = <NeptuneInfo />;
				break;
			case "pluto":
				satelliteInfoJSX = <PlutoInfo />;
				break;
			case "none":
				satelliteInfoJSX = null;
				break;
			default:
				break;
		}
	}

	/* 	//No matches found
	if (searchTerm.length > 0 && matchedSearchList.length === 0) {
		matchedSearchListJSX = <li className="matched-search-term">No matches found!</li>;
		dropDownContentJSX = (
			<div className="search-dropdown-content">
				<ul>{matchedSearchListJSX}</ul>
			</div>
		);
	}
	//Matches found
	else if (searchTerm.length > 0 && matchedSearchList.length > 0) {
		matchedSearchListJSX = matchedSearchList.map((matchedTerm, index) => (
			<li className="matched-search-term" key={index} onClick={() => selectedSearchTerm(matchedTerm)}>
				<p>{matchedTerm}</p>
			</li>
		));
		dropDownContentJSX = (
			<div className="search-dropdown-content">
				<ul>{matchedSearchListJSX}</ul>
			</div>
		);
	}
	//No search - no dropdown content
	else if (searchTerm.length === 0) {
		dropDownContentJSX = null;
	} */

	useEffect(() => {
		console.log("SolarSystemMap() useEffect()");
		setInterval(() => {
			console.log("interval");
			setDate(Date.now() / 86400000 + julian1970Date);
		}, refreshTime);
	}, []);

	// ********** DEFINED FUNCTIONS **********

	const zoomToObject = (name, zoomLevel, x, y, z) => {
		console.log("zoomToObject()");

		//Rotate camera to point at new object
		new TWEEN.Tween(ref.current.target).to({ x: x, y: y, z: z }).easing(TWEEN.Easing.Cubic.Out).start();

		//Move the camera to new position
		new TWEEN.Tween(ref.current.object.position)
			.to({ x: x, y: y, z: zoomLevel }, 4000)
			.easing(TWEEN.Easing.Cubic.Out)
			.start();

		//To trigger setting satellite info
		setTarget(name);
	};

	const resetCamera = () => {
		ref.current.reset();
		setTarget("none");
		setSearchTerm("");
	};

	//listens to zoom level so we can toggle inner planet labels on/off
	const handleZoom = () => {
		let currentZoomLevel = ref.current.getDistance();

		if (currentZoomLevel < zoomShowInnerLabel) {
			setInnerLabels(true); //Shows inner planet labels
		} else {
			setInnerLabels(false);
		}
	};

	return (
		<>
			{dropDownContentJSX}
			<div className="solar-system-map">
				<Canvas camera={cameraSettings} scene={scene}>
					<OrbitControls
						ref={ref}
						makeDefault
						zoomSpeed={controlOptions["Zoom Speed"]}
						rotateSpeed={controlOptions["Rotate Speed"]}
						panSpeed={controlOptions["Panning Speed"]}
						onChange={throttle(handleZoom, 500)}
					/>
					<Tween />
					<Sun DOMAIN_URL={DOMAIN_URL} zoomToObject={zoomToObject} searchTerm={searchTerm} />
					<Mercury
						DOMAIN_URL={DOMAIN_URL}
						julianEphemerisDate={julianEphemerisDate}
						zoomToObject={zoomToObject}
						searchTerm={searchTerm}
						innerLabels={innerLabels}
					/>
					<Venus
						DOMAIN_URL={DOMAIN_URL}
						julianEphemerisDate={julianEphemerisDate}
						zoomToObject={zoomToObject}
						searchTerm={searchTerm}
						innerLabels={innerLabels}
					/>
					<Earth
						DOMAIN_URL={DOMAIN_URL}
						julianEphemerisDate={julianEphemerisDate}
						zoomToObject={zoomToObject}
						searchTerm={searchTerm}
						innerLabels={innerLabels}
					/>
					<Mars
						DOMAIN_URL={DOMAIN_URL}
						julianEphemerisDate={julianEphemerisDate}
						zoomToObject={zoomToObject}
						searchTerm={searchTerm}
						innerLabels={innerLabels}
					/>
					<Jupiter
						DOMAIN_URL={DOMAIN_URL}
						julianEphemerisDate={julianEphemerisDate}
						zoomToObject={zoomToObject}
						searchTerm={searchTerm}
					/>
					<Saturn
						DOMAIN_URL={DOMAIN_URL}
						julianEphemerisDate={julianEphemerisDate}
						zoomToObject={zoomToObject}
						searchTerm={searchTerm}
					/>
					<Uranus
						DOMAIN_URL={DOMAIN_URL}
						julianEphemerisDate={julianEphemerisDate}
						zoomToObject={zoomToObject}
						searchTerm={searchTerm}
					/>
					<Neptune
						DOMAIN_URL={DOMAIN_URL}
						julianEphemerisDate={julianEphemerisDate}
						zoomToObject={zoomToObject}
						searchTerm={searchTerm}
					/>
					<Pluto
						DOMAIN_URL={DOMAIN_URL}
						julianEphemerisDate={julianEphemerisDate}
						zoomToObject={zoomToObject}
						searchTerm={searchTerm}
					/>
				</Canvas>
			</div>
			<LevaPanel store={optionsStore} flat titleBar={true} />
			{satelliteInfoJSX}
		</>
	);
};

export default SolarSystemMap;
