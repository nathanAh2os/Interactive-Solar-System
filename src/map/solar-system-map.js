//React imports
import { useRef, useEffect, useState } from "react";

//React-Three-Fiber imports
import { Canvas } from "@react-three/fiber";

//React-Three-Drei imports
import { OrbitControls } from "@react-three/drei";

//Leva imports
import { useControls, button, buttonGroup, useCreateStore, LevaPanel } from "leva";
//https://github.com/pmndrs/leva#readme
//https://sbcode.net/react-three-fiber/leva/
//https://leva.mentat.org/

//Lodash imports
import { throttle } from "lodash";

//TWEEN imports
import TWEEN from "@tweenjs/tween.js";
import Tween from "./tween";

//Scene Sun & Planet Component imports
import Sun from "../components/sun";

//Parent Satellite import
import ParentSatellite from "../templates/parent-satellite";
import ChildSatellite from "../templates/child-satellite";

//Satellite Info Dictionary imports
import { parentSatelliteDictionary, childSatelliteDictionary } from "../dictionaries/satellite-info-dictionary";

//Keplerian Data Dictionary imports
import {
	planetKepDictionary,
	dwarfPlanetKepDictionary,
	moonsKepDictionary,
} from "../dictionaries/keplerian-dictionary";

//Leva Satellite Info Component import
import InfoPanel from "../info-panel/info-panel";

// Initialize Firebase
/* import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getDatabase, ref, child, get } from "firebase/database";
const dbRef = ref(getDatabase()); */

