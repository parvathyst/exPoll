
import { createPoll } from "../../../backend/firebase/admin/createPoll/createPoll.js"
import { validateForm } from "./validation.js";
import { authCheck } from "../../../functions/authentication/authCheck.js"



let userUID;

async function initialize() {
    try {
        userUID = await authCheck();
        return
    } catch (error) {
        console.error(error);
        window.location.href = "../../login/";
    }
}



document.addEventListener('DOMContentLoaded', async function () {
    const uploadUser = document.getElementById('uploadUser');

    await initialize();

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
            <img src="/src/assets/icons/trash_icon.svg" alt="delete icon" onclick="removeRecipient(this)" />
        `;
    } else {
        recipientContainer.innerHTML = `
            <input type="email" value="${value}" class="D-no-border">
            <img src="/src/assets/icons/trash_icon.svg" alt="delete icon" onclick="removeRecipient(this)" />
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
                content: input.value,
                assignedEmployee: "",
                isSelected: false,
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
                hasDone: false,
            };
        }
    });
    console.log(recipientInputs);
    const isPrivatePoll = document.getElementById('toggleSwitch').checked;
    const dateTime = new Date().toLocaleString();

    const pollData = {
        title: title,
        description: description,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        isPrivatePoll: isPrivatePoll,
        createdBy: userUID,
        createdAt: dateTime,
    };

    try {
        const key = await createPoll(pollData, pollOptions, pollRecipients);
        pop(pollData, pollRecipients);
        generatedLink = `expoll.com/poll/?id=${key}`
        buttonIcon.className = 'copy-icon';
        buttonText.innerText = generatedLink;
        generateLinkButton.classList.add("show-text", "show-icon-left");

    } catch (error) {
        buttonIcon.className = 'retry-icon';
        buttonText.innerText = "Retry";
    }
}


function copyToClipboard(link) {
    navigator.clipboard.writeText(link).then(() => {
        alert('Link copied to clipboard!');
    });
}


function sendEmail(toEmail, subject, message) {
    const templateParams = {
        to_email: toEmail,
        subject: subject,
        message: message
    };

    emailjs.send('service_bxt3eel', 'template_0mg1p1y', templateParams)
        .then((response) => {
            console.log('Email sent successfully!', response.status, response.text);
        })
        .catch((error) => {
            console.error('Failed to send email:', error);
        });
}

function showPopup() {
    document.getElementById("myPopup").style.display = "block";
}

function hidePopup() {
    document.getElementById("myPopup").style.display = "none";
}

function pop(pollData, pollRecipients) {
    showPopup();
    document.getElementById("send-email").addEventListener("click", function () {
        hidePopup();
        try {
            const subject = pollData.title;
            const message = `
            ${pollData.description}
        
            Link to access poll: ${generatedLink}
        
            Poll will be open from:
            ${pollData.startDate} [${pollData.startTime}] to ${pollData.endDate} [${pollData.endTime}]
        `;


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

};


