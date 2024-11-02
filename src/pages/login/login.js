import {
  signInWithEmailAndPassword,
  getIdTokenResult,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

import { auth } from "../../backend/firebase/config.js"

document.getElementById("login").addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const passwordField = document.getElementById("password");
  const emailField = document.getElementById("username");
  const errorPassword = document.getElementById("error-password");

  passwordField.style.borderColor = "#8061C3";
  emailField.style.borderColor = "#8061C3";
  errorPassword.style.display = "none";

  if (isValidEmail(email)) {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const idTokenResult = await getIdTokenResult(user);
        if (idTokenResult.claims.role === 'superadmin') {
          window.location.href = "../SuperAdmins/dashboard";
        } else {
          window.location.href = "../Admin/dashboard";
        }
      })
      .catch((error) => {
        console.log("Login failed");
        passwordField.style.borderColor = "red";
        emailField.style.borderColor = "red";
        errorPassword.style.display = "block";
      });
  } else {
    emailField.style.borderColor = "red";
    document.getElementById("error-email").style.display = "block";
  }
});

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
