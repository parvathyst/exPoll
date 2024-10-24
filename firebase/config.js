import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC8MCo957ZjjgF5rQ47uzIi8BVa_SWfPeo",
    authDomain: "expoll-5cb6d.firebaseapp.com",
    projectId: "expoll-5cb6d",
    storageBucket: "expoll-5cb6d.appspot.com",
    messagingSenderId: "676581762842",
    appId: "1:676581762842:web:88c56ced7b66a9d1762ea3",
    measurementId: "G-J4DY55BWS7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;