import { createPoll } from "../../../backend/firebase/admin/createPoll/createPoll.js"
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

    if (uploadUser) {
        uploadUser.addEventListener('change', handleUser, false);
    }

    document.getElementById('generate-button').addEventListener('click', async function () {
        if (validateForm()) {
            await fetchDataAndGenerateLink();
        } else {
            console.log("Form validation failed. Please fix the highlighted errors.");
        }
    });
});

function addRecipient(value) {
    const recipientContainer = document.createElement('div');
    recipientContainer.classList.add('recipient-item', 'D-white');
    recipientContainer.innerHTML = `
        <input type="email" value="${value || ''}" placeholder="Enter Email" class="D-no-border">
        <img src="/exPoll/src/assets/icons/trash_icon.svg" alt="delete icon" onclick="removeRecipient(this)" />
    `;
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
                jsonData.slice(1).forEach((row, index) => {
                    const email = row[1]; 
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

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

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

    const startDateTime = new Date(`${startDate}T${startTimeInput}`).toLocaleString();
    const endDateTime = new Date(`${endDate}T${endTimeInput}`).toLocaleString();


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
        else{
            pollRecipients[index] = {
                email: "",
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

    console.log(pollData);

    try {
        const key = await createPoll(pollData, pollOptions, pollRecipients);
        pop(pollData, pollRecipients);
        generatedLink = `https://parvathyst.github.io/exPoll/src/pages/User/enterPoll/?id=${key}`;
        buttonIcon.className = 'copy-icon';
        buttonText.innerText = generatedLink;
        generateLinkButton.classList.add("show-text", "show-icon-left");
    } catch (error) {
        console.error(error);
        buttonIcon.className = 'retry-icon';
        buttonText.innerText = "Retry";
    }
}

function sendEmail(toEmail, subject, message) {
    const templateParams = {
        to_email: toEmail,
        subject: subject,
        message: message
    };

    emailjs.send('service_3oe3rm8', 'template_w6t6b5h', templateParams)
        .then((response) => {
            console.log('Email sent successfully!', response.status, response.text);
        })
        .catch((error) => {
            console.error('Failed to send email:', error);
        });
}

function showPopup() {
    document.getElementById("myPopup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function hidePopup() {
    document.getElementById("myPopup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

function pop(pollData, pollRecipients) {
    showPopup();

    document.getElementById("send-email").addEventListener("click", function () {
        hidePopup();
        try {
            const subject = pollData.title;
            const message = `
            <p>${pollData.description}</p>
            <p><strong>Link to access poll:</strong> <a href="${generatedLink}" target="_blank">${generatedLink}</a></p>
            <p>Poll will be open:</p>
            <ul>
                <li><strong>From:</strong> ${pollData.startDateTime}</li>
                <li><strong>To:</strong> ${pollData.endDateTime}</li>
            </ul>
        `;
            // const message = `
            //     ${pollData.description}

            //     Link to access poll: ${generatedLink}

            //     Poll will be open 

            //     from: ${pollData.startDateTime}
                
            //     to: ${pollData.endDateTime} 
            // `;

            Object.keys(pollRecipients).forEach(key => {
                const data = pollRecipients[key];
                if (data && data.email) {
                    sendEmail(data.email, subject, message);
                    console.log(`Email sent to: ${data.email}`);
                } else {
                    console.warn("Recipient data is missing an email:", data);
                }
            });

        } catch (error) {
            console.error('Error fetching recipients:', error);
        }
    });

    document.getElementById("cancel-email").addEventListener("click", function () {
        hidePopup();
    });
}
