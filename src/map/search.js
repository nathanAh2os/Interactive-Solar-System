//React imports
import { useRef, useEffect, useState } from "react";

//Leva imports
import { useControls, useCreateStore } from "leva";
//https://github.com/pmndrs/leva#readme
//https://sbcode.net/react-three-fiber/leva/
//https://leva.mentat.org/

const Search = () => {
	let [matchedSearchList, setMatchedSearchList] = useState([]);
	let [searchTerm, setSearchTerm] = useState("");

	let searchList = ["mercury", "mars", "venus", "earth", "jupiter", "saturn", "uranus", "neptune"];

	//JSX values
	let matchedSearchListJSX = null;
	let dropDownContentJSX = null;

	const optionsStore = useCreateStore();

	//Leva GUI - useControl hook automatically creates a Leva GUI Overlay
	const searchOptions = useControls(
		{
			Search: {
				value: searchTerm,
				onChange: (value) => {
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

	// ********** DEFINED FUNCTIONS **********

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
	return null;
};

export default Search;
