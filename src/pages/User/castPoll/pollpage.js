import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  onValue,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8MCo957ZjjgF5rQ47uzIi8BVa_SWfPeo",
  authDomain: "expoll-5cb6d.firebaseapp.com",
  databaseURL:
    "https://expoll-5cb6d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "expoll-5cb6d",
  storageBucket: "expoll-5cb6d.firebasestorage.app",
  messagingSenderId: "676581762842",
  appId: "1:676581762842:web:88c56ced7b66a9d1762ea3",
  measurementId: "G-J4DY55BWS7",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

let pollOptions = [
  {
    assignedEmployee: "",
    name: "Öption 1",
    selectedTime: "",
    status: false,
  },
  {
    assignedEmployee: "",
    name: "Öption 2",
    selectedTime: "",
    status: true,
  },
  {
    assignedEmployee: "",
    name: "Öption 3",
    selectedTime: "",
    status: false,
  },
  {
    assignedEmployee: "",
    name: "Öption 4",
    selectedTime: "",
    status: false,
  },
  {
    assignedEmployee: "",
    name: "Öption 5",
    selectedTime: "",
    status: true,
  },
  {
    assignedEmployee: "",
    name: "Öption 6",
    selectedTime: "",
    status: false,
  },
  {
    assignedEmployee: "",
    name: "Öption 7",
    selectedTime: "",
    status: false,
  },
];

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

resultPage();

let selectedIndex = -1;

function resultPage() {
  const confirmButton = document.getElementById("confirm");
  confirmButton.onclick = () => {
    const page1 = document.getElementById("page1");
    page1.classList.remove("page");
    page1.classList.add("page-hidden");

    const page2 = document.getElementById("page2");
    page2.classList.remove("page-hidden");
    page2.classList.add("page");

    writeData();
  };
}

function sortPollOptions(pollOptions) {
  const selectedPollOptions = [];
  const sortedPollOptions = [];
  for (const pollOption of pollOptions) {
    if (pollOption.status == true) {
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
  selectedPollOption.innerText = pollOption.name;

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
  if (pollOption.status == false) {
    pollItem.innerHTML = `
    <h2>${pollOption.name}</h2>
    `;
    pollItem.classList.add("unlocked-poll-card");
  } else {
    pollItem.innerHTML = `
    <h2>${pollOption.name}</h2><img src="/src/assets/icons/lock.svg">
    `;
    pollItem.classList.add("locked-poll-card");
    pollItem.disabled = true;
  }
  const pollList = document.getElementsByClassName("poll-options-list")[0];
  pollList.appendChild(pollItem);
}

readData();

function readData() {
  const pollRef = ref(db, "/poll-options/-OAWezoSSchZ6uZUDxAz");
  onValue(pollRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    pollOptions = data;

    displayPollList(data);
  });
}

function writeData()
{
    // console.log("hello")
    // console.log(selectedIndex)
    set(ref(db, "/poll-options/-OAWezoSSchZ6uZUDxAz/"+selectedIndex),{
        assignedEmployee: "",
        name:pollOptions[selectedIndex].name,
        selectedTime:serverTimestamp(),
        status: true
    })
}

function displayPollList(pollOptions) {
  const sortedPollOptions = sortPollOptions(pollOptions);

  const pollOptionsContainer = document.getElementsByClassName("poll-options-list")[0];
  pollOptionsContainer.innerHTML = "";

  for (const pollOption of sortedPollOptions) {
    displayOption(pollOption);
  }
}
