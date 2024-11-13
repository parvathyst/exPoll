import { app, db } from "../../../backend/firebase/config.js";
import {
  set,
  ref,
  onValue,
  serverTimestamp,
  runTransaction,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

function preventBackNavigation() {
  // Push two states into history
  history.pushState(null, null, window.location.href);
  history.pushState(null, null, window.location.href);

  // Handle the back button by moving forward immediately
  window.onpopstate = function () {
    history.go(1); // Go forward if back is pressed
  };
}

// Call preventBackNavigation when the page loads
window.onload = preventBackNavigation;


const url = window.location.href;
const urlParams = new URL(url);
let id = urlParams.searchParams.get("id");

let pollOptions;
let pollDetails;
confirmPopUpBox();
cancelPopUpBox();

function confirmPopUpBox() {
  const confirmPopUpButton = document.getElementById("cast-poll-button");
  confirmPopUpButton.onclick = () => {
    // alert("hello");
    const popUp = document.getElementById("pop-up-container");
    popUp.classList.remove("pop-up-container-hidden");
    popUp.classList.add("pop-up-container");
  };
}

function cancelPopUpBox() {
  const cancelPopUpButton = document.getElementById("cancel");
  cancelPopUpButton.onclick = () => {
    // alert("hello");
    const popUp = document.getElementById("pop-up-container");
    popUp.classList.remove("pop-up-container");
    popUp.classList.add("pop-up-container-hidden");
  };
}


const confirmButton = document.getElementById("confirm");
confirmButton.onclick = (event) => {
  event.preventDefault(); 
  console.log("Confirm button clicked");
  const endDateTime = pollDetails.endDateTime;
  console.log(endDateTime);
  const currentDateTime = new Date();

  if (currentDateTime >= endDateTime) {
    alert("The poll has ended.");
  } else {
    const selectedOptionRef = ref(db, `/poll-options/${id}/${selectedIndex}`);
    console.log("Confirmed")
    runTransaction(selectedOptionRef, (currentOption) => {
      if (currentOption && !currentOption.isSelected) {
        // Option is available, mark it as selected and assign the employee
        currentOption.isSelected = true;
        currentOption.assignedEmployee = employeeEmail;
        currentOption.selectedTime = serverTimestamp();
        return currentOption;
      } else {
        // Option is already selected, abort transaction
        return; // Returning undefined will abort the transaction
      }
    }).then((result) => {
      if (result.committed) {
        resultPage(selectedOptionRef);
      } else {
        alert("This option has already been chosen. Please select another option.");
      }
    }).catch((error) => {
      console.error("Transaction failed:", error);
      alert("An error occurred. Please try again.");
    });
  }
};

let selectedIndex = -1;

// Get name and email here
const employeeEmail = sessionStorage.getItem("userEmail");
const employeeName = sessionStorage.getItem("userName");
if (employeeEmail) {
  console.log("User's email:", employeeEmail);
  console.log("User's email:", employeeName);
}


function resultPage(selectedOptionRef) {
  // mail(selectedOptionRef)
  const page1 = document.getElementById("page1");
  page1.classList.remove("page");
  page1.classList.add("page-hidden");

  const page2 = document.getElementById("page2");
  page2.classList.remove("page-hidden");
  page2.classList.add("page");

  disableBackButton();


  writeData();

}

function disableBackButton() {
  history.pushState(null, null, window.location.href);

  window.onpopstate = function () {
    history.go(1);
  };
}


function sortPollOptions(pollOptions) {
  const selectedPollOptions = [];
  const sortedPollOptions = [];
  for (const pollOption of pollOptions) {
    if (pollOption.isSelected == true) {
      selectedPollOptions.push(pollOption);
    } else {
      sortedPollOptions.push(pollOption);
    }
  }
  sortedPollOptions.push(...selectedPollOptions);
  return sortedPollOptions;
}

function displaySelectedOption(pollOption, pollItem) {
  const selectedPollOption = document.getElementById("selected-option");
  selectedPollOption.innerHTML = `<strong>Selected Option:</strong> ${pollOption.content}`;
  selectedIndex = pollOptions.indexOf(pollOption);

  //Change style of unselected cards
  const allPollCards = document.getElementsByClassName("poll-card");
  for (const pollCard of allPollCards) {
    pollCard.classList.remove("selected-poll-card");
  }

  //Change style of selected card
  pollItem.classList.add("selected-poll-card");
  const castPollButton = document.getElementById("cast-poll-button");
  castPollButton.disabled = false;
  castPollButton.classList.add("cast-poll-button");
}

function displayOption(pollOption) {
  const pollItem = document.createElement("button");
  pollItem.classList.add("poll-card");
  pollItem.onclick = function () {
    displaySelectedOption(pollOption, pollItem);
  };
  if (pollOption.isSelected == false) {
    pollItem.innerHTML = `
    <h4>${pollOption.content}</h4>
    `;
    pollItem.classList.add("unlocked-poll-card");
  } else {
    pollItem.innerHTML = `
    <h4>${pollOption.content}</h4><img src="/exPoll/src/assets/icons/lock.svg">
    `;
    pollItem.classList.add("locked-poll-card");
    pollItem.disabled = true;
  }
  const pollList = document.getElementsByClassName("poll-options-list")[0];
  pollList.appendChild(pollItem);
}

readPollDetails();
readData();

function readData() {
  const pollRef = ref(db, `/poll-options/${id}`);
  onValue(pollRef, (snapshot) => {
    const data = snapshot.val();
    //console.log(data);
    pollOptions = data;

    displayPollList(data);
  });
}

function writeData() {
  if (selectedIndex === -1 || !pollOptions[selectedIndex]) return;
  set(ref(db, `/poll-options/${id}/` + selectedIndex), {
    ...pollOptions[selectedIndex],
    selectedUserEmail: employeeEmail,
    selectedUserName: employeeName,
    selectedTime: serverTimestamp(),
    isSelected: true,
  }).then(() => {
    mail(pollOptions[selectedIndex].content);
  }).catch((error) => {
    console.error("Failed to write data:", error);
  });
}

function displayPollList(pollOptions) {
  const sortedPollOptions = sortPollOptions(pollOptions);

  const pollOptionsContainer =
    document.getElementsByClassName("poll-options-list")[0];
  pollOptionsContainer.innerHTML = "";

  for (const pollOption of sortedPollOptions) {
    displayOption(pollOption);
  }
}

function readPollDetails() {
  const pollRef = ref(db, `/poll-details/${id}`);
  onValue(pollRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(data);
    pollDetails = data;
    displayPollDetails(pollDetails);
  });
}

