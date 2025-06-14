import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics,logEvent } from "firebase/analytics";
// const dotenv = require('dotenv')


const firebaseConfig = {
    apiKey: "AIzaSyC-_1hSubhP79X4qfh_zISQMLb-nM1ArYI",
    authDomain: "vigour-fit.firebaseapp.com",
    databaseURL: "https://vigour-fit-default-rtdb.firebaseio.com",
    projectId: "vigour-fit",
    storageBucket: "vigour-fit.firebasestorage.app",
    messagingSenderId: "314426909291",
    appId: "1:314426909291:web:0ac971b3014eb97802072e",
    measurementId: "G-SNCWMWCK13"
};

export const app = initializeApp(firebaseConfig);


// const auth = getAuth();
// export { app, auth };

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const analytics = getAnalytics(app);

export const database = getDatabase(app);

logEvent(analytics, 'notification_received');
// Check authentication state on page load
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in.
        // Update UI and manage app state.
        // console.log("User is signed in:", user);
    } else {
        // No user is signed in.
        // Update UI and manage app state.
        console.log("No user is signed in.");
    }
});

// Call this function to initialize your app's logic and UI interactions
function initApp() {}

// Call the function to initialize your app when the page loads
window.onload = function () {
    initApp();
};
