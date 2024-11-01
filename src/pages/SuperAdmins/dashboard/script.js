import { createAdmin } from "../../../backend/firebase/superAdmin/createAdmin.js";
import { deleteAdmin } from "../../../backend/firebase/superAdmin/deleteAdmin.js"
import { displayAdmins } from "./displayAdmins.js";


document.addEventListener("DOMContentLoaded", () => {
    const addAdminPopup = document.getElementById("add-admin-popup");
    const editAdminPopup = document.getElementById("edit-admin-popup");
    const deleteAdminPopup = document.getElementById("delete-admin-popup");
    let emailid;
    let adminName;

    document.getElementById("add-admin-button").addEventListener("click", () => {
        showPopup(addAdminPopup);
    });



    document.querySelectorAll(".cancel-button").forEach(button => {
        button.addEventListener("click", () => {
            hidePopup(addAdminPopup);
            hidePopup(editAdminPopup);
            hidePopup(deleteAdminPopup);
        });
    });

    function showPopup(popup) {
        popup.style.display = "flex";
        setTimeout(() => {
            popup.classList.add("show");
        }, 10);
    }

    function hidePopup(popup) {
        popup.classList.remove("show");
        setTimeout(() => {
            popup.style.display = "none";
        }, 300);
    }

    function showDeletePopUp() {
        document.getElementById("confirm-delete-message-name").innerHTML = adminName
        document.getElementById("confirm-delete-message-email").innerHTML = emailid
        showPopup(deleteAdminPopup);
    }

    document.getElementById('add-admin-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const fullName = document.getElementById('addAdminfullName').value;
        const email = document.getElementById('addAdminemail').value;
        const password = document.getElementById('AddAdminpassword').value;
        await createAdmin(fullName, email, password);
        displayAdmins(attachDeleteListeners);

    });

    document.getElementById("edit-admin-form").addEventListener("submit", (e) => {
        e.preventDefault();
        hidePopup(editAdminPopup);
    });

    document.getElementById("delete-admin-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        if (document.getElementById("confirm-text").value.toLowerCase() === 'confirm') {
            await deleteAdmin(emailid);
            hidePopup(deleteAdminPopup);
        }else{
            alert("dfsdfsd")
        }
    });

    function attachDeleteListeners() {
        document.querySelectorAll(".delete-admin-button").forEach(button => {
            button.addEventListener("click", (event) => {
                emailid = event.target.closest('.admin-item').querySelector(".admin-email").textContent;
                adminName = event.target.closest('.admin-item').querySelector(".admin-name").textContent;
                showDeletePopUp();
            });
        });
    }
    displayAdmins(attachDeleteListeners);
});
