import { get, child, ref } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { db } from "../config.js"; 

function getAdmins() {
    return get(child(ref(db), 'admins'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available");
                return [{ fullName: "Error", email: "no records found" }];
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            return [{ fullName: "Error", email: "Failed to fetch data" }];
        });
}

export { getAdmins };
