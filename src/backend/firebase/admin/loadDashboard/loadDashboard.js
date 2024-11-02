import { app } from '../../../firebase/config.js'; 
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js"; 

const database = getDatabase(app);

// Function to fetch and display poll details sorted by newest first
async function fetchNewestPollDetails() {
  const pollDetailsRef = ref(database, 'poll-details');

  try {
    const snapshot = await get(pollDetailsRef);

    if (snapshot.exists()) {
      let data = snapshot.val();

      // Sort data by newest first
      const sortedData = Object.keys(data)
        .map(key => ({ key, ...data[key] }))
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        .reduce((obj, item) => {
          obj[item.key] = item;
          return obj;
        }, {});

      displayPolls(sortedData);
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error fetching poll details:", error);
  }
}

// Function to render polls in the HTML container
// Function to render polls in the HTML container
function displayPolls(polls) {
    const container = document.getElementById("activity-box-container");
    container.innerHTML = '';
  
    Object.keys(polls).forEach(key => {
      const poll = polls[key];
      const activityBox = document.createElement("div");
      activityBox.className = "activity-box";  // Updated class name
      activityBox.innerHTML = `
        <div class="content">
          <h5>${poll.title || 'Untitled Poll'}</h5>
          <h6>${poll.startDate ? new Date(poll.startDate).toLocaleDateString() : 'Date not available'}</h6>
        </div>
        <div class="icon">
          <img src="/src/assets/icons/poll-solid.png" alt="icon" />
        </div>
      `;
      container.appendChild(activityBox);
    });
  }
  

// Initial fetch to display all polls in newest first order on page load
fetchNewestPollDetails();
