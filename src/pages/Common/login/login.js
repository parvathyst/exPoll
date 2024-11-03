import {
  signInWithEmailAndPassword,
  getIdTokenResult,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

import { auth } from "../../../backend/firebase/config.js";

document.getElementById("login").addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const passwordField = document.getElementById("password");
  const emailField = document.getElementById("username");
  const errorPassword = document.getElementById("error-password");
  const errorEmail = document.getElementById("error-email");
  const loginButton = document.getElementById("login");

  passwordField.style.borderColor = "#8061C3";
  emailField.style.borderColor = "#8061C3";
  errorPassword.style.display = "none";
  errorEmail.style.display = "none";

  if (!isValidEmail(email)) {
    emailField.style.borderColor = "red";
    errorEmail.style.display = "block";
    errorEmail.textContent = "Please enter a valid email address.";
    return;
  }

  loginButton.innerHTML = '<span class="loader"></span> Logging in...';
  loginButton.disabled = true;

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const idTokenResult = await getIdTokenResult(user);

      if (idTokenResult.claims.role === 'superadmin') {
        window.location.href = "../../SuperAdmins/dashboard";
      } else {
        window.location.href = "../../Admin/dashboard";
      }
    })
    .catch((error) => {
      console.log("Login failed:", error);
      passwordField.style.borderColor = "red";
      emailField.style.borderColor = "red";
      errorPassword.style.display = "block";
      errorPassword.textContent = "Invalid email or password.";

      loginButton.innerHTML = "Log in";
      loginButton.disabled = false;
    });
});

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
