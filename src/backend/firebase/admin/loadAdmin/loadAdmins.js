import { db } from '../../config.js'
import { getDatabase, ref, get, child, set, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const rtdb = getDatabase();

function loadAdmins() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `admins/`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}


export { loadAdmins }