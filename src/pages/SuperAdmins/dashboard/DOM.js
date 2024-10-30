import { createAdmin } from "../../../backend/firebase/superAdmin/createAdmin.js";
import { displayAdmins } from "./displayAdmins.js";

displayAdmins();

document.getElementById('add-admin-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const fullName = document.getElementById('addAdminfullName').value;
    const email = document.getElementById('addAdminemail').value;
    const password = document.getElementById('AddAdminpassword').value;
    await createAdmin(fullName, email, password);
    displayAdmins();
});

document.getElementById('edit-admin-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const fullName = document.getElementById('addAdminfullName').value;
    const email = document.getElementById('addAdminemail').value;
    const password = document.getElementById('AddAdminpassword').value;
    await createAdmin(fullName, email, password);
    displayAdmins();
});

document.getElementById('delete-admin-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const fullName = document.getElementById('addAdminfullName').value;
    const email = document.getElementById('addAdminemail').value;
    const password = document.getElementById('AddAdminpassword').value;
    await createAdmin(fullName, email, password);
    displayAdmins();
});