const SolarSystemMap = () => {
	console.log("SolarSystemMap()");
	const julian1970Date = 2460348.51351; //Julian Ephemeris on January 1, 1970
	const refreshTime = 360000; //1 hour, 5000 for 5 seconds
	const innerLabelZoomLevel = 5000;
	const moonLabelZoomLevel = 100;
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
	const optionsStore = useCreateStore();

	// ********** STATE VALUES **********
	let [julianEphemerisDate, setDate] = useState(Date.now() / 86400000 + julian1970Date);
	let [parentTarget, setParentTarget] = useState("none");
	let [childTarget, setChildTarget] = useState("none");
	//Info Panel
	let [infoPanelData, setInfoPanelData] = useState(null);
	let [parentTargetCoords, setParentTargetCoords] = useState(null);
	let [parentTargetZoomLevel, setParentTargetZoomLevel] = useState(null);
	let [targetMoonsCoords, setTargetMoonsCoords] = useState([]);
	//Keplerian Data
	let [defaultPlanetsKepData, setDefaultPlanetsKepData] = useState([]);
	let [dwarfPlanetsKepData, setDwarfPlanetsKepData] = useState([]);
	let [moonsKepData, setMoonsKepData] = useState([]);
	//Labels
	let [innerLabels, setInnerLabels] = useState(false);
	let [moonLabels, setMoonLabels] = useState(false);
	//Units
	let [tempUnit, setTempUnit] = useState("C");
	let [pressureUnit, setPressureUnit] = useState("atm");
	let [lengthUnit, setLengthUnit] = useState("km");
	let [orbitalUnit, setOrbitalUnit] = useState("sidereal");
	//JSX values
	let defaultSatellitesJSX = null;
	let dwarfPlanetsJSX = null;
	let moonsJSX = null;
	let infoPanelJSX = null;

	//Leva GUI - useControl hook automatically creates a Leva GUI Overlay
	const filterOptions = useControls(
		"Filter Options",
		{
			"Dwarf Planets": false,
			Comets: false,
			"Solar Plane": false,
			"Artificial Satellites": false,
			"Asteroid Belt": false,
			"Kuiper Belt": false,
		},
		{ store: optionsStore }
	);

	const UIOptions = useControls(
		"UI Options",
		{
			"Planet Orbit": "#24729c",
			"Dwarf Planet Orbit": "#033c5b",
			"Moon Orbit": "#05af32",
		},
		{ store: optionsStore }
	);

	const cameraOptions = useControls(
		"Camera Options",
		{
			"Zoom Speed": { value: 5, min: 0, max: 10, step: 1 },
			"Rotate Speed": { value: 1, min: 0, max: 2, step: 0.1 },
			"Panning Speed": { value: 1, min: 0, max: 2, step: 0.1 },
			"Side View": button(() => viewFromSide()),
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
			}),
			Orbital: buttonGroup({
				sidereal: () => setOrbitalUnit("sidereal"),
				solar: () => setOrbitalUnit("solar/synodic"),
			}),
		},
		{ store: optionsStore }
	);

	const about = useControls(
		"About",
		{
			"Kepelerian Calculations": "https://naif.jpl.nasa.gov/naif/toolkit.html",
			"Planet HD Textures": "fdsa",
		},
		{ store: optionsStore }
	);

	useEffect(() => {
		let planetArray = [];
		planetKepDictionary.forEach((value) => {
			planetArray.push(value);
		});
		setDefaultPlanetsKepData(() => planetArray);

		let dwarfPlanetArray = [];
		dwarfPlanetKepDictionary.forEach((value) => {
			dwarfPlanetArray.push(value);
		});
		setDwarfPlanetsKepData(() => dwarfPlanetArray);
	}, []);

	useEffect(() => {
		setInterval(() => {
			setDate(Date.now() / 86400000 + julian1970Date);
		}, refreshTime);
	}, []);

	// ********** DEFINED FUNCTIONS **********
	const updateAllTargetInfo = (parentSatellite, childSatellite, zoomLevel, x, y, z) => {
		//For return to parent satellite btn & updating info panel when that btn clicked
		if (childSatellite === "none") {
			setParentTargetCoords([x, y, z]);
			setParentTargetZoomLevel(zoomLevel);
			setInfoPanelData(() => parentSatelliteDictionary.get(parentSatellite));
		} else {
			setInfoPanelData(() => childSatelliteDictionary.get(childSatellite));
		}

		//Same parent target, only changing child target
		if (parentSatellite !== parentTarget) {
			setTargetMoonsCoords([]); //Reset moons coords, needed when changing parent targets

			setParentTarget(parentSatellite);
			let tempArray = moonsKepDictionary.get(parentSatellite);

			//So that infoPanel will show for an object with no moons
			if (tempArray.length === 0) {
				setTargetMoonsCoords(["none"]);
			}
			setMoonsKepData(() => tempArray);
		}
		setChildTarget(childSatellite);
	};

	const zoomToObject = (parentSatellite, childSatellite, zoomLevel, x, y, z) => {
		//Rotate camera to point at new object
		new TWEEN.Tween(ref.current.target).to({ x: x, y: y, z: z }).easing(TWEEN.Easing.Cubic.Out).start();

		//Move the camera to new position
		new TWEEN.Tween(ref.current.object.position)
			.to({ x: x, y: y, z: zoomLevel }, 2500)
			.easing(TWEEN.Easing.Cubic.Out)
			.start();

		updateAllTargetInfo(parentSatellite, childSatellite, zoomLevel, x, y, z);
	};

	const viewFromSide = () => {
		console.log("viewFromSide()");
		console.log(ref.current);
	};

	const resetCamera = () => {
		ref.current.reset();
		setParentTarget("none");
		setChildTarget("none");
		setParentTargetCoords(null);
		setParentTargetZoomLevel(null);
		setTargetMoonsCoords([]);
		setInfoPanelData(null);
	};

	//listens to zoom level for:
	const handleZoom = () => {
		let currentZoomLevel = ref.current.getDistance();
		//toggling inner planet labels on/off
		if (currentZoomLevel < innerLabelZoomLevel) {
			setInnerLabels(true); //Shows inner planet labels
		} else {
			setInnerLabels(false);
		}
		//toggling moon labels on/off
		if (currentZoomLevel < moonLabelZoomLevel) {
			setMoonLabels(true);
		} else {
			setMoonLabels(false);
		}
	};

	//Set JSX values
	defaultSatellitesJSX = defaultPlanetsKepData.map((data) => (
		<ParentSatellite
			key={data.name}
			data={data}
			DOMAIN_URL={DOMAIN_URL}
			julianEphemerisDate={julianEphemerisDate}
			zoomToObject={zoomToObject}
			innerLabels={innerLabels}
			planetOrbitColor={UIOptions["Planet Orbit"]}
		/>
	));

	if (filterOptions["Dwarf Planets"] !== false) {
		dwarfPlanetsJSX = dwarfPlanetsKepData.map((data) => (
			<ParentSatellite
				key={data.name}
				data={data}
				DOMAIN_URL={DOMAIN_URL}
				julianEphemerisDate={julianEphemerisDate}
				zoomToObject={zoomToObject}
				innerLabels={innerLabels}
				planetOrbitColor={UIOptions["Dwarf Planet Orbit"]}
			/>
		));
	}

	if (parentTarget !== "none") {
		moonsJSX = moonsKepData.map((data) => (
			<ChildSatellite
				key={data.name}
				data={data}
				parentTarget={parentTarget}
				DOMAIN_URL={DOMAIN_URL}
				julianEphemerisDate={julianEphemerisDate}
				zoomToObject={zoomToObject}
				setTargetMoonsCoords={setTargetMoonsCoords}
				moonLabels={moonLabels}
				moonOrbitColor={UIOptions["Moon Orbit"]}
				centerOfRotation={parentTargetCoords}
			/>
		));
		//Otherwise moon zoom btns won't work because targetMoonCoords has not async set yet
		if (infoPanelData !== null && targetMoonsCoords.length !== 0) {
			infoPanelJSX = (
				<InfoPanel
					key={infoPanelData.name}
					data={infoPanelData}
					tempUnit={tempUnit}
					pressureUnit={pressureUnit}
					lengthUnit={lengthUnit}
					orbitalUnit={orbitalUnit}
					parentTargetCoords={parentTargetCoords}
					parentTargetZoomLevel={parentTargetZoomLevel}
					targetMoonsCoords={targetMoonsCoords}
					zoomToObject={zoomToObject}
				/>
			);
		}
	}

	return (
		<>
			<div className="solar-system-map">
				<Canvas camera={cameraSettings} scene={scene}>
					<OrbitControls
						ref={ref}
						maxDistance={100000} //maxDistance (not maxZoom) for perspective cam
						makeDefault
						zoomSpeed={cameraOptions["Zoom Speed"]}
						rotateSpeed={cameraOptions["Rotate Speed"]}
						panSpeed={cameraOptions["Panning Speed"]}
						onChange={throttle(handleZoom, 500)}
					/>
					<Tween />
					<Sun DOMAIN_URL={DOMAIN_URL} zoomToObject={zoomToObject} parentTarget={parentTarget} />
					{defaultSatellitesJSX}
					{dwarfPlanetsJSX}
					{moonsJSX}
				</Canvas>
			</div>
			<LevaPanel store={optionsStore} flat collapsed titleBar={{ title: "Solar System Options" }} />
			{infoPanelJSX}
		</>
	);
};

export default SolarSystemMap;
