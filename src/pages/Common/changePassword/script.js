import { 
    updatePassword, 
    signInWithEmailAndPassword 
  } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
  import { auth } from "../../../backend/firebase/config.js";
  
  document.getElementById("change-password-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const currentPassword = document.getElementById("current-password").value.trim();
    const newPassword = document.getElementById("new-password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");
    const changePasswordBtn = document.getElementById("change-password-btn");
    const buttonText = document.querySelector(".button-text");
    const loader = document.querySelector(".loader");
  
    errorMessage.style.display = "none";
    successMessage.style.display = "none";
  
    if (newPassword.length < 6) {
      errorMessage.textContent = "New password must be at least 6 characters.";
      errorMessage.style.display = "block";
      return;
    }
    if (newPassword !== confirmPassword) {
      errorMessage.textContent = "Passwords do not match.";
      errorMessage.style.display = "block";
      return;
    }
  
    buttonText.style.display = "none";
    loader.style.display = "inline-block";
    changePasswordBtn.disabled = true;
  
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not signed in.");
  
      await signInWithEmailAndPassword(auth, user.email, currentPassword);
  
      await updatePassword(user, newPassword);
  
      successMessage.textContent = "Password updated successfully!";
      successMessage.style.display = "block";
    } catch (error) {
      console.error("Error changing password:", error);
      errorMessage.textContent = error.code === "auth/wrong-password" ? 
        "Incorrect current password." : "Failed to update password. Please try again.";
      errorMessage.style.display = "block";
    } finally {
      buttonText.style.display = "inline";
      loader.style.display = "none";
      changePasswordBtn.disabled = false;
    }
  });
  