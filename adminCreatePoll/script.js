function addOption() {
    const optionContainer = document.createElement('div');
    optionContainer.classList.add('option-item');
    optionContainer.classList.add('D-black');
    optionContainer.innerHTML = `
                    <input type="text" placeholder="Enter Option" class="D-no-border">
                    <img  src="icons/trash_icon.svg" alt="delete icon" onclick="removeOption(this)"></img>
`;
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
