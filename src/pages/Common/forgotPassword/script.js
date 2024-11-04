import { auth } from "../../../backend/firebase/config.js";
import {  sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

const emailInput = document.getElementById("email");
const form = document.getElementById("reset-password-form");
const resetPasswordButton = document.getElementById("reset-password-button");
const loadingSpinner = document.getElementById("loading-spinner");

// Utility function for displaying messages
function displayMessage(message, isError = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = isError ? "error-message" : "success-message";
    messageDiv.textContent = message;
    form.appendChild(messageDiv);

    // Remove message after 5 seconds
    setTimeout(() => messageDiv.remove(), 5000);
}

// Basic email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle form submission
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
        displayMessage("Please enter a valid email address.", true);
        return;
    }

    resetPasswordButton.style.display = "none"; // Hide button
    loadingSpinner.style.display = "block"; // Show loading spinner

    try {
        await sendPasswordResetEmail(auth, email);
        displayMessage("Password reset email sent! Please check your inbox.");
        emailInput.value = ""; // Clear the input field after submission
    } catch (error) {
        let errorMessage = "An error occurred. Please try again.";

        if (error.code === "auth/user-not-found") {
            errorMessage = "No account found with this email address.";
        } else if (error.code === "auth/invalid-email") {
            errorMessage = "Invalid email address.";
        } else if (error.code === "auth/too-many-requests") {
            errorMessage = "Too many requests. Please try again later.";
        }

        displayMessage(errorMessage, true);
    } finally {
        resetPasswordButton.style.display = "block"; // Show button
        loadingSpinner.style.display = "none"; // Hide loading spinner
    }
});