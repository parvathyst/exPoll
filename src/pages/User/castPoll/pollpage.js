const pollOptions = [
  "Öption 1",
  "Öption 2",
  "Öption 3",
  "Öption 4",
  "Öption 5",
  "Öption 6",
  "Öption 7",
];

displayPollList();

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
}

function displayOption(value) {
  const pollItem = document.createElement("button");
  pollItem.classList.add("poll-card");
  pollItem.onclick = function () {
    displaySelectedOption(value, pollItem);
  };
  pollItem.innerHTML = `
    <h2>${value}</h2>
    `;
  const pollList = document.getElementsByClassName("poll-options-list")[0];
  pollList.appendChild(pollItem);
}

function displayPollList() {
  for (const pollOption of pollOptions) {
    displayOption(pollOption);
  }
}
