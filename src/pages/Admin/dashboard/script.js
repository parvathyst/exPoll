import { fetchNewestPollDetails } from "../../../backend/firebase/admin/loadDashboard/loadDashboard.js";
import { authCheck } from "../../../functions/authentication/authCheck.js";

let userUID;

async function initialize() {
    try {
        userUID = await authCheck();
    } catch (error) {
        console.error(error);
        window.location.href = "../../login/";
    }
}

await initialize();

async function displayPolls(userUID) {
    console.log(userUID);
    
    const container = document.getElementById("activity-box-container");
    container.innerHTML = '';
    try {
        const polls = await fetchNewestPollDetails(userUID); // Await the function result
        
        if (polls) {
            // Convert polls to an array and sort by startDate (newest first)
            const sortedPolls = Object.keys(polls)
                .map(key => polls[key])
                .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

            sortedPolls.forEach(poll => {
                const activityBox = document.createElement("div");
                activityBox.className = "activity-box";
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
        } else {
            console.log("No polls to display.");
        }
    } catch (error) {
        console.error("Error displaying polls:", error);
    }
}

displayPolls(userUID);
