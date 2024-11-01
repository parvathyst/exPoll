import { getAdmins } from "../../../backend/firebase/superAdmin/getAdmins.js"


async function displayAdmins(callback) {
    const value = await getAdmins();
    document.getElementById("super-admin-container-bottom").innerHTML = `<div class="admin-items-none"></div>`;
    Object.values(value).forEach(data => {
        const adminItem = document.createElement('div');
        adminItem.classList.add('admin-item');
        adminItem.innerHTML = `
        <div class="admin-details">
                    <strong class = "admin-name">${data.fullName}</strong><br>
                    <span class="admin-email">${data.email}</span>
                </div>
                <div class="action-buttons">
                <button class="view"><img src="../../../assets/icons/pen.png" alt="edit icon"></button>
                <button class="delete-admin-button"><img src="../../../assets/icons/trash.png" alt="delete icon"></button>
                </div>
                `;
        document.querySelector('.super-admin-container-bottom').insertBefore(adminItem, document.querySelector('.admin-items-none'));
    });

    if (callback) callback();
}
export { displayAdmins }