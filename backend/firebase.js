  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
  import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC8MCo957ZjjgF5rQ47uzIi8BVa_SWfPeo",
    authDomain: "expoll-5cb6d.firebaseapp.com",
    databaseURL: "https://expoll-5cb6d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "expoll-5cb6d",
    storageBucket: "expoll-5cb6d.appspot.com",
    messagingSenderId: "676581762842",
    appId: "1:676581762842:web:88c56ced7b66a9d1762ea3",
    measurementId: "G-J4DY55BWS7"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase(app);

  export{app,database}