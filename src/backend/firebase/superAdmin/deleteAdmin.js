import { deleteUser } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";


async function deleteAdmin(email) {
    const rtdb = getDatabase();

    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        const uid = userRecord.uid;

        await deleteUser(uid);

        await remove(ref(rtdb, 'admins/' + uid));

        console.log("Admin deleted successfully.");
    } catch (error) {
        console.error("Error deleting admin:", error.message);
        throw new Error("Error: " + error.message);
    }
}

export { deleteAdmin };