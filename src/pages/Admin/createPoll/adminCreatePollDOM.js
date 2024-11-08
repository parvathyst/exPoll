import { createPoll } from "../../../backend/firebase/admin/createPoll/createPoll.js";
import { validateForm } from "./validation.js";
import { authCheck } from "../../../functions/authentication/authCheck.js";
import { copyToClipboard } from "../../../functions/common/copyToClipBoard.js";

let userUID;
let generatedLink = '';

async function initialize() {
    try {
        userUID = await authCheck();
    } catch (error) {
        console.error(error);
        window.location.href = "../../common/error";
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    const uploadUser = document.getElementById('uploadUser');
    await initialize();

    // Handle Excel file upload
    if (uploadUser) {
        uploadUser.addEventListener('change', handleUser, false);
    }

    // Generate poll link
    document.getElementById('generate-button').addEventListener('click', async function () {
        if (validateForm()) {
            await fetchDataAndGenerateLink();
        } else {
            console.log("Form validation failed. Please fix the highlighted errors.");
        }
    });
});

// Function to add recipients from input or Excel file
function addRecipient(value) {
    const recipientContainer = document.createElement('div');
    recipientContainer.classList.add('recipient-item', 'D-white');
    recipientContainer.innerHTML = `
        <input type="email" value="${value || ''}" placeholder="Enter Email" class="D-no-border">
        <img src="/src/assets/icons/trash_icon.svg" alt="delete icon" onclick="removeRecipient(this)" />
    `;
    document.querySelector('.recipient-container-none').insertAdjacentElement('afterend', recipientContainer);
}

// Remove recipient
function removeRecipient(button) {
    button.parentElement.remove();
}

// Handle Excel file upload and extract emails
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
                jsonData.slice(1).forEach((row, index) => {
                    const email = row[1]; // Assuming the second column contains the email
                    if (isValidEmail(email)) {
                        addRecipient(email);
                    } else {
                        console.warn(`Invalid or missing email at row ${index + 2}`);
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

// Validate email format
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Generate poll link and send emails
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
    const startTimeInput = document.getElementById('poll-start-time').value;
    const endDate = document.getElementById('poll-end-date').value;
    const endTimeInput = document.getElementById('poll-end-time').value;
    
    const startDateTime = new Date(`${startDate}T${startTimeInput}`);
    const endDateTime = new Date(`${endDate}T${endTimeInput}`);
    

    let pollOptions = {};
    const optionInputs = document.querySelectorAll('.options-container-bottom input[type="text"]');
    optionInputs.forEach((input, index) => {
        if (input.value) {
            pollOptions[index] = {
                content: input.value,
                isSelected: false,
                selectedUserEmail: "",
                selectedUserName: "",
                selectedTime: ""
            };
        }
    });

    let pollRecipients = {};
    const recipientInputs = document.querySelectorAll('.recipient-container-bottom input[type="email"]');
    recipientInputs.forEach((input, index) => {
        if (input.value) {
            pollRecipients[index] = {
                email: input.value,
                hasDone: false,
            };
        }
    });

    const isPrivatePoll = document.getElementById('toggleSwitch').checked;
    const dateTime = new Date().toLocaleString();

    const pollData = {
        title: title,
        description: description,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        isPrivatePoll: isPrivatePoll,
        createdBy: userUID,
        createdAt: dateTime,
    };

    try {
        const key = await createPoll(pollData, pollOptions, pollRecipients);
        pop(pollData, pollRecipients);
        generatedLink = `expoll.com/poll/?id=${key}`;
        buttonIcon.className = 'copy-icon';
        buttonText.innerText = generatedLink;
        generateLinkButton.classList.add("show-text", "show-icon-left");
    } catch (error) {
        console.error(error);
        buttonIcon.className = 'retry-icon';
        buttonText.innerText = "Retry";
    }
}
