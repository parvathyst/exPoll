import { fetchPollData } from "../../../backend/firebase/admin/loadPollHistory/fetchPollData.js";
import { displayPollOptions, displayPollDetails } from "./displayPollDetails.js";
import { downloadExcel } from "./downloadExcel.js";
import { changePollEndTime } from "./changePollEndTime.js";
import { addPollOption } from "./addPollOption.js";
import { authCheck } from "../../../functions/authentication/authCheck.js";


const url = window.location.href;
const urlParams = new URL(url);
const pollId = urlParams.searchParams.get("poll-id");

let userUID;

async function initialize() {
    try {
        userUID = await authCheck();
    } catch (error) {
        console.error("Authentication error:", error);
        window.location.href = "../../Common/error/";
    }
}

await initialize();

async function getPollData(pollID) {
    const pollData = await fetchPollData(pollID);

    if (pollData) {
        const { pollDetails, pollOptions } = pollData;

        if (pollDetails.createdBy !== userUID) {
            console.error("Authentication error: User is not authorized to access this poll");
            window.location.href = "../../Common/error/";
            return;
        }

        const sortedPollOptions = [...pollOptions].sort((a, b) => {
            return (b.isSelected ? 1 : 0) - (a.isSelected ? 1 : 0);
        });

        displayPollOptions(sortedPollOptions);
        displayPollDetails(pollDetails);
        document.getElementById("download-excel-btn").addEventListener("click", () => {
            downloadExcel(pollDetails, pollOptions);
        });

    } else {
        console.log("Failed to fetch poll data");
    }
}

await getPollData(pollId);


const popups = {
    extendPollPopup: document.getElementById("extendPollModal"),
    stopPollPopup: document.getElementById("stopPollModal"),
    addOptionPopup: document.getElementById("addOptionModal"),
};

const popupButtons = {
    extendPollBtn: document.getElementById("extend-poll-btn"),
    stopPollBtn: document.getElementById("stop-poll-btn"),
    addOptionBtn: document.getElementById("end-poll-btn"),
};

const openPopup = (popup) => { popup.style.display = "flex"; };
const closePopup = (popup) => { popup.style.display = "none"; };

popupButtons.extendPollBtn.addEventListener("click", () => openPopup(popups.extendPollPopup));
popupButtons.stopPollBtn.addEventListener("click", () => openPopup(popups.stopPollPopup));
popupButtons.addOptionBtn.addEventListener("click", () => openPopup(popups.addOptionPopup));

document.querySelectorAll(".popup .close").forEach(closeElem => {
    closeElem.addEventListener("click", (e) => {
        const popup = e.target.closest(".popup");
        if (popup) closePopup(popup);
    });
});

const saveNewEnd = async () => {
    const newEndDate = document.getElementById("new-end-date").value;
    const newEndTime = document.getElementById("new-end-time").value;
    if (newEndDate && newEndTime) {
        const endDateTimeString = `${newEndDate}T${newEndTime}`;
        const endDateTime = new Date(endDateTimeString).getTime();

        if (endDateTime > Date.now()) {
            try {
                await changePollEndTime(pollId, endDateTime);
                getPollData(pollId);
                closePopup(popups.extendPollPopup);

            } catch (error) {
                console.error("error:", error);
                closePopup(popups.extendPollPopup);
            }
        } else {
            alert("Date and time cannot be in the past or before start date and time");
        }
    } else {
        alert("Please select both a date and a time.");
    }
};

const confirmStopPoll = async () => {

    const date = Date.now();
    const endDateTime = new Date(date);

    try {
        await changePollEndTime(pollId, endDateTime);
        getPollData(pollId);
    } catch (error) {
        console.error("error:", error);
    }

    closePopup(popups.stopPollPopup);
};

const saveNewOption = async () => {
    const newOption = document.getElementById("new-option").value;
    if (newOption) {
        try {
            await addPollOption(pollId, newOption);
            closePopup(popups.addOptionPopup);
            getPollData(pollId);
        } catch (error) {
            console.error("error:", error);
        }
    } else {
        alert("Please enter a new option");
    }
};

document.getElementById("save-new-end").addEventListener("click", saveNewEnd);
document.getElementById("confirm-stop-poll").addEventListener("click", confirmStopPoll);
document.getElementById("save-option").addEventListener("click", saveNewOption);

window.addEventListener("click", (event) => {
    Object.values(popups).forEach(popup => {
        if (event.target === popup) closePopup(popup);
    });
});
