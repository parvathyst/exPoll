document.addEventListener('DOMContentLoaded', function () {
    const uploadOptions = document.getElementById('upload-options');
    if (uploadOptions) {
        console.log("Document uploaded")
        uploadOptions.addEventListener('change', handleFile, false);
    }
});

function addOption(value) {
    const optionContainer = document.createElement('div');
    optionContainer.classList.add('option-item');
    optionContainer.classList.add('D-black');
    if (value === undefined) {
        optionContainer.innerHTML = `
        <input type="text" placeholder="Enter Option"  class="D-no-border">
        <img src="/src/assets/icons/trash_icon.svg" alt="delete icon" onclick="removeOption(this)" />
        `;
    } else {
        optionContainer.innerHTML = `
        <input type="text" placeholder="Enter Option" value="${value}" class="D-no-border">
        <img src="/src/assets/icons/trash_icon.svg" alt="delete icon" onclick="removeOption(this)" />
        `;
    }
    document.querySelector('.options-container-none').insertAdjacentElement('afterend', optionContainer);
}
function removeOption(button) {
    button.parentElement.remove();
}

function addRecipient(value) {
    const recipientContainer = document.createElement('div');
    recipientContainer.classList.add('recipient-item', 'D-white');

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

    document.querySelector('.recipient-container-none').insertAdjacentElement('afterend', recipientContainer);
}

function removeRecipient(button) {
    button.parentElement.remove();
}



function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file && (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel")) {
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            if (jsonData.length > 0) {
                jsonData.slice(1).forEach((row) => {
                    if (row.length > 0) {
                        addOption(row[0]);
                    }
                });
            } else {
                console.log("Excel sheet is empty")
            }
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert("Excel sheet must be in xlsx format")

    }
}


function clearFields() {
    const clearBtn = document.getElementById('clear-button');
    const buttonIcon = document.getElementById('btn-icon');
    clearBtn.textContent = '';
    buttonIcon.className = 'loader-clear';
    
    const recipientItems = document.querySelectorAll('.recipient-item');
    recipientItems.forEach(item => item.remove());
    const recipientItem = document.querySelectorAll('.option-item');
    recipientItem.forEach(item => item.remove());
    
    
     setTimeout(() => {
        buttonIcon.className = ''; 
        clearBtn.textContent = 'New Poll';

        clearBtn.onclick = () => location.reload();
    }, 1000); 
}

function clearopt(){
    const recipientItem = document.querySelectorAll('.option-item');
    recipientItem.forEach(item => item.remove());
}

function clearrec(){
    const recipientItem = document.querySelectorAll('.recipient-item');
    recipientItem.forEach(item => item.remove());
}