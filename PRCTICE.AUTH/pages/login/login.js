// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import {
    getAuth,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
    getFirestore,
    getDoc,
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
const email = document.getElementById("email");
const password = document.getElementById("password");

window.login = () => {
    let obj = {
        email: email.value,
        password: password.value,
    };
    console.log(obj);

    signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then((res) => {
            console.log(res);

            // uid assignment
            obj.id = res.user.uid;

            // Remove password for security reasons
            delete obj.password;

            // Reference to the user document in Firestore
            const userDocRef = doc(db, "user Credentials", obj.id); // Remove extra "!" from doc path

            // Fetch user data from Firestore
            getDoc(userDocRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        console.log("User data from Firestore:", userData);
                        alert("Login successful! Welcome back!");

                        // Check user type and redirect accordingly
                        if (userData.usertype === 'Admin') {
                            window.location.href = '../admin/save/save.html'; // Redirect to Admin area
                        } else if (userData.usertype === 'Student') {
                            window.location.href = '../editprofile/editprofile.html'; // Redirect to Student area
                        } else {
                            console.error("Unknown user type:", userData.usertype);
                            alert("Error: Unknown user type.");
                        }
                    } else {
                        console.log("No user data found in Firestore!");
                        alert("No user data found. Please contact support.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data from Firestore:", error);
                    alert("Error fetching user data. Please try again.");
                });
        })
        .catch((err) => {
            console.log("Login failed:", err);
            alert("Login failed! Please check your email and password.");
        });
};
