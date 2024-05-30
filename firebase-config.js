// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyASvU010lEBlIWT3lq-hcmCOKwnarsBbTc",
	authDomain: "react-map-project-95e99.firebaseapp.com",
	databaseURL: "https://react-map-project-95e99.firebaseio.com",
	projectId: "react-map-project-95e99",
	storageBucket: "react-map-project-95e99.appspot.com",
	messagingSenderId: "61618595535",
	appId: "1:61618595535:web:29a6547d7a21beda3779ba",
	measurementId: "G-DEGGCBK3YG",
};

/* // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`))
	.then((snapshot) => {
		if (snapshot.exists()) {
			console.log(snapshot.val());
		} else {
			console.log("No data available");
		}
	})
	.catch((error) => {
		console.error(error);
	}); */
