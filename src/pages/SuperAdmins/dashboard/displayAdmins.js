import { getAdmins } from "../../../backend/firebase/superAdmin/getAdmins.js";

async function displayAdmins(callback) {
    const value = await getAdmins();
    document.getElementById("super-admin-container-bottom").innerHTML = `<div class="admin-items-none"></div>`;

    Object.values(value).forEach(data => {
        const adminItem = document.createElement('div');
        adminItem.classList.add('admin-item');

        const backgroundColor = data.status === 'disabled' ? 'rgba(150, 150, 150, 0.5)' : 'rgba(240, 240, 240, 1)'; // Slightly dimmer for disabled
        adminItem.style.backgroundColor = backgroundColor;

        const buttonClass = data.status === 'disabled' ? 'enable-admin-button' : 'disable-admin-button';
        const buttonText = data.status === 'disabled' ? 'ENABLE' : 'DISABLE';

        adminItem.innerHTML = `
        <div class="admin-details">
            <strong class="admin-name">${data.fullName}</strong><br>
            <span class="admin-email">${data.email}</span>
        </div>
        <div class="action-buttons">
            <button class="view"><img src="../../../assets/icons/pen.png" alt="edit icon"></button>
            <button class="${buttonClass}">${buttonText}</button>
        </div>
        `;
        document.querySelector('.super-admin-container-bottom').insertBefore(adminItem, document.querySelector('.admin-items-none'));
    });

    if (callback) callback();
}

export { displayAdmins };
