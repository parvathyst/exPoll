import { doc, collection, getDocs, setDoc, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { db, auth } from '../../firebase/config.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, get, child, set, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const rtdb = getDatabase();


function getAdmins() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `admins/`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val())
            displayAdmin(snapshot.val())
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

    return snapshot.val();
}


