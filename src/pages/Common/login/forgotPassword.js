import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC8MCo957ZjjgF5rQ47uzIi8BVa_SWfPeo",
    authDomain: "expoll-5cb6d.firebaseapp.com",
    projectId: "expoll-5cb6d",
    storageBucket: "expoll-5cb6d.appspot.com",
    messagingSenderId: "676581762842",
    appId: "1:676581762842:web:88c56ced7b66a9d1762ea3",
    measurementId: "G-J4DY55BWS7",
    databaseURL:
      "https://expoll-5cb6d-default-rtdb.asia-southeast1.firebasedatabase.app/",
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();
// Attach event listener for reset button
document.getElementById('reset-btn').addEventListener('click', () => {
    handleResetPassword();
});
// Attach event listener for Enter key
document.getElementById('reset-email').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleResetPassword();
    }
});
function handleResetPassword() {
    const email = document.getElementById('reset-email').value.trim();
    const emailField = document.getElementById('reset-email');
    const errorEmail = document.getElementById('error-reset-email');
    // Clear previous error message
    errorEmail.style.display = 'none';
    if (isValidEmail(email)) {
        // Send password reset email
        sendPasswordResetEmail(auth, email)
            .then(() => {
            // Show success message
            displayMessage("Reset link sent! Please check your email.", "success");
        })
            .catch((error) => {
            // Handle error
            emailField.style.borderColor = 'red';
            errorEmail.style.display = 'block';
            errorEmail.textContent = "Failed to send reset link. Please try again.";
        });
    }
    else {
        emailField.style.borderColor = 'red';
        errorEmail.style.display = 'block';
        errorEmail.textContent = "Invalid Email Address. Please enter a valid email address.";
    }
}
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
function displayMessage(message, type) {
    const messageBox = document.createElement('div');
    messageBox.textContent = message;
    messageBox.className = `message ${type}`;
    document.body.appendChild(messageBox);
    // Remove the message after a few seconds
    setTimeout(() => {
        document.body.removeChild(messageBox);
    }, 3000);
}