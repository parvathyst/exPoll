import { db } from "../config.js";
import { ref, update, get, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

async function changeAdminStatus(email, newStatus) {
    try {


        const adminQuery = query(ref(db, "admins"), orderByChild("email"), equalTo(email));

        const snapshot = await get(adminQuery);

        if (snapshot.exists()) {
            const uid = Object.keys(snapshot.val())[0];

            await update(ref(db, `admins/${uid}`), { status: newStatus });

            console.log(`Admin account with email ${email} has been disabled.`);
            return true;
        } else {
            console.log(`No admin found with email ${email}.`);
            return false;
        }
    } catch (error) {
        console.error("Error disabling admin account:", error);
        return false;
    }
}

export { changeAdminStatus };
