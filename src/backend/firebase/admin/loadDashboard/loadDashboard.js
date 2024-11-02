// Import the necessary functions from Firebase
import { db } from '../../../firebase/config.js';
import { ref, get, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

async function fetchNewestPollDetails(uid) {
  
    try {
        // Ensure uid is defined before proceeding
        if (!uid) {
            throw new Error("User UID is not defined");
        }

        console.log(uid);
        

        // Reference to the poll details in the database
        const pollRef = ref(db, 'poll-details/');
        const q = query(pollRef, orderByChild('createdBy'), equalTo(uid));
        
        // Fetch the data from the database
        const snapshot = await get(q);
        
        // Check if any data was returned
        if (snapshot.exists()) {
            const results = [];
            snapshot.forEach((childSnapshot) => {
                results.push({ id: childSnapshot.key, ...childSnapshot.val() });
            });
            console.log("Fetched polls:", results);
            return results;
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export { fetchNewestPollDetails };
