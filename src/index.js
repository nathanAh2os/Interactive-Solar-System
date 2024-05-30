//React imports
import React from "react";
import ReactDOM from "react-dom/client";

//Component imports
import SolarSystemMap from "./map/solar-system-map";

//CSS import
import "./css/template.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<SolarSystemMap />
	</React.StrictMode>
);
