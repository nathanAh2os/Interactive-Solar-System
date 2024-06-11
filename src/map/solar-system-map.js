//React imports
import { useRef, useEffect, useState } from "react";

//React-Three-Fiber imports
import { Canvas } from "@react-three/fiber";

//React-Three-Drei imports
import { CameraControls, Grid } from "@react-three/drei";

//Leva imports
import { useControls, button, buttonGroup, useCreateStore, LevaPanel } from "leva";
//https://github.com/pmndrs/leva#readme
//https://sbcode.net/react-three-fiber/leva/
//https://leva.mentat.org/

//Lodash imports
import { throttle } from "lodash";

//TWEEN imports
//import TWEEN from "@tweenjs/tween.js";
//import Tween from "./tween";

//Scene Component imports
import ParentSatellite from "../templates/parent-satellite";
import ChildSatellite from "../templates/child-satellite";
import Sun from "../components/sun";

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
import SunInfoPanel from "../info-panel/sun-info-panel";

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
		fov: 0.25, //field of view 0.25
		near: 1e-7, //near plane 0.01
		far: 1e12, //far plane 10000000
		position: [0, 0, 25000],
		aspectRatio: window.innerWidth / window.innerHeight,
		up: [0, 0, 1], //https://stackoverflow.com/questions/74540702/how-to-make-three-orbitcontrols-spin-a-plane-around-z-axis-x-axis
	};
	const scene = { antialias: true, logarithmicDepthBuffer: true, sortObjects: false };
	const cameraControlsRef = useRef();
	const optionsStore = useCreateStore();

	// ********** STATE VALUES **********
	let [julianEphemerisDate, setDate] = useState(Date.now() / 86400000 + julian1970Date);
	let [parentTarget, setParentTarget] = useState("none");
	let [childTarget, setChildTarget] = useState("none");
	let [closestDistance, setClosestDistance] = useState(0);
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
	let gridJSX = null;

	//Leva GUI - useControl hook automatically creates a Leva GUI Overlay
	const filterOptions = useControls(
		"Filter Options",
		{
			"Dwarf Planets": false,
			//Comets: false,
			Grid: false,
			//"Artificial Satellites": false,
			//"Asteroid Belt": false,
			//"Kuiper Belt": false,
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

	//Initial loading of default planet & dwarf planet kep data
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

	//Edge case: Dwarf Planets toggled off & parent target was a dwarf planet
	useEffect(() => {
		if (filterOptions["Dwarf Planets"] === false) {
			let dwarfPlanets = ["Ceres", "Pluto", "Haumea", "Makemake", "Eris"];
			dwarfPlanets.forEach((dwarfPlanet) => {
				if (dwarfPlanet === parentTarget) {
					setParentTarget("none");
					setChildTarget("none");
				}
			});
		}
	}, [filterOptions["Dwarf Planets"]]);

	// ********** DEFINED FUNCTIONS **********
	const updateTargetInfo = (selectedParentSat, selectedChildSat, zoomLevel, x, y, z) => {
		let satelliteInfo = null;
		setParentTarget(selectedParentSat);
		setChildTarget(selectedChildSat);

		//For return to parent satellite btn & updating info panel when that btn clicked
		if (selectedChildSat === "none") {
			setParentTargetCoords([x, y, z]);
			setParentTargetZoomLevel(zoomLevel);
			satelliteInfo = parentSatelliteDictionary.get(selectedParentSat);
			setInfoPanelData(() => satelliteInfo);
		} else {
			satelliteInfo = childSatelliteDictionary.get(selectedChildSat);
			setInfoPanelData(() => childSatelliteDictionary.get(selectedChildSat));
		}
		return satelliteInfo;
	};

	const updateMoonInfo = (selectedParentSat) => {
		//Parent target changing
		if (selectedParentSat !== parentTarget) {
			setTargetMoonsCoords([]); //Reset moons coords, needed when changing parent targets
			let tempArray = moonsKepDictionary.get(selectedParentSat);

			//So that infoPanel will show for an object with no moons
			if (tempArray.length === 0) {
				setTargetMoonsCoords(["none"]);
			}
			setMoonsKepData(() => tempArray);
		}
	};

	//Closest distance one can zoom in to object, prevents clipping into object
	const calculateClosestZoom = (satelliteInfo) => {
		let diameter;
		switch (satelliteInfo.shape) {
			case "Oblate Spheroid":
				diameter = satelliteInfo.equatorialDiameter;
				break;
			case "Sphere":
				diameter = satelliteInfo.meanDiameter;
				break;
			case "Triaxial Ellipsoid":
				diameter = satelliteInfo.length;
				break;
			default:
				break;
		}
		let radiusAU = diameter * 6.6846e-9 * 2;
		setClosestDistance(radiusAU);
	};

	const zoomToObject = (selectedParentSat, selectedChildSat, zoomLevel, x, y, z) => {
		//xyz *, xzy *, yxz *, yzx *, zxy, zyx
		let targetX = x;
		let targetY = y;
		let targetZ = z;
		let posX = x + zoomLevel * 2;
		let posY = y + zoomLevel * 2;
		let posZ = z + zoomLevel;

		if (selectedChildSat !== "none") {
			targetX = targetX + parentTargetCoords[0];
			targetY = targetY + parentTargetCoords[1];
			targetZ = targetZ + parentTargetCoords[2];
			posX = posX + parentTargetCoords[0];
			posY = posY + parentTargetCoords[1];
			posZ = posZ + parentTargetCoords[2];
		}
		cameraControlsRef.current?.updateCameraUp();
		cameraControlsRef.current?.setLookAt(posX, posY, posZ, targetX, targetY, targetZ, true);
	};

	const targetSelected = (selectedParentSat, selectedChildSat, zoomLevel, x, y, z) => {
		let satelliteInfo = updateTargetInfo(selectedParentSat, selectedChildSat, zoomLevel, x, y, z);
		calculateClosestZoom(satelliteInfo);
		updateMoonInfo(selectedParentSat, selectedChildSat);
		zoomToObject(selectedParentSat, selectedChildSat, zoomLevel, x, y, z);
	};

	const viewFromSide = () => {
		console.log("viewFromSide()");
	};

	const resetCamera = () => {
		cameraControlsRef.current.reset(true);
		setParentTarget("none");
		setChildTarget("none");
		setParentTargetCoords(null);
		setParentTargetZoomLevel(null);
		setTargetMoonsCoords([]);
		setInfoPanelData(null);
	};

	//listens to zoom level for:
	const handleZoom = () => {
		let currentPosition = cameraControlsRef.current.getPosition();

		//toggling inner planet labels on/off
		if (currentPosition.z < innerLabelZoomLevel) {
			setInnerLabels(true); //Shows inner planet labels
		} else {
			setInnerLabels(false);
		}
		//toggling moon labels on/off
		if (currentPosition.z < moonLabelZoomLevel) {
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
			targetSelected={targetSelected}
			innerLabels={innerLabels}
			planetOrbitColor={UIOptions["Planet Orbit"]}
			setParentTargetCoords={setParentTargetCoords}
			parentTarget={parentTarget}
		/>
	));

	if (filterOptions["Dwarf Planets"] === true) {
		dwarfPlanetsJSX = dwarfPlanetsKepData.map((data) => (
			<ParentSatellite
				key={data.name}
				data={data}
				DOMAIN_URL={DOMAIN_URL}
				julianEphemerisDate={julianEphemerisDate}
				targetSelected={targetSelected}
				innerLabels={innerLabels}
				planetOrbitColor={UIOptions["Dwarf Planet Orbit"]}
				setParentTargetCoords={setParentTargetCoords}
				parentTarget={parentTarget}
			/>
		));
	}

	if (filterOptions["Grid"] === true) {
		gridJSX = (
			<Grid //https://github.com/pmndrs/drei?tab=readme-ov-file#grid
				position={[0, 0, 0]}
				gridSize={[100000, 100000]}
				cellSize={100}
				cellThickness={1}
				cellColor={"#6f6f6f"}
				sectionSize={1000}
				sectionThickness={1.5}
				sectionColor={"#9d4b4b"}
				fadeDistance={100000}
				fadeStrength={1}
				followCamera={false}
				infiniteGrid={true}
			/>
		);
	}

	if (parentTarget !== "none" && parentTarget !== "Sun") {
		console.log(parentTarget);
		moonsJSX = moonsKepData.map((data) => (
			<ChildSatellite
				key={data.name}
				data={data}
				parentTarget={parentTarget}
				DOMAIN_URL={DOMAIN_URL}
				julianEphemerisDate={julianEphemerisDate}
				targetSelected={targetSelected}
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
					targetSelected={targetSelected}
				/>
			);
		}
	} else if (parentTarget === "Sun") {
		infoPanelJSX = (
			<SunInfoPanel key={infoPanelData.name} data={infoPanelData} tempUnit={tempUnit} lengthUnit={lengthUnit} />
		);
	}

	return (
		<>
			<div className="solar-system-map">
				<Canvas camera={cameraSettings} scene={scene}>
					{/* 					<OrbitControls
						ref={ref}
						minDistance={closestDistance} //prevents clipping inside object when zooming all the way in
						maxDistance={100000} //maxDistance (not maxZoom) for perspective cam
						makeDefault
						zoomSpeed={cameraOptions["Zoom Speed"]}
						rotateSpeed={cameraOptions["Rotate Speed"]}
						panSpeed={cameraOptions["Panning Speed"]}
						onChange={throttle(handleZoom, 500)}
					/> */}
					<CameraControls
						ref={cameraControlsRef}
						minDistance={closestDistance}
						maxDistance={100000}
						onChange={throttle(handleZoom, 500)}
						makeDefault
					/>
					<Sun DOMAIN_URL={DOMAIN_URL} targetSelected={targetSelected} parentTarget={parentTarget} />
					{defaultSatellitesJSX}
					{dwarfPlanetsJSX}
					{moonsJSX}
					{gridJSX}
				</Canvas>
			</div>
			<LevaPanel store={optionsStore} flat collapsed titleBar={{ title: "Solar System Options" }} />
			{infoPanelJSX}
		</>
	);
};

export default SolarSystemMap;
