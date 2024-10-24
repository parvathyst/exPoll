import { doc, collection, getDocs, setDoc, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { db, auth } from '../firebase/config.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

import { displayAdmin } from "./script.js";

const rtdb = getDatabase();

document.getElementById('add-admin-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('addAdminfullName').value;
    const email = document.getElementById('addAdminemail').value;
    const password = document.getElementById('AddAdminpassword').value;


    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;

            return set(ref(rtdb, 'admins/' + uid), {
                "fullName": fullName,
                "email": email
            });
        })
        .then(() => {
            alert("Admin added successfully!");
            document.getElementById('add-admin-popup').style.display = 'none';
        })
        .catch((error) => {
            console.error("Error adding admin:", error.message);
            alert("Error: " + error.message);
        });
});

function getAdmins() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

getAdmins();