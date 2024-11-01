import { getDatabase, ref, remove } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import admin from "firebase-admin"; // Assuming Firebase Admin SDK is installed

admin.initializeApp();

async function deleteAdmin(email) {
    const rtdb = getDatabase(); // Initialize Realtime Database reference

    try {
        const userRecord = await admin.auth().getUserByEmail(email); // Use Admin SDK to fetch user
        const uid = userRecord.uid;

        await admin.auth().deleteUser(uid); // Use Admin SDK to delete user by uid

        await remove(ref(rtdb, 'admins/' + uid)); // Remove from Realtime Database

        console.log("Admin deleted successfully.");
    } catch (error) {
        console.error("Error deleting admin:", error.message);
        throw new Error("Error: " + error.message);
    }
}

export { deleteAdmin };
