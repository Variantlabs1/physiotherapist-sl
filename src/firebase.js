import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics,logEvent } from "firebase/analytics";
// const dotenv = require('dotenv')


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_ADMIN_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PRODUCT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
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
