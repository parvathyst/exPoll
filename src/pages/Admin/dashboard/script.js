import { fetchNewestPollDetails } from "../../../backend/firebase/admin/loadDashboard/loadDashboard.js";
import { authCheck } from "../../../functions/authentication/authCheck.js"

let userUID;

async function initialize() {
    try {
        userUID = await authCheck();
        return
    } catch (error) {
        console.error(error);
        window.location.href = "../../common/error";
    }
}

await initialize();

async function displayPolls(userUID) {
    console.log(userUID);

    const container = document.getElementById("activity-box-container");
    container.innerHTML = '';
    try {
        const polls = await fetchNewestPollDetails(userUID);
        console.log(polls);

        // Check if polls exist and are not empty
        if (polls && Object.keys(polls).length > 0) {
            Object.keys(polls).forEach(key => {
                const poll = polls[key];
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
            container.style.display = "flex";
            container.style.justifyContent = "center";
            container.style.alignItems = "center";
            container.style.height = "100%";
            container.innerHTML = `<h5 style="text-align: center; color: #555;">No Activities Yet</h5>`;
        }
    } catch (error) {
        console.error("Error displaying polls:", error);
    }
}

displayPolls(userUID);
