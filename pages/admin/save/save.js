// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
    getFirestore,
    setDoc,
    doc,
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

const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cnic = document.getElementById("cnic");
const usertype = document.getElementById("usertype");

window.addStudent = () => {
    let obj = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value,
        cnic: cnic.value,
        usertype: usertype.value, // value 'Student' he hai pehla sa aur hamesha hogi save student ma
    };
    console.log(obj);
    
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then((res) => {
        console.log(res);  
        obj.id = res.user.uid;  
        delete obj.password; // Remove password for security

        // Save student data to Firestore
        setDoc(doc(db, "user Credentials", obj.id), obj)
            .then(() => {
                alert("Student added successfully!");
                window.location.href = "../uploadmarks/marks.html";
            })
            .catch((error) => {
                console.error("Error adding student to Firestore: ", error);
                alert("Error adding student. Please try again.");
            });
    })
    .catch((err) => {
        console.log("Error creating user: ", err);
        alert("Error creating user. Please check the email and try again.");
    });


};