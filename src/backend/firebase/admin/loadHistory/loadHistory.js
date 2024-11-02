import { app } from '../../../firebase/config.js'; 
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js"; 

const database = getDatabase(app);

// Function to fetch and display poll details with date filter and sorting
async function fetchPollDetailsWithDateFilterAndSearch(sortOrder = 'newest', title = '') {
  const pollDetailsRef = ref(database, 'poll-details');

  try {
    const snapshot = await get(pollDetailsRef);

    if (snapshot.exists()) {
      let data = snapshot.val();

      // Filter polls by title
      if (title) {
        data = Object.keys(data)
          .filter(key => data[key].title?.toLowerCase().includes(title.toLowerCase()))
          .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
          }, {});
      }

      // Apply date filter if enabled
      if (document.getElementById("dateFilterToggle").checked) {
        const fromDate = new Date(document.getElementById("fromDate").value);
        const toDate = new Date(document.getElementById("toDate").value);

        data = Object.keys(data)
          .filter(key => {
            const pollDate = new Date(data[key].startDate);
            return pollDate >= fromDate && pollDate <= toDate;
          })
          .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
          }, {});
      }

      // Sort data based on the selected sort order
      const sortedData = Object.keys(data)
        .map(key => ({ key, ...data[key] }))
        .sort((a, b) => sortOrder === 'newest'
          ? new Date(b.startDate) - new Date(a.startDate)
          : new Date(a.startDate) - new Date(b.startDate)
        )
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
function displayPolls(polls) {
  const container = document.getElementById("activity-box-container");
  container.innerHTML = '';

  Object.keys(polls).forEach(key => {
    const poll = polls[key];
    const activityBox = document.createElement("div");
    activityBox.className = "activityBox";
    activityBox.innerHTML = `
      <div class="icon">
        <img src="/src/assets/icons/rate-icon-solid.png" alt="icon" />
      </div>
      <div class="content">
        <h5>${poll.title || 'Untitled Poll'}</h5>
        <div class="date-and-time" id="date-and-time">
          <img src="/src/assets/icons/calender.png" alt="calendar">
          <h6>${poll.startDate ? new Date(poll.startDate).toLocaleDateString() : 'Date not available'}</h6>
          <img src="/src/assets/icons/clock.png" alt="clock">
          <h6>${poll.startTime || 'Time not available'}</h6>
        </div>
      </div>
    `;
    container.appendChild(activityBox);
  });
}

// Event listeners
document.getElementById("dateFilterToggle").addEventListener("change", () => {
  document.getElementById("dateInputs").style.display = document.getElementById("dateFilterToggle").checked ? "block" : "none";
  fetchPollDetailsWithDateFilterAndSearch(document.getElementById("sortOrder").value, document.getElementById("searchInput").value);
});

document.getElementById("fromDate").addEventListener("change", () => {
  fetchPollDetailsWithDateFilterAndSearch(document.getElementById("sortOrder").value, document.getElementById("searchInput").value);
});
document.getElementById("toDate").addEventListener("change", () => {
  fetchPollDetailsWithDateFilterAndSearch(document.getElementById("sortOrder").value, document.getElementById("searchInput").value);
});
document.getElementById("searchInput").addEventListener("input", (event) => {
  const searchQuery = event.target.value;
  fetchPollDetailsWithDateFilterAndSearch(document.getElementById("sortOrder").value, searchQuery);
});
document.getElementById("sortOrder").addEventListener("change", (event) => {
  const sortOrder = event.target.value;
  const searchQuery = document.getElementById("searchInput").value;
  fetchPollDetailsWithDateFilterAndSearch(sortOrder, searchQuery);
});

// Initial fetch to display all polls on page load
const fetchPoll = fetchPollDetailsWithDateFilterAndSearch();


export { fetchPoll }