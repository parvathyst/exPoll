import { getDatabase, ref, get, child, update } from 'firebase-admin/database';
import admin from 'firebase-admin';

admin.initializeApp();

async function updateAdminName(email, newFullName) {
    const rtdb = getDatabase();

    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        const uid = userRecord.uid;

        const dbRef = ref(rtdb);
        const snapshot = await get(child(dbRef, `admins/${uid}`));

        if (snapshot.exists()) {
            await update(ref(rtdb, `admins/${uid}`), { fullName: newFullName });
            console.log("Full name updated successfully.");
        } else {
            console.log("No admin record found for the given email.");
        }
    } catch (error) {
        console.error("Error updating admin full name:", error.message);
    }
}

export { updateAdminName };
