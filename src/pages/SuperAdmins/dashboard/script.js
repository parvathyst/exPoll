import { createAdmin } from "../../../backend/firebase/superAdmin/createAdmin.js";
import { changeAdminStatus } from "../../../backend/firebase/superAdmin/changeAdminStatus.js";
import { displayAdmins } from "./displayAdmins.js";
import { updateAdminName } from "../../../backend/firebase/superAdmin/updateAdminName.js";

import { superAdminAuthCheck } from "../../../functions/authentication/authCheck.js";

let userUID;

let generatedLink;

superAdminAuthCheck()
    .then((uid) => {
        userUID = uid;
    })
    .catch((error) => {
        console.error(error);
        alert(error)
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

    function showEditPopup() {
        document.getElementById("confirm-edit-message-name").innerHTML = adminName;
        document.getElementById("confirm-edit-message-email").innerHTML = emailid;
        showPopup(editAdminPopup);
    }

    document.getElementById('add-admin-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const fullName = document.getElementById('addAdminfullName').value;
        const email = document.getElementById('addAdminemail').value;
        const password = document.getElementById('AddAdminpassword').value;
        await createAdmin(fullName, email, password);
        // if(yes){
        //     mail(email,password);
        // }
        displayAdmins(attachListeners);
       
    });

    document.getElementById("disable-admin-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        if (document.getElementById("confirm-text").value.toLowerCase() === 'disable') {
            await changeAdminStatus(emailid, "disabled");
            hidePopup(disableAdminPopup);
            displayAdmins(attachListeners);
        } else {
            alert("Please type 'DISABLE' to confirm.");
        }
    });

    document.getElementById("enable-admin-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        if (document.getElementById("confirm-enable-text").value.toLowerCase() === 'enable') {
            await changeAdminStatus(emailid, "enabled");
            hidePopup(enableAdminPopup);
            displayAdmins(attachListeners);
        } else {
            alert("Please type 'ENABLE' to confirm.");
        }
    });

    document.getElementById("edit-admin-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const newFullName = document.getElementById("edit-admin-fullname").value;
        if (!newFullName) {
            alert("Please enter a new full name.");
            return;
        }
        try {
            await updateAdminName(emailid, newFullName);
            hidePopup(editAdminPopup);
            displayAdmins(attachListeners);
        } catch (error) { console.error("Error updating admin name:", error); }
    });


    function attachListeners() {
        document.querySelectorAll(".disable-admin-button").forEach(button => {
            button.addEventListener("click", (event) => {
                emailid = event.target.closest('.admin-item').querySelector(".admin-email").textContent;
                adminName = event.target.closest('.admin-item').querySelector(".admin-name").textContent;
                showDisablePopup();
            });
        });

        document.querySelectorAll(".enable-admin-button").forEach(button => {
            button.addEventListener("click", (event) => {
                emailid = event.target.closest('.admin-item').querySelector(".admin-email").textContent;
                adminName = event.target.closest('.admin-item').querySelector(".admin-name").textContent;
                showEnablePopup();
            });
        });

        document.querySelectorAll(".edit-admin-button").forEach(button => {
            button.addEventListener("click", (event) => {
                emailid = event.target.closest('.admin-item').querySelector(".admin-email").textContent;
                adminName = event.target.closest('.admin-item').querySelector(".admin-name").textContent;
                showEditPopup();
            });
        });
    }

    displayAdmins(attachListeners);
});


//mail

function sendEmail(toEmail, subject, message) {
    const templateParams = {
        to_email: toEmail,
        subject: subject,
        message: message
    };
  
    emailjs.send('service_bxt3eel', 'template_0mg1p1y', templateParams)
        .then((response) => {
            console.log('Email sent successfully!', response.status, response.text);
        })
        .catch((error) => {
            console.error('Failed to send email:', error);
        });
  }
  
  function mail(email,password) {
        generatedLink = `http://127.0.0.1:5502/src/pages/Common/login`

        console.log(password);
        try {
            const subject = "You are now an admin";
            const message = `

            Welcome to ExPoll !!
             

            Your password to access : ${password}


            Click here --> ${generatedLink} to create new polls.`;
            const toemail = email;
            if (toemail) {
              sendEmail(toemail, subject, message); 
              console.log(`Email sent to: ${toemail}`);
          } else {
              console.warn("Recipient data is missing an email:", toemail);
          }
  
        } catch (error) {
            console.error('Error fetching recipients:', error);
        }
    
  
  };
  