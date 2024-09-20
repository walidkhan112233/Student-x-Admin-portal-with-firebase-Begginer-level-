// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
    getFirestore,
    getDocs,
    setDoc,
    doc,
    collection,
    query, 
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

const cnic = document.getElementById("cnic");
const course = document.getElementById("course");
const marks = document.getElementById("marks");
const totalMarks = document.getElementById("totalMarks");

 
// This function runs when the user clicks the "Submit" button
window.uploadMarks = () => {
    // Create an object with the data from the form
    let obj = {
        cnic: cnic.value, // CNIC of the student
        course: course.value, // Course name
        marks: parseInt(marks.value, 10), // Marks obtained, converted to number
        totalMarks: parseInt(totalMarks.value, 10), // Total marks, converted to number
    };

    // Calculate the percentage of marks
    let percentage = (obj.marks / obj.totalMarks) * 100;

    // Determine if the student passes or fails
    obj.grade = percentage >= 50 ? 'Pass' : 'Fail'; // 50% or more is a pass

    console.log(obj); // Print the object to the console for debugging

    // Search for the student in Firestore by CNIC
    const studentQuery = query(collection(db, "user Credentials"), where("cnic", "==", obj.cnic));
    
    getDocs(studentQuery) // Execute the query
        .then((querySnapshot) => {
            // Check if we found any documents
            if (querySnapshot.empty) {
                // No student found, show an alert
                alert("No student found with this CNIC.");
                return; // Exit the function
            }
            
            // Get the first document from the query results
            let studentDoc = querySnapshot.docs[0];
            let studentId = studentDoc.id; // Get the student's ID

            // Save the marks to a new document in Firestore
            setDoc(doc(db, "studentMarks", `${studentId}_${obj.course}`), obj)
                .then(() => {
                    // If successful, show a success message and reset the form
                    alert("Marks uploaded successfully!");
                    document.getElementById("marksForm").reset();
                })
                .catch((error) => {
                    // If there is an error, show an error message
                    console.error("Error uploading marks: ", error);
                    alert("Error uploading marks. Please try again.");
                });
        })
        .catch((error) => {
            // If there is an error with the query, show an error message
            console.error("Error finding student: ", error);
            alert("Error finding student. Please try again.");
        });
};