//React imports
import React from "react";
import ReactDOM from "react-dom/client";

//Component imports
import Header from "./header/header";
import SolarSystemMap from "./map/solar-system-map";

//CSS import
import "./css/index.css";
import "./css/template.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<Header />
		<SolarSystemMap />
	</React.StrictMode>
);
