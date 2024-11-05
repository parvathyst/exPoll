import { fetchPollData } from "../../../backend/firebase/admin/loadPollHistory/fetchPollData.js";
import { displayPollOptions, displayPollDetails } from "./displayPollDetails.js";
import { downloadExcel } from "./downloadExcel.js";
import { extendTime } from "./extendTime.js";
import { addPollOption } from "./addPollOption.js";

const url = window.location.href;
const urlParams = new URL(url);
const pollId = urlParams.searchParams.get("poll-id");

async function getPollData(pollID) {
    const pollData = await fetchPollData(pollID);

    if (pollData) {
        const { pollDetails, pollOptions } = pollData;

        displayPollOptions(pollData.pollOptions);
        displayPollDetails(pollData.pollDetails);

        document.getElementById("download-excel-btn").addEventListener("click", () => {
            downloadExcel(pollData.pollDetails, pollOptionsAndRecipients);
        });

    } else {
        console.log("Failed to fetch poll data");
    }
}


getPollData(pollId)


