import { ref, get, query, orderByChild, equalTo, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { db } from "../config.js";

async function updateAdminName(email, newFullName) {
    try {
        const userQuery = query(ref(db, "admins"), orderByChild("email"), equalTo(email));
        const snapshot = await get(userQuery);

        if (snapshot.exists()) {
            const uid = Object.keys(snapshot.val())[0];
            await update(ref(db, `admins/${uid}`), { fullName: newFullName });
            console.log(`Admin account with email ${email} has been updated with new name: ${newFullName}`);
            return true;
        } else {
            console.log(`No admin found with email ${email}.`);
            return false;
        }
    } catch (error) {
        console.error("Error updating admin name:", error);
        return false;
    }
}

export { updateAdminName };
