import { getDatabase, ref, get, child, set, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const rtdb = getDatabase();

function createPoll(pollDetails, pollOptions, pollRecipients) {

    set(ref(rtdb, 'poll-detals/'), {
        "title": pollDetails.title,
        "description": pollDetails.description,
        "startDate": pollDetails.startDate,
        "startTime": pollDetails.startTime,
        "endDate": pollDetails.endDate,
        "endTime": pollDetails.endTime,
        "privatePoll": pollDetails.privatePoll,
    }).then((result) => {
        console.log("Poll Created Successfully:", result.id);
    }).catch((err) => {
        console.error("Error adding admin:", err.message);
        alert("Error: " + err.message);
    });

}


export { createPoll }