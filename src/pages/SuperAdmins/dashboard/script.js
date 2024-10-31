const addAdminPopupButton = document.getElementById('add-admin-button');
const editAdminPopupButton = document.getElementById('edit-admin-button');
const deleteAdminPopupButton = document.getElementById('delete-admin-button');
const addAdminPopupMenu = document.getElementById('add-admin-popup');
const editAdminPopupMenu = document.getElementById('edit-admin-popup');
const deleteAdminPopupMenu = document.getElementById('delete-admin-popup');
const cancelBtn = document.getElementById('cancelBtn');

addAdminPopupButton.addEventListener('click', function () {
    addAdminPopupMenu.style.display = 'flex';
});

editAdminPopupButton.addEventListener('click', function () {
    editAdminPopupMenu.style.display = 'flex';
});

deleteAdminPopupButton.addEventListener('click', function () {
    deleteAdminPopupMenu.style.display = 'flex';
});

function cancel() {

}

window.addEventListener('click', function (event) {
    if (event.target === popupForm) {
        popupForm.style.display = 'none';
    }
});

// function displayAdmin(value) {
//     const adminItem = document.createElement('div');
//     adminItem.classList.add('admin-item');
//     adminItem.innerHTML = `
//         <div class="admin-details">
//                     <strong>${value.name}</strong><br>
//                     <span>${value.email}</span>
//                 </div>
//                 <div class="action-buttons">
//                     <button class="view"><img src="icons/pen.png" alt="edit icon"></button>
//                     <button class="delete"><img src="icons/trash.png" alt="delete icon"></button>
//                 </div>
//         `;
//     document.querySelector('.options-container-bottom').insertBefore(optionContainer, document.querySelector('.options-container button'));
// }

// export default displayAdmin;