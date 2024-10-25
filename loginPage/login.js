// function captureCredentials() {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     console.log('Username:', username);
//     console.log('Password:', password);
//     signInAndUpdateProfile(username, password);

//     return false;
// }

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8MCo957ZjjgF5rQ47uzIi8BVa_SWfPeo",
  authDomain: "expoll-5cb6d.firebaseapp.com",
  databaseURL:"https://expoll-5cb6d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "expoll-5cb6d",
  storageBucket: "expoll-5cb6d.appspot.com",
  messagingSenderId: "676581762842",
  appId: "1:676581762842:web:88c56ced7b66a9d1762ea3",
  measurementId: "G-J4DY55BWS7",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// Login function
document.getElementById("login").addEventListener("click", () => {
  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const password_field = document.getElementById("password");
  password_field.style.borderColor = "#8061C3";
  const email_field = document.getElementById("username");
  email_field.style.borderColor = "#8061C3";
  const error_password = document.getElementById("error-password");
  error_password.style.display = "none";
  if (isValidEmail(email)) {
    console.log("Valid email");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        // Redirect to dashboard
        window.location.href = "../adminDashboard/adminHome.html";
      })
      .catch((error) => {
        console.log("login failed")
        password_field.style.borderColor = "red";
        email_field.style.borderColor = "red";
        error_password.style.display = "block";
      })
      .finally(() => {
        loadingIndicator.style.display = "none"; // Hide loading indicator
      });
  } else {
    email_field.style.borderColor = "red";
    error_email.style.display = "block";
  }
});

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}