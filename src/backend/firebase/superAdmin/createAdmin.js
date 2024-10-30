import { auth } from '../../firebase/config.js'
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const rtdb = getDatabase();

async function createAdmin(fullName, email, password) {

    await createUserWithEmailAndPassword(auth, email, password)
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
}

export { createAdmin };