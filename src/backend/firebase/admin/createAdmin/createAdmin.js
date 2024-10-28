import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { auth } from '../../config.js'

function createAdmin(email, password) {
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
}

export { createAdmin }