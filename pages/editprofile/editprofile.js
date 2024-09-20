// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
    getFirestore,
    getDoc,
    doc,
    updateDoc,
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

const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const cnicInput = document.getElementById("cnic");

window.onload = () => {
    // Jab page load ho, check karo ke user login hai ya nahi using 'onAuthStateChanged'
    onAuthStateChanged(auth, (user) => {
        if (user) { 
            // Agar user login hai, uska profile data Firestore se le kar aao
            const userDocRef = doc(db, "user Credentials", user.uid);

            // Firestore se user ka document (data) get karo
            getDoc(userDocRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        // Agar document hai to user ka data form mein daalo
                        const userData = docSnap.data();
                        firstNameInput.value = userData.firstname; // First name fill karo
                        lastNameInput.value = userData.lastname;   // Last name fill karo
                        cnicInput.value = userData.cnic;           // CNIC fill karo
                    } else {
                        // Agar document nahi mila, console par message show karo
                        console.log("No user data found!");
                    }
                })
                .catch((error) => {
                    // Agar koi error ho data get karte waqt, usko console par show karo
                    console.error("Error fetching user data: ", error);
                });
        } else {
            // Agar user login nahi hai, alert dikhao aur login page par redirect karo
            alert("No user is logged in (LogIn)");
            window.location.href = '../login/index.html'; // Redirect to login page
        }
    });
};

window.updateProfile = () => {
    // Jab user profile update karega, current user check karo
    const user = auth.currentUser;

    if (user) {
        // Naya data form se lo aur ek updated object banao
        const updatedData = {
            firstname: firstNameInput.value,  // Form se first name lo
            lastname: lastNameInput.value,    // Form se last name lo
            cnic: cnicInput.value             // Form se CNIC lo
        };

        // Firestore mein user ka document reference banao (user uid ke sath)
        const userDocRef = doc(db, "user Credentials", user.uid);

        // Firestore mein user ka document update karo
        updateDoc(userDocRef, updatedData)
            .then(() => {
                // Agar update ho jaye successfully, alert show karo
                alert("Profile updated successfully!");
            })
            .catch((error) => {
                // Agar error aaye update karte waqt, console par show karo
                console.error("Error updating profile: ", error);
                alert("Error updating profile. Please try again.");
            });
    } else {
        // Agar koi user login nahi hai, alert show karo
        alert("No user is logged in");
    }
};
