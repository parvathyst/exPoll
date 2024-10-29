
function displayAdmin(value) {

    Object.values(value).forEach(data => {


        const adminItem = document.createElement('div');
        adminItem.classList.add('admin-item');
        adminItem.innerHTML = `
        <div class="admin-details">
                    <strong>${data.fullName}</strong><br>
                    <span>${data.email}</span>
                </div>
                <div class="action-buttons">
                <button class="view"><img src="icons/pen.png" alt="edit icon"></button>
                <button class="delete"><img src="icons/trash.png" alt="delete icon"></button>
                </div>
                `;
        document.querySelector('.super-admin-container-bottom').insertBefore(adminItem, document.querySelector('.admin-items-none'));
    });
}