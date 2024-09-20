// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import {
    getAuth,
    
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    
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

const cnicInput = document.getElementById("cnic");
const resultsTable = document.getElementById("resultsTable");

window.getResults = () => {
    const cnicValue = cnicInput.value;

    // Query to find marks for the given CNIC
    const marksQuery = query(collection(db, "studentMarks"), where("cnic", "==", cnicValue));

    getDocs(marksQuery)
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                alert("No results found for this CNIC.");
                return;
            }

            // Clear previous results
            resultsTable.innerHTML = '';

            // Create a table to display results
            let table = `<table border='1'>
                          <tr>
                            <th>Course</th>
                            <th>Marks</th>
                            <th>Total Marks</th>
                            <th>Grade</th>
                          </tr>`;

            // Loop through each result and display it
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                table += `<tr>
                            <td>${data.course}</td>
                            <td>${data.marks}</td>
                            <td>${data.totalMarks}</td>
                            <td>${data.grade}</td>
                          </tr>`;
            });

            table += '</table>';
            resultsTable.innerHTML = table;
        })
        .catch((error) => {
            console.error("Error fetching results: ", error);
            alert("Error fetching results. Please try again.");
        });
};
