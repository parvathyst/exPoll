import { app, db } from "../../../backend/firebase/config.js";
import {
  set,
  ref,
  onValue,
  serverTimestamp,
  runTransaction,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const url = window.location.href;
const urlParams = new URL(url);
let id = urlParams.searchParams.get("id");
const email = urlParams.searchParams.get("email");
console.log(email);

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
confirmButton.onclick = () => {
  const selectedOptionRef = ref(db, `/poll-options/${id}/${selectedIndex}`);
  console.log("Confirmed")
  runTransaction(selectedOptionRef, (currentOption) => {
    if (currentOption && !currentOption.isSelected) {
      // Option is available, mark it as selected and assign the employee
      currentOption.isSelected = true;
      currentOption.assignedEmployee = "parvathyst@gmail.com";
      currentOption.selectedTime = serverTimestamp();
      return currentOption;
    } else {
      // Option is already selected, abort transaction
      return; // Returning undefined will abort the transaction
    }
  }).then((result) => {
    if (result.committed) {
      resultPage();
    } else {
      alert("This option has already been chosen. Please select another option.");
    }
  }).catch((error) => {
    console.error("Transaction failed:", error);
    alert("An error occurred. Please try again.");
  });
};

let selectedIndex = -1;

function resultPage() {
  // mail();
    const page1 = document.getElementById("page1");
    page1.classList.remove("page");
    page1.classList.add("page-hidden");

    const page2 = document.getElementById("page2");
    page2.classList.remove("page-hidden");
    page2.classList.add("page");

    writeData();
  
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
    <h4>${pollOption.content}</h4><img src="/src/assets/icons/lock.svg">
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
      assignedEmployee: email,
      selectedTime: serverTimestamp(),
      isSelected: true,
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

  const startDate = new Date(`${pollDetails.startDate} ${pollDetails.startTime}`);
  const endDate = new Date(`${pollDetails.endDate} ${pollDetails.endTime}`);
  
  // Format date, hour, minute, and am/pm in lowercase
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${date.toLocaleDateString()}  ${formattedHours}:${minutes} ${period}`;
  };

  const startDateFormatted = formatTime(startDate);
  const endDateFormatted = formatTime(endDate);

  document.querySelector('.datetime').innerHTML = `
    <h5><strong>Active from:</strong> ${startDateFormatted}</h5>
    <h5><strong>Closing at:</strong> ${endDateFormatted}</h5>
  `;
}


// Function to send an email using EmailJS
// function sendEmail(toEmail, subject, message) {
//   const templateParams = {
//       to_email: toEmail,
//       subject: subject,
//       message: message
//   };

//   emailjs.send('service_bxt3eel', 'template_0mg1p1y', templateParams)
//       .then((response) => {
//           console.log('Email sent successfully!', response.status, response.text);
//       })
//       .catch((error) => {
//           console.error('Failed to send email:', error);
//       });
// }

// function mail(pollData, pollRecipients) {
//   document.getElementById("confirm").addEventListener("click", function () {
//       try {
//           const subject = pollData.title;
//           const message = `
//           ${pollData.description}

//           Link to access poll: ${generatedLink}

//           Poll will be open from:

//           ${pollData.startDate} [${pollData.startTime}] to ${pollData.endDate} [${pollData.endTime}]`;

//           Object.keys(pollRecipients).forEach(key => {
//               const data = pollRecipients[key];
//               if (data && data.email) {
//                   sendEmail(data.email, subject, message); // Calls sendEmail for each email
//                   console.log(`Email sent to: ${data.email}`);
//               } else {
//                   console.warn("Recipient data is missing an email:", data);
//               }
//           });

//       } catch (error) {
//           console.error('Error fetching recipients:', error);
//       }
//   });

// };
