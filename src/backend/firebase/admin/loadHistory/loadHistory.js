
import { app } from '../../../firebase/config.js'; 
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js"; 

const database = getDatabase(app);

async function fetchPollDetails() {
  const pollDetailsRef = ref(database, 'poll-details');

  try {
  
    const snapshot = await get(pollDetailsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("Poll Details Data:", data);

      const container = document.getElementById("activity-box-container");
      container.innerHTML = ''; 

      Object.keys(data).forEach(key => {
        const poll = data[key];

        // Create card container for each poll
        const activityBox = document.createElement("div");
        activityBox.className = "activityBox";

        // Construct inner HTML based on the template you provided
        activityBox.innerHTML = `
          <div class="icon">
            <img src="/src/assets/icons/rate-icon-solid.png" alt="icon" />
          </div>
          <div class="content">
            <h5>${poll.title || 'Untitled Poll'}</h5>
            <div class="date-and-time" id="date-and-time">
              <img src="/src/assets/icons/calender.png" alt="calendar">
              <h6>${poll.createdAt ? new Date(poll.createdAt).toLocaleDateString() : 'Date not available'}</h6>
              <img src="/src/assets/icons/clock.png" alt="clock">
              <h6>${poll.createdAt ? new Date(poll.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Time not available'}</h6>
            </div>
          </div>
        `;

        // Append the card to the container
        container.appendChild(activityBox);
      });
    } else {
      console.log("No data available");
    }

  } catch (error) {
    console.error("Error fetching poll details:", error);
  }
}

fetchPollDetails();
