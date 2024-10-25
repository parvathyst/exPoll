import { getDatabase, ref, get, child, set, onValue, push } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { db, app } from '../../config.js'

const rtdb = getDatabase();

function createPoll(pollDetails, pollOptions, pollRecipients) {
    const newPollRef = push(ref(rtdb, 'poll-details/'));

    // Set the main poll details
    set(newPollRef, {
        "title": pollDetails.title,
        "description": pollDetails.description,
        "startDate": pollDetails.startDate,
        "startTime": pollDetails.startTime,
        "endDate": pollDetails.endDate,
        "endTime": pollDetails.endTime,
        // "isPrivatePoll": pollDetails.isPrivatePoll,
    })
        .then(() => {
            // After poll details are set, get the poll key
            const pollKey = newPollRef.key;

            // Set poll options
            const optionsRef = ref(rtdb, 'poll-options/' + pollKey);
            return set(optionsRef, pollOptions);
        })
        .then(() => {
            // After options are set, set poll recipients
            const pollKey = newPollRef.key; // Get the same pollKey again
            const recipientsRef = ref(rtdb, 'poll-recipients/' + pollKey);
            return set(recipientsRef, pollRecipients);
        })
        .then(() => {
            console.log("Poll created successfully!");
        })
        .catch((err) => {
            console.error("Error adding poll:", err.message);
            alert("Error: " + err.message);
        });
}


export { createPoll }
