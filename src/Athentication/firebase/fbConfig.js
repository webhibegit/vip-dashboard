// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBvApFkCggmDuGVdCWjZJw2yYFnJH46KMA",
    authDomain: "vipconcierge-60658.firebaseapp.com",
    databaseURL: "https://vipconcierge-60658-default-rtdb.firebaseio.com",
    projectId: "vipconcierge-60658",
    storageBucket: "vipconcierge-60658.appspot.com",
    messagingSenderId: "417027707014",
    appId: "1:417027707014:web:01d516ce838b4f9f9bc107",
    measurementId: "G-F41NKNVPBE"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firebaseApp = initializeApp(firebaseConfig);
