import { getDatabase, ref, get, child, } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

function getAdmins() {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `admins/`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available");
                return [{ fullName: "Error", email: "no records found" }];
            }
        })
        .catch((error) => {
            console.error(error);
            return [{ fullName: "Error", email: "Failed to fetch data" }];
        });
}

export { getAdmins };
