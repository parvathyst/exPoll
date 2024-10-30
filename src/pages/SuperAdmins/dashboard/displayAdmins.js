import { getAdmins } from "../../../backend/firebase/superAdmin/getAdmins.js"


async function displayAdmins() {
    const value = await getAdmins();
    document.getElementById("super-admin-container-bottom").innerHTML = `<div class="admin-items-none"></div>`;
    Object.values(value).forEach(data => {
        const adminItem = document.createElement('div');
        adminItem.classList.add('admin-item');
        adminItem.innerHTML = `
        <div class="admin-details">
                    <strong>${data.fullName}</strong><br>
                    <span>${data.email}</span>
                </div>
                <div class="action-buttons">
                <button class="view"><img src="../../../assets/icons/pen.png" alt="edit icon"></button>
                <button class="delete"><img src="../../../assets/icons/trash.png" alt="delete icon"></button>
                </div>
                `;
        document.querySelector('.super-admin-container-bottom').insertBefore(adminItem, document.querySelector('.admin-items-none'));
    });
}
export { displayAdmins }