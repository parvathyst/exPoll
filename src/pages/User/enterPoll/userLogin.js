import { app, db } from "../../../backend/firebase/config.js";
import {
 
  get,
  set,
  ref,
  onValue,
  serverTimestamp,
  runTransaction,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const url = window.location.href;
const urlParams = new URL(url);
let id = urlParams.searchParams.get("id");

let pollDetails;
let pollRecipients;
// readPollDetails();
// readPollRecipients(id);

let fullName;
document.getElementById("submit").addEventListener("click", () => {
    // Retrieve the values from the input fields
    
    fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    readPollDetails();
    // Store the values in an object (optional)
    const userInfo = {
        name: fullName,
        email: email
    };

    // Log the values to the console
    console.log("User Info:", userInfo);
    console.log("Full Name:", fullName);
    console.log("Email Address:", email);
});

function readPollDetails() {
    const pollRef = ref(db, `/poll-details/${id}`);
    onValue(pollRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            pollDetails = data;
            const now = new Date(); // Current date and time

            // Assume these are the separate date and time values from `pollDetails`
            const startDate = pollDetails.startDate;
            const startTime = pollDetails.startTime; 
            const endDate = pollDetails.endDate;     
            const endTime = pollDetails.endTime;     

            // Combine date and time for start and end times
            const startDateTime = new Date(`${startDate}T${startTime}:00`);
            const endDateTime = new Date(`${endDate}T${endTime}:00`);
            console.log(endDateTime);
            if (now < startDateTime) {
                alert("The poll has not started yet."); // Poll start time is in the future
            } else if (now > endDateTime) {
                alert("The poll has ended."); // Poll end time is in the past
            } else {
                if(pollDetails.isPrivatePoll == true){
                    readPollRecipients(id);
                }
                else{
                    alert("public poll");
                }
            }
        }
    });
}

               


// function readPollDetails() {
//     const pollRef = ref(db, `/poll-details/${id}`);
//     onValue(pollRef, (snapshot) => {
//       const data = snapshot.val();
//       // console.log(data);
//       pollDetails = data;
//       console.log(pollDetails.endDate);
//     //   displayPollDetails(pollDetails);
//     });
//   }

  function readPollRecipients(id) {
    const pollRef = ref(db, `/poll-recipients/${id}`);
    
    get(pollRef).then(snapshot => {
        // const recipients = []; // To store email addresses
        // const names = []; // Uncomment if you want to store names as well

        if (snapshot.exists()) {
            snapshot.forEach(sessionSnapshot => { // Iterate through each recipient
                const recipient = sessionSnapshot.val();
                pollRecipients = recipient
                console.log(pollRecipients.hasDone);
                console.log(pollRecipients.email);
                if(pollRecipients.hasDone == false){
                    // document.getElementById("login").addEventListener("click", (e) => {
                    //     e.preventDefault();
                        console.log(pollRecipients.hasDone);
                        const email = document.getElementById("email").value.trim();
                        const emailField = document.getElementById("email");
                        emailField.style.borderColor = "#8061C3";
                        console.log(pollRecipients.email);
                      
                        if (isValidEmail(email)) {
                          if(pollRecipients.email === email){
                            console.log(pollDetails);
                            // pollRecipients.name = fullName;
                            // window.location.href = `../castPoll/?email=${encodeURIComponent(email)}&id=${id}`;
                            window.location.href = `../castPoll/?email=${encodeURIComponent(email)}&id=${id}&name=${encodeURIComponent(fullName)}`;
                          }
                          else{
                            alert("no entry");
                          }
                        } else {
                          emailField.style.borderColor = "red";
                          document.getElementById("error-email").style.display = "block";
                        }
                    //   });
                      
                }
                else{
                    alert("you already took the poll."); 
                }
            });

        } else {
            console.log("No data available");
        }
    }).catch(error => {
        console.error("Error reading poll recipients:", error);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}