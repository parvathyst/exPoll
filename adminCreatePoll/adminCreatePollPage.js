
import { createPoll } from "../firebase/admin/createPoll/createPoll.js"

document.addEventListener('DOMContentLoaded', function () {
    const uploadUser = document.getElementById('uploadUser');
    if (uploadUser) {
        uploadUser.addEventListener('change', handleUser, false);
    }
    document.getElementById('generate-link-button').addEventListener('click', fetchData);
});

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
                jsonData.slice(1).forEach((row) => {
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


function fetchData() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const startDate = document.getElementById('pollStartDate').value;
    const startTime = document.getElementById('pollStartTime').value;
    const endDate = document.getElementById('pollEndDate').value;
    const endTime = document.getElementById('pollEndTime').value;

    const pollOptions = [];
    const optionInputs = document.querySelectorAll('.options-container-bottom input[type="text"]');
    optionInputs.forEach(input => {
        if (input.value) {
            pollOptions.push(input.value);
        }
    });

    const pollRecipients = [];
    const recipientInputs = document.querySelectorAll('.recipient-container input[type="text"]');
    recipientInputs.forEach(input => {
        if (input.value) {
            pollRecipients.push(input.value);
        }
    });

    const isPrivatePoll = document.getElementById('toggleSwitch').checked;

    const pollData = {
        "title": title,
        "description": description,
        "startDate": startDate,
        "startTime": startTime,
        "endDate": endDate,
        "endTime": endTime,
        "isPrivate": isPrivatePoll,
    };


    console.log(pollOptions);
    console.log(pollRecipients);

    createPoll(pollData, pollOptions, pollRecipients);
}

