function addOption() {
    const optionContainer = document.createElement('div');
    optionContainer.classList.add('option-item');
    optionContainer.innerHTML = `
    <input type="text" value="New Option">
    <button onclick="removeOption(this)">Delete</button>
`;
    document.querySelector('.options-container').insertBefore(optionContainer, document.querySelector('.options-container button'));
}

function removeOption(button) {
    button.parentElement.remove();
}

function addRecipient() {
    const recipientContainer = document.createElement('div');
    recipientContainer.classList.add('recipient-item');
    recipientContainer.innerHTML = `
    <input type="email" placeholder="New Email">
    <button onclick="removeRecipient(this)">Delete</button>
`;
    document.querySelector('.recipients-container').insertBefore(recipientContainer, document.querySelector('.recipients-container button'));
}

function removeRecipient(button) {
    button.parentElement.remove();
}
