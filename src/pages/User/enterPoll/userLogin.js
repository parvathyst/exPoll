import { db } from "../../../backend/firebase/config.js";
import {
  get,
  set,
  ref,
  child,
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
    fullName = document.getElementById("fullName").value;
    email = document.getElementById("email").value;
    const emailField = document.getElementById("email");
    const errorEmail = document.getElementById("errorEmail");
    if (isValidEmail(email)) {
        emailField.classList.remove("error");
        errorEmail.classList.remove("show");
    } else {
        emailField.classList.add("error");
        errorEmail.classList.add("show");
    }
    sessionStorage.setItem("userEmail", email);
    sessionStorage.setItem("userName", fullName);
    sessionStorage.setItem("id",id);
    readPollDetails();
});

function readPollDetails() {
    const pollRef = ref(db, `/poll-details/${id}`);
    const emailField = document.getElementById("email");
    const errorEmail = document.getElementById("errorEmail");
    onValue(pollRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            pollDetails = data;
            const now = new Date();

            const startDateTime = new Date(`${pollDetails.startDateTime}:00`);
            const endDateTime = new Date(`${pollDetails.endDateTime}:00`);

            if (now < startDateTime) {
                alert("The poll has not started yet.");
                window.location.href = "../accessDenied/pleasewait.html";
            } else if (now > endDateTime) {
                alert("The poll has ended."); 
                window.location.href = "../accessDenied/timeisup.html";
            } else {
                if(isValidEmail(email))
                {
                    emailField.classList.remove("error");
                    errorEmail.classList.remove("show"); 
                    if (pollDetails.isPrivatePoll) {
                      checkPrivatePollRecipients(id);
                    } else {
                       checkPublicPollRecipients(id);
                        console.log(id);
                    }
                 }
                else{
                    emailField.classList.add("error");
                    errorEmail.classList.add("show");
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
                    window.location.href = `../castPoll/?id=${id}`;
                   
                }
            });
            if (!found) {
                alert("You are not a recipient of this poll.");
                window.location.href = "../accessDenied/notRecipient.html";
            }
        } else {
            console.log("No data available");
            alert("No recipients found for this poll.");
            window.location.href = "./accessDenied/notRecipient.html";
        }
    }).catch(error => {
        console.error("Error reading poll recipients:", error);
    });
}

function  checkPublicPollRecipients(id) {
    console.log(id);
    const pollRef = ref(db, `/poll-recipients/${id}`);
    
    get(pollRef).then(snapshot => {
        let found = false;

        if (snapshot.exists()) {
            snapshot.forEach(sessionSnapshot => {
                const recipient = sessionSnapshot.val();
                if (recipient.email === email) {
                    found = true; 
                    window.location.href = `../castPoll/?id=${id}`;
                }
            });
            if(found == false){
        
                    getrecipient(id);
            }

          
        } 
    }).catch(error => {
        console.error("Error reading poll recipients:", error);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

async function getrecipient(id){
    const newRecipientRef = ref(db, `/poll-recipients/${id}`);
    
    const snapshot = await get(newRecipientRef);
    console.log(snapshot);
    const recipientCount = Object.keys(snapshot.val()).length;
    console.log(recipientCount);
    const newID = recipientCount;
    const newRef = child(newRecipientRef, newID.toString());
    const newData = {
        email: email,
        name :fullName,
        hasDone: false
    };
    set(newRef, newData);
    console.log(`New poll option added under poll-recipients/${id} with ID ${newID}`);
}