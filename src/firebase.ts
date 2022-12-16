// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAP4AyVU3YsUoc4Efgq9XFdTzO1BtZdQkI",
    authDomain: "oos-brasil.firebaseapp.com",
    projectId: "oos-brasil",
    storageBucket: "oos-brasil.appspot.com",
    messagingSenderId: "954148314519",
    appId: "1:954148314519:web:7f93c686da2164441538d2",
    measurementId: "G-EMQV39EJ1J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const database = getFirestore(app);
