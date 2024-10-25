function addOption(value) {
    const optionContainer = document.createElement('div');
    optionContainer.classList.add('option-item');
    optionContainer.classList.add('D-black');
    if (value === undefined) {
        optionContainer.innerHTML = `
        <input type="text" placeholder="Enter Option" class="D-no-border">
        <img  src="icons/trash_icon.svg" alt="delete icon" onclick="removeOption(this)"></img>
`;
    } else {
        optionContainer.innerHTML = `
        <input type="text" placeholder="Enter Option" value="${value}" class="D-no-border">
        <img  src="icons/trash_icon.svg" alt="delete icon" onclick="removeOption(this)"></img>
        `;
    }
    document.querySelector('.options-container-bottom').insertBefore(optionContainer, document.querySelector('.options-container button'));
}

function removeOption(button) {
    button.parentElement.remove();
}

function addRecipient() {
    const recipientContainer = document.createElement('div');
    recipientContainer.classList.add('recipient-item');
    recipientContainer.classList.add('D-white');
    recipientContainer.innerHTML = `
    <input type="email" value="abc@xyz" class="D-no-border">
    <img  src="icons/trash_icon.svg" alt="delete icon" onclick="removeOption(this)"></img>
`;
    document.querySelector('.recipients-container').insertBefore(recipientContainer, document.querySelector('.recipients-container button'));
}

function removeRecipient(button) {
    button.parentElement.remove();
}

///////////////////////////////////

document.getElementById('upload').addEventListener('change', handleFile, false);

function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    // Clear previous error messages and card content
    document.getElementById('error-message').textContent = '';
    document.getElementById('options-container').innerHTML = '';

    if (file && (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel")) {
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Assuming we want the first sheet
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            if (jsonData.length > 0) {
                alert("sss")
                jsonData.forEach((row) => {
                    addOption(row[0]); // Assuming you want to add the first column value from each row as an option
                });                
            } else {
                document.getElementById('error-message').textContent = 'No data found in the Excel file.';
            }
        };

        reader.readAsArrayBuffer(file);
    } else {
        document.getElementById('error-message').textContent = 'Please upload a valid Excel file (.xlsx or .xls).';
    }
}
