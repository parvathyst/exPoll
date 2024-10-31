const pollOptions = [
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

displayPollList();

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

function displaySelectedOption(value, pollItem) {
  const selectedPollOption = document.getElementById("selected-option");
  selectedPollOption.innerText = value;
  //Change style of unselected cards
  const allPollCards = document.getElementsByClassName("poll-card");
  for (const pollCard of allPollCards) {
    pollCard.classList.remove("selected-poll-card");
  }

  //Change style of selected card
  pollItem.classList.add("selected-poll-card");
  const castPollButton = document.getElementById("cast-poll-button")
  castPollButton.disabled = false
  castPollButton.classList.add("cast-poll-button")
 }

function displayOption(value, status) {
  const pollItem = document.createElement("button");
  pollItem.classList.add("poll-card");
  pollItem.onclick = function () {
    displaySelectedOption(value, pollItem);
  };
  if (status == false) {
    pollItem.innerHTML = `
    <h2>${value}</h2>
    `;
    pollItem.classList.add("unlocked-poll-card");
  } else {
    pollItem.innerHTML = `
    <h2>${value}</h2><img src="/src/assets/icons/lock.svg">
    `;
    pollItem.classList.add("locked-poll-card");
    pollItem.disabled = true;
  }
  const pollList = document.getElementsByClassName("poll-options-list")[0];
  pollList.appendChild(pollItem);
}

function displayPollList() {
  const sortedPollOptions = sortPollOptions(pollOptions);
  for (const pollOption of sortedPollOptions) {
    displayOption(pollOption.name, pollOption.status);
  }
}

function alert() {
    alert("I am an alert box!");
  }