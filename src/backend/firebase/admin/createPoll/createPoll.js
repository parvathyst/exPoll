import { getDatabase, ref, get, child, set, onValue, push } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { db, app } from '../../../firebase/config.js'

const rtdb = getDatabase();

function createPoll(pollDetails, pollOptions, pollRecipients) {
    const newPollRef = push(ref(rtdb, 'poll-details/'));

    set(newPollRef, pollDetails)
        .then(() => {
            const pollKey = newPollRef.key;
            const optionsRef = ref(rtdb, 'poll-options/' + pollKey);
            return set(optionsRef, pollOptions);
        })
        .then(() => {
            const pollKey = newPollRef.key;
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

        return newPollRef.key;
}


export { createPoll }
