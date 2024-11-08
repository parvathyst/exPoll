import { fetchPollData } from "../../../backend/firebase/admin/loadPollHistory/fetchPollData.js";
import { displayPollOptions, displayPollDetails } from "./displayPollDetails.js";
// import { combinePollOptionsAndRecipients } from "./combinePollOptionsAndRecipients.js";

const url = window.location.href;
const urlParams = new URL(url);
const pollId = urlParams.searchParams.get("poll-id");

async function getPollData(pollID) {
    const pollData = await fetchPollData(pollID);

    if (pollData) {
        const { pollDetails, pollOptions } = pollData;

        // const pollOptionsAndRecipients = combinePollOptionsAndRecipients(pollOptions, pollData.pollRecipients);

        displayPollOptions(pollOptions);
        displayPollDetails(pollDetails);

        document.getElementById("download-excel-btn").addEventListener("click", () => {
            downloadExcel(pollDetails, pollOptionsAndRecipients);
        });
    } else {
        console.log("Failed to fetch poll data");
    }
}

function downloadExcel(pollDetails, pollOptionsAndRecipients) {
    const wb = XLSX.utils.book_new();

    const data = [
        ["Title", pollDetails.title],
        ["Description", pollDetails.description],
        [],
        ["Content", "Email"]
    ];

    pollOptionsAndRecipients.forEach(option => {
        data.push([option.content, option.name, option.email]);
    });

    const ws = XLSX.utils.aoa_to_sheet(data);

    const colWidth = [
        { wch: 20 },
        { wch: 30 }
    ];
    ws['!cols'] = colWidth;

    ws['!rows'] = [];
    for (let i = 0; i < data.length; i++) {
        ws['!rows'][i] = { hpt: 15 };
    }

    XLSX.utils.book_append_sheet(wb, ws, "Poll Data");
    const fileName = `${pollDetails.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.xlsx`;
    XLSX.writeFile(wb, fileName);
}

getPollData(pollId);
