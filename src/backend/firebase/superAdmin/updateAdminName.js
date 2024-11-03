import { ref, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { db } from "../config.js";

async function updateAdminName(email, newFullName) {
    try {
        const snapshot = await db.ref("userRecords").orderByChild("email").equalTo(email).once("value");

        if (snapshot.exists()) {
            const userId = Object.keys(snapshot.val())[0];

            await db.ref(`userRecords/${userId}`).update({ fullName: newFullName });

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
