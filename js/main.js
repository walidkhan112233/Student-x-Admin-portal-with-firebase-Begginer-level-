// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import {
    getAuth,
    
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
    getFirestore
    
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCnY8Lf12kdWmDlHvdd32jYEjbb4aBcUIg",
    authDomain: "hakathon-test-df0a7.firebaseapp.com",
    projectId: "hakathon-test-df0a7",
    storageBucket: "hakathon-test-df0a7.appspot.com",
    messagingSenderId: "983113037673",
    appId: "1:983113037673:web:b3eab90106e0cb4e0f6ff8",
    measurementId: "G-740P9F2EN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();