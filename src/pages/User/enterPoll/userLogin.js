import { db } from "../../../backend/firebase/config.js";
import {
  get,
  set,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const url = window.location.href;
const urlParams = new URL(url);
let id = urlParams.searchParams.get("id");

let pollDetails;
let pollRecipients;

let fullName;
let email;

document.getElementById("submit").addEventListener("click", () => {
    // Retrieve the values from the input fields
    fullName = document.getElementById("fullName").value;
    email = document.getElementById("email").value;
    sessionStorage.setItem("userEmail", email);
    sessionStorage.setItem("userName", fullName);
    readPollDetails();
});

function readPollDetails() {
    const pollRef = ref(db, `/poll-details/${id}`);
    onValue(pollRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            pollDetails = data;
            const now = new Date();

            const startDateTime = new Date(`${pollDetails.startDate}T${pollDetails.startTime}:00`);
            const endDateTime = new Date(`${pollDetails.endDate}T${pollDetails.endTime}:00`);

            if (now < startDateTime) {
                alert("The poll has not started yet."); // Poll start time is in the future
                window.location.href = "../../common/error";
            } else if (now > endDateTime) {
                alert("The poll has ended."); // Poll end time is in the past
                window.location.href = "../../common/error";
            } else {
                if (pollDetails.isPrivatePoll) {
                    // Check for private poll
                    checkPrivatePollRecipients(id);
                } else {
                    // Check for public poll
                    checkPublicPollRecipients(id);
                }
            }
        }
    });
}

function checkPrivatePollRecipients(id) {
    const pollRef = ref(db, `/poll-recipients/${id}`);
   
    get(pollRef).then(snapshot => {
        if (snapshot.exists()) {
            let found = false;
            snapshot.forEach(sessionSnapshot => {
                const recipient = sessionSnapshot.val();
                console.log(recipient);
                
                if (recipient.email === email) {
                    found = true;
                    // window.location.href = `../castPoll/?email=${encodeURIComponent(email)}&id=${id}`;
                    window.location.href = `../castPoll/?id=${id}`;
                   
                }
            });
            if (!found) {
                alert("You are not a recipient of this poll.");
                window.location.href = "../../common/error";
            }
        } else {
            console.log("No data available");
            alert("No recipients found for this poll.");
            window.location.href = "../../common/error";
        }
    }).catch(error => {
        console.error("Error reading poll recipients:", error);
    });
}

function checkPublicPollRecipients(id) {
    const pollRef = ref(db, `/poll-recipients/${id}`);
    
    get(pollRef).then(snapshot => {
        let found = false;

        if (snapshot.exists()) {
            snapshot.forEach(sessionSnapshot => {
                const recipient = sessionSnapshot.val();
                if (recipient.email === email) {
                    found = true; // Email exists in recipients
                    // Update the recipient with the entered name
                    const userRef = ref(db, `/poll-recipients/${id}/${sessionSnapshot.key}`); // Reference to the specific recipient
                    set(userRef, {
                        ...recipient, // Retain existing data
                        name: fullName // Update name
                    }).then(() => {
                        console.log("Recipient updated successfully.");
                        // Redirect to castPoll page
                        // window.location.href = `../castPoll/?email=${encodeURIComponent(email)}&id=${id}`;
                        window.location.href = `../castPoll/?id=${id}`;

                    }).catch(error => {
                        console.error("Error updating recipient:", error);
                    });
                }
                else {
                    // Email does not exist, create new recipient
                    const newRecipientRef = ref(db, `/poll-recipients/${id}/${sessionSnapshot.key}`).push(); // Create a new record
                    set(newRecipientRef, {
                        name: fullName,
                        email: email,
                        hasDone: false
                    }).then(() => {
                        console.log("New recipient added successfully.");
                        // Redirect to castPoll page
                        // window.location.href = `../castPoll/?email=${encodeURIComponent(email)}&id=${id}`;
                        window.location.href = `../castPoll/?id=${id}`;
        
                    }).catch(error => {
                        console.error("Error adding new recipient:", error);
                    });
                }
            });
        } 

        // if (!found) {
        //     // Email does not exist, create new recipient
        //     const newRecipientRef = ref(db, `/poll-recipients/${id}/${sessionSnapshot.key}`).push(); // Create a new record
        //     set(newRecipientRef, {
        //         name: fullName,
        //         email: email,
        //         hasDone: false
        //     }).then(() => {
        //         console.log("New recipient added successfully.");
        //         // Redirect to castPoll page
        //         // window.location.href = `../castPoll/?email=${encodeURIComponent(email)}&id=${id}`;
        //         window.location.href = `../castPoll/?id=${id}`;

        //     }).catch(error => {
        //         console.error("Error adding new recipient:", error);
        //     });
        // }
    }).catch(error => {
        console.error("Error reading poll recipients:", error);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