function displayPollDetails(pollDetails) {
  console.log(pollDetails);
  document.querySelector('.poll-h-info h3').innerText = pollDetails.title;
  document.querySelector('.poll-information h4').innerText = pollDetails.description;

  const startDate = new Date(`${pollDetails.startDateTime}`);

  console.log(pollDetails.startDateTime);

  const endDate = new Date(`${pollDetails.endDateTime}`);



  const formatTime = (date) => {

    const hours = date.getHours();

    const minutes = String(date.getMinutes()).padStart(2, "0");

    let period;

    let formattedHours;



    if (hours === 0) {

      period = "am";

      formattedHours = 12; // Midnight

    } else if (hours === 12) {

      period = "pm";

      formattedHours = 12; // Noon

    } else {

      period = hours >= 12 ? "pm" : "am";

      formattedHours = hours % 12 || 12; // Converts 13–23 hours to 1–11, keeping 12 as-is

    }



    return `${date.toLocaleDateString()} ${formattedHours}:${minutes} ${period}`;

  };



  const startDateFormatted = formatTime(startDate);

  const endDateFormatted = formatTime(endDate);



  document.querySelector(".datetime").innerHTML = `

  <h5><strong>Active from:</strong> ${pollDetails.startDateTime}</h5>

  <h5><strong>Closing at:</strong> ${pollDetails.endDateTime}</h5>

`;
}



function sendEmail(toEmail, subject, message) {
  const templateParams = {
    to_email: toEmail,
    subject: subject,
    message: message
  };

  emailjs.send('service_bxt3eel', 'template_0mg1p1y', templateParams)
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
    });
}

function mail(selectedPollOption) {
  console.log(selectedPollOption);
  try {
    const subject = "Your poll";
    const message = `
           
          Your poll option : ${selectedPollOption}

          `;
    const toemail = employeeEmail;
    if (toemail) {
      sendEmail(toemail, subject, message);
      console.log(`Email sent to: ${toemail}`);
    } else {
      console.warn("Recipient data is missing an email:", toemail);
    }

  } catch (error) {
    console.error('Error fetching recipients:', error);
  }


};
