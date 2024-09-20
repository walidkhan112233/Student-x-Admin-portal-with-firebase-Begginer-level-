// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
    getFirestore,
    doc,
  setDoc,
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

var firstname = document.getElementById("firstname");
var lastname = document.getElementById("lastname");
var email = document.getElementById("email");
var password = document.getElementById("password");
var cnic = document.getElementById("cnic");
var usertype = document.getElementById("usertype");

window.signup = () => {
    let obj = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value,
        cnic: cnic.value,
        usertype: usertype.value,
    };
    console.log(obj);

    createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then((res) => {
        console.log(res);  
        obj.id = res.user.uid;  
        delete obj.password;
        setDoc(doc(db, "user Credentials", obj.id), obj)
            .then(() => {
                if (obj.usertype === 'Admin') {
                    
                    window.location.href = '../login/login.html'; 
                } else if (obj.usertype === 'Student') {
                    
                    window.location.href = "../login/login.html";
                }
                console.log("User data saved to Firestore.");
            })
            .catch((error) => {
                console.error("Error adding user to Firestore: ", error);
                alert("Error adding user to Firestore: " + error.message);
            });
    })
    .catch((err) => {
        console.log(err);
        alert("Error creating user:try logIn instead or " + err.message);
    });
 };