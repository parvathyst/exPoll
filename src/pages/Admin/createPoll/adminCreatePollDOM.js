
import { createPoll } from "../../../backend/firebase/admin/createPoll/createPoll.js"

// import { generateLink } from "./generatelink.js";

import { validateForm } from "./validation.js";

document.addEventListener('DOMContentLoaded', function () {
    const uploadUser = document.getElementById('uploadUser');
    if (uploadUser) {
        uploadUser.addEventListener('change', handleUser, false);
    }
    document.getElementById('generate-button').addEventListener('click', function (event) {
        if (validateForm()) {
            fetchDataAndGenerateLink();
        } else {
            console.log("Form validation failed. Please fix the highlighted errors.");
        }
    });
});

function addRecipient(value) {
    const recipientContainer = document.createElement('div');
    recipientContainer.classList.add('recipient-item', 'D-card');
    if (value === undefined) {
        recipientContainer.innerHTML = `
            <input type="email" placeholder="Enter Email"  class="D-no-border">
            <img src="../../../assets/icons/trash.png" alt="delete icon" onclick="removeRecipient(this)" />
        `;
    } else {
        recipientContainer.innerHTML = `
            <input type="email" value="${value}" class="D-no-border">
            <img src="../../../assets/icons/trash.png" alt="delete icon" onclick="removeRecipient(this)" />
        `;
    }
    // document.querySelector('.recipients-container').insertBefore(recipientContainer, document.querySelector('.recipients-container button'));
    document.querySelector('.recipient-container-none').insertAdjacentElement('afterend', recipientContainer);
}

function removeRecipient(button) {
    button.parentElement.remove();
}

function handleUser(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file && (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel")) {
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            if (jsonData.length > 1) {
                jsonData.slice(1).forEach((row) => { // Start from the second row (index 1)
                    if (row.length > 0) {
                        addRecipient(row[1]);
                    }
                });
            } else {
                alert('No data found in the Excel file.');
            }
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Please upload a valid Excel file (.xlsx or .xls).');
    }
}


let generatedLink = '';

async function fetchDataAndGenerateLink() {


    const generateLinkButton = document.getElementById("generate-button");
    const buttonIcon = document.getElementById("button-icon");
    const buttonText = document.getElementById("button-text");

    if (generatedLink) {
        copyToClipboard(generatedLink);
        buttonText.innerText = "Link Copied!";
        setTimeout(() => buttonText.innerText = generatedLink, 4000); 
        return;
    }

    buttonIcon.className = 'loader';
    buttonText.innerText = "Generating Link";
    generateLinkButton.classList.remove("show-text", "show-icon-left");

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const startDate = document.getElementById('poll-start-date').value;
    const startTime = document.getElementById('poll-start-time').value;
    const endDate = document.getElementById('poll-end-date').value;
    const endTime = document.getElementById('poll-end-time').value;

    let pollOptions = {};
    const optionInputs = document.querySelectorAll('.options-container-bottom input[type="text"]');

    optionInputs.forEach((input, index) => {
        if (input.value) {
            pollOptions[index] = {
                name: input.value,
                assignedEmployee: "",
                status: "false",
                selectedTime: ""
            };
        }
    });

    let pollRecipients = {};
    const recipientInputs = document.querySelectorAll('.recipient-container-bottom input[type="email"]');
    recipientInputs.forEach((input, index) => {
        if (input.value) {
            pollRecipients[index] = {
                name: "",
                email: input.value,
            };
        }
    });

    const isPrivatePoll = document.getElementById('toggleSwitch').checked.toString();
    const dateTime = new Date().toLocaleString();

    const pollData = {
        "title": title,
        "description": description,
        "startDate": startDate,
        "startTime": startTime,
        "endDate": endDate,
        "endTime": endTime,
        "isPrivatePoll": isPrivatePoll,
        "createdBy": "",
        "createdAt": dateTime,
    };

    try {
        const key = await createPoll(pollData, pollOptions, pollRecipients);
        generatedLink = `expoll.com/poll/${key}`
        buttonIcon.className = 'copy-icon';
        buttonText.innerText = generatedLink;
        generateLinkButton.classList.add("show-text", "show-icon-left");

    } catch (error) {
        buttonIcon.className = 'retry-icon';
        buttonText.innerText = "Retry";
    }
}



function startLoader() {

}

function stopLoader() {

}

function copyToClipboard(link) {
    navigator.clipboard.writeText(link).then(() => {
        alert('Link copied to clipboard!');
    });
}

