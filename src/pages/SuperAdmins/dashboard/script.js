import { createAdmin } from "../../../backend/firebase/superAdmin/createAdmin.js";
import { displayAdmins } from "./displayAdmins.js";

displayAdmins();

document.addEventListener("DOMContentLoaded", () => {
    const addAdminPopup = document.getElementById("add-admin-popup");
    const editAdminPopup = document.getElementById("edit-admin-popup");
    const deleteAdminPopup = document.getElementById("delete-admin-popup");

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

    document.getElementById('add-admin-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const fullName = document.getElementById('addAdminfullName').value;
        const email = document.getElementById('addAdminemail').value;
        const password = document.getElementById('AddAdminpassword').value;
        await createAdmin(fullName, email, password);
        displayAdmins();
    });

    document.getElementById("edit-admin-form").addEventListener("submit", (e) => {
        e.preventDefault();
        hidePopup(editAdminPopup);
    });

    document.getElementById("delete-admin-form").addEventListener("submit", (e) => {
        e.preventDefault();
        hidePopup(deleteAdminPopup);
    });
});
