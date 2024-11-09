


// import { fetchNewestPollDetails } from "../../../backend/firebase/admin/loadDashboard/loadDashboard.js";
// import { authCheck } from "../../../functions/authentication/authCheck.js";
// import { auth } from "../../../backend/firebase/config.js";

// let userUID;

// // Initialize user authentication and fetch polls
// async function initialize() {
//     try {
//         userUID = await authCheck();
//         await displayPolls(userUID);
//     } catch (error) {
//         console.error("Authentication error:", error);
//         window.location.href = "../../Common/error/";
//     }
// }

// // Fetch and display polls with 24-hour format
// async function displayPolls(userUID) {
//     const container = document.getElementById("activity-box-container");
//     container.innerHTML = '';

//     try {
//         // Fetch polls data from Firebase
//         const polls = await fetchNewestPollDetails(userUID);

//         if (polls && Object.keys(polls).length > 0) {
//             // Map polls with their IDs intact and sort by startDateTime
//             const sortedPolls = Object.entries(polls)
//                 .map(([id, poll]) => ({
//                     ...poll,
//                     id
//                 }))
//                 .sort((a, b) => new Date(b.startDateTime) - new Date(a.startDateTime)); // Sort by newest first


//                console.log(sortedPolls) 
//             sortedPolls.forEach(poll => {
//                 const startDateTime = poll.startDateTime
//                     ? new Date(poll.startDateTime).toLocaleString("en-GB", {
//                         year: "numeric",
//                         month: "2-digit",
//                         day: "2-digit",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                         hour12: false
//                     })
//                     : 'Date not available';

//                 // Create activity box for each poll
//                 const activityBox = document.createElement("div");
//                 activityBox.className = "activity-box";

//                 activityBox.innerHTML = `
//                     <div onclick="window.location.href='../pollDetails/index.html?poll-id=${poll.id}'" class="content">
//                         <h5>${poll.title || 'Untitled Poll'}</h5>
//                         <p>${startDateTime}</p>
//                     </div>
//                     <div class="icon">
//                         <img src="/src/assets/icons/poll-solid.png" alt="icon" />
//                     </div>
//                 `;

//                 // Add click event for redirection
//                 activityBox.onclick = () => {
//                     location.href = `../pollDetails/index.html?poll-id=${poll.id}`;
//                 };

//                 container.appendChild(activityBox);
//             });
//         } else {
//             // Display "No Activities Yet" if no polls exist
//             console.log("No polls to display.");
//             container.style.display = "flex";
//             container.style.justifyContent = "center";
//             container.style.alignItems = "center";
//             container.style.height = "100%";
//             container.innerHTML = `<h5 style="text-align: center; color: #555;">No Activities Yet</h5>`;
//         }
//     } catch (error) {
//         console.error("Error displaying polls:", error);
//     }
// }

// // Initialize the application
// initialize();

import { fetchNewestPollDetails } from "../../../backend/firebase/admin/loadDashboard/loadDashboard.js";
import { authCheck } from "../../../functions/authentication/authCheck.js";

let userUID;

// Initialize user authentication and fetch polls
async function initialize() {
    try {
        userUID = await authCheck();
        await displayPolls(userUID);
    } catch (error) {
        console.error("Authentication error:", error);
        window.location.href = "../../Common/error/";
    }
}

// Fetch and display polls with 24-hour format
async function displayPolls(userUID) {
    const container = document.getElementById("activity-box-container");
    container.innerHTML = '';

    try {
        // Fetch polls data from Firebase
        const polls = await fetchNewestPollDetails(userUID);

        if (polls && Object.keys(polls).length > 0) {
            // Sort polls by startDateTime without altering poll IDs
            const sortedPolls = Object.entries(polls)
                .sort(([, pollA], [, pollB]) => new Date(pollB.startDateTime) - new Date(pollA.startDateTime));

            // Render the sorted polls
            sortedPolls.forEach(([id, poll]) => {
                const startDateTime = poll.startDateTime
                    ? new Date(poll.startDateTime).toLocaleString("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    })
                    : 'Date not available';

                // Create activity box for each poll
                const activityBox = document.createElement("div");
                activityBox.className = "activity-box";

                activityBox.innerHTML = `
                    <div onclick="window.location.href='../pollDetails/index.html?poll-id=${poll.id}'" class="content">
                        <h5>${poll.title || 'Untitled Poll'}</h5>
                        <p>${startDateTime}</p>
                    </div>
                    <div class="icon">
                        <img src="/src/assets/icons/poll-solid.png" alt="icon" />
                    </div>
                `;

                // Add click event for redirection
                activityBox.onclick = () => {
                    location.href = `../pollDetails/index.html?poll-id=${poll.id}`;
                };

                container.appendChild(activityBox);
            });
        } else {
            // Display "No Activities Yet" if no polls exist
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

// Initialize the application
initialize();
