import { fetchPollData } from "../../../backend/firebase/admin/loadPollHistory/fetchPollData.js";
import { displayPollOptions, displayPollDetails } from "./displayPollDetails.js";
import { combinePollOptionsAndRecipients } from "./combinePollOptionsAndRecipients.js";

const url = window.location.href;
const urlParams = new URL(url);
const pollId = urlParams.searchParams.get("poll-id");

async function getPollData(pollID) {
    const pollData = await fetchPollData(pollID);

    if (pollData) {
        const { pollDetails, pollOptions, pollRecipients } = pollData;

        console.log(pollData);

        const pollOptionsAndRecipients = combinePollOptionsAndRecipients(pollData.pollOptions, pollData.pollRecipients)
        
        console.log(pollOptionsAndRecipients);
        
        
        displayPollOptions(pollOptionsAndRecipients);
        displayPollDetails(pollData.pollDetails);

    } else {
        console.log("Failed to fetch poll data");

    }
}

getPollData(pollId)

