import { db } from "../../../backend/firebase/config.js"
import { ref, get, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";


async function changePollEndTime(pollID, newDateTime) {
    try {
        const pollRef = ref(db, `poll-details/${pollID}`);
        const snapshot = await get(pollRef);

        if (snapshot.exists()) {
            const poll = Object.keys(snapshot.val())[0];
            await update(ref(db, `poll-details/${pollID}`), { startTime: newDateTime });
            console.log(`Poll Time Changed`);
            return true;
        } else {
            console.log(`No poll found with id - ${pollID}.`);
            return false;
        }
    } catch (error) {
        console.error("Error updating poll time:", error);
        return false;
    }
}

export { changePollEndTime }