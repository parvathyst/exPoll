
import { fetchNewestPollDetails } from "../../../backend/firebase/admin/loadDashboard/loadDashboard.js";
import { authCheck } from "../../../functions/authentication/authCheck.js";
import { auth } from "../../../backend/firebase/config.js";


// const user = auth.currentUser;
// if (user) {
//     console.log("User is signed in:", user.email);
// } else {
//     console.log("No user is signed in");
// }

let userUID;

async function initialize() {
    try {
        userUID = await authCheck();
        await displayPolls(userUID); 
    } catch (error) {
        console.error("Authentication error:", error);
        window.location.href = "../../error/";
    }
}

async function displayPolls(userUID) {

    const container = document.getElementById("activity-box-container");
    container.innerHTML = '';

    try {
        const polls = await fetchNewestPollDetails(userUID);

        if (polls && Object.keys(polls).length > 0) {
            const sortedPolls = Object.values(polls)
                .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

            sortedPolls.forEach(poll => {
                const activityBox = document.createElement("div");
                activityBox.className = "activity-box";

                activityBox.innerHTML = `
                    <div onclick="window.location.href='/src/pages/Admin/pollDetails/index.html/?id=${poll.id}'" class="content">
                      <h5>${poll.title || 'Untitled Poll'}</h5>
                      <p>${poll.startDate ? new Date(poll.startDate).toLocaleDateString() : 'Date not available'}</p>
                    </div>
                    <div class="icon">
                        <img src="/src/assets/icons/poll-solid.png" alt="icon" />
                    </div>
                `;

                activityBox.onclick = () => {
                    location.href = `../pollDetails/index.html?poll-id=${poll.id}`;
                };

                container.appendChild(activityBox);
            });
        }
        else {
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

initialize();
