import { createAdmin } from "../../../backend/firebase/superAdmin/createAdmin.js";
import { disableAdminAccount } from "../../../backend/firebase/superAdmin/disableAdmin.js";
import { displayAdmins } from "./displayAdmins.js";
import { updateAdminName } from "../../../backend/firebase/superAdmin/updateAdminName.js";

import { superAdminAuthCheck } from "../../../functions/authentication/authCheck.js";

let userUID;

superAdminAuthCheck()
    .then((uid) => {
        userUID = uid;
    })
    .catch((error) => {
        console.error(error);
        window.location.href = "../../common/error";
    });

document.addEventListener("DOMContentLoaded", () => {
    const addAdminPopup = document.getElementById("add-admin-popup");
    const editAdminPopup = document.getElementById("edit-admin-popup");
    const disableAdminPopup = document.getElementById("disable-admin-popup"); 
    const enableAdminPopup = document.getElementById("enable-admin-popup"); 

    let emailid;
    let adminName;

    document.getElementById("add-admin-button").addEventListener("click", () => {
        showPopup(addAdminPopup);
    });

    document.querySelectorAll(".cancel-button").forEach(button => {
        button.addEventListener("click", () => {
            hidePopup(addAdminPopup);
            hidePopup(editAdminPopup);
            hidePopup(disableAdminPopup);
            hidePopup(enableAdminPopup);
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

    function showDisablePopup() { 
        document.getElementById("confirm-disable-message-name").innerHTML = adminName; 
        document.getElementById("confirm-disable-message-email").innerHTML = emailid; 
        showPopup(disableAdminPopup); 
    }

    function showEnablePopup() { 
        document.getElementById("confirm-enable-message-name").innerHTML = adminName; 
        document.getElementById("confirm-enable-message-email").innerHTML = emailid; 
        showPopup(enableAdminPopup); 
    }

    document.getElementById('add-admin-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const fullName = document.getElementById('addAdminfullName').value;
        const email = document.getElementById('addAdminemail').value;
        const password = document.getElementById('AddAdminpassword').value;
        await createAdmin(fullName, email, password);
        displayAdmins(attachDisableListeners);
    });

    document.getElementById("edit-admin-form").addEventListener("submit", (e) => {
        e.preventDefault();
        hidePopup(editAdminPopup);
    });

    document.getElementById("disable-admin-form").addEventListener("submit", async (e) => { 
        e.preventDefault();
        if (document.getElementById("confirm-text").value.toLowerCase() === 'disable') { 
            await disableAdminAccount(emailid);
            hidePopup(disableAdminPopup);
        } else {
            alert("Please type 'DISABLE' to confirm."); 
        }
    });

    document.getElementById("enable-admin-form").addEventListener("submit", async (e) => { // Add event listener for enabling admin
        e.preventDefault();
        if (document.getElementById("confirm-enable-text").value.toLowerCase() === 'enable') { 
            await enableAdminAccount(emailid); // Call function to enable admin
            hidePopup(enableAdminPopup);
            displayAdmins(attachDisableListeners); // Refresh the admin list after enabling
        } else {
            alert("Please type 'ENABLE' to confirm."); 
        }
    });

    function attachDisableListeners() {
        document.querySelectorAll(".disable-admin-button").forEach(button => { 
            button.addEventListener("click", (event) => {
                emailid = event.target.closest('.admin-item').querySelector(".admin-email").textContent;
                adminName = event.target.closest('.admin-item').querySelector(".admin-name").textContent;
                showDisablePopup(); 
            });
        });

        document.querySelectorAll(".enable-admin-button").forEach(button => { // Add listeners for enabling admin
            button.addEventListener("click", (event) => {
                emailid = event.target.closest('.admin-item').querySelector(".admin-email").textContent;
                adminName = event.target.closest('.admin-item').querySelector(".admin-name").textContent;
                showEnablePopup(); 
            });
        });
    }

    displayAdmins(attachDisableListeners); 
});
