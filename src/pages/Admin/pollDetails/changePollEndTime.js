import { db } from "../../../backend/firebase/config.js"
import { ref, get, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
 
 
async function changePollEndTime(pollID, newDateTime) {
    try {
        const pollRef = ref(db, `poll-details/${pollID}`);
        const snapshot = await get(pollRef);
 
        if (snapshot.exists()) {
            const poll = snapshot.val();
            console.log("Poll data:", poll);
 
            const pollStartTime =
                typeof poll.startDateTime === "number" ? poll.startDateTime :
                Date.parse(poll.startDateTime) || NaN;
 
            if (isNaN(pollStartTime)) {
                console.log("Poll start time is invalid:", poll.startDateTime);
                return false;
            }
 
            // Format newDateTime
            const newEndDateTime = new Date(newDateTime);
            const formattedEndDateTime = newEndDateTime.toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
 
            const newEndTime = newEndDateTime.getTime();
            console.log("New end time:", formattedEndDateTime, "Poll start time:", pollStartTime);
 
            if (newEndTime > pollStartTime) {
                try {
                    await update(ref(db, `poll-details/${pollID}`), { endDateTime: formattedEndDateTime });
                    console.log(`Poll Time Changed`);
                    return true;
                } catch (error) {
                    console.error("Error updating poll end time:", error);
                    return false;
                }
            } else {
                console.log("New end time is not after the poll start time.");
                return false;
            }
        } else {
            console.log("Poll data does not exist.");
            return false;
        }
 
    } catch (error) {
        console.error("Error updating poll time:", error);
        return false;
    }
}
 
export { changePollEndTime };
 