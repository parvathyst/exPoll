import { auth } from "../../../backend/firebase/config.js"; 
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

function handleLogout() {
    signOut(auth)
        .then(() => {
            console.log("User signed out successfully");
            window.location.href = "/exPoll/src/pages/common/login/"; 
        })
        .catch((error) => {
            console.error("Error signing out:", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
        logoutLink.addEventListener("click", handleLogout);
    } else {
        console.error("Logout link not found");
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const change = document.getElementById("change-password-link");
    if (change) {
        change.addEventListener("click", () => {
            const htmlPath = "/exPoll/src/pages/Common/changePassword/"; 
            window.location.href = htmlPath; 
        });
    } else {
        console.error("Change link not found");
    }
});

