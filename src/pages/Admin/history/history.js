import { fetchNewestPollDetails } from "../../../backend/firebase/admin/loadDashboard/loadDashboard.js";
import { authCheck } from "../../../functions/authentication/authCheck.js";

let userUID;

// Initialize user authentication
async function initialize() {
    try {
        userUID = await authCheck();
    } catch (error) {
        console.error(error);
        window.location.href = "../../Common/error/";
    }
}

await initialize();

let pollsCache = [];
// Fetch and display polls
async function displayPolls(userUID) {
    console.log("User UID:", userUID);
    const container = document.getElementById("activity-box-container");
    container.innerHTML = '';

    try {
        const polls = await fetchNewestPollDetails(userUID);

        if (polls) {
            pollsCache = Object.keys(polls)
                .map(key => ({
                    ...polls[key],
                    // id: key // Include poll ID for redirection
                }))
                .sort((a, b) => new Date(b.startDateTime) - new Date(a.startDateTime));

             renderPolls(polls);

        } else {
            console.log("No polls to display.");
        }
    } catch (error) {
        console.error("Error displaying polls:", error);
    }
}

// Render polls with 24-hour format
function renderPolls(polls) {
    const container = document.getElementById("activity-box-container");
    container.innerHTML = '';

    polls.forEach(poll => {
        const startDateTime = poll.startDateTime ? new Date(poll.startDateTime).toLocaleString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }) : 'Start Date not available';

        const endDateTime = poll.endDateTime ? new Date(poll.endDateTime).toLocaleString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }) : 'End Date not available';

        const activityBox = document.createElement("div");
        activityBox.className = "activityBox";
        activityBox.innerHTML = `
            <div class="icon">
                <img src="../../../assets/icons/poll-solid.png" alt="icon" />
            </div>
            <div onclick="window.location.href='../pollDetails/index.html?poll-id=${poll.id}'">
                <h5>${poll.description || 'Untitled Poll'}</h5>
                <div class="content">
                    <div class="date-and-time">
                        <img src="../../../assets/icons/calender.png" alt="calendar">
                        <p>${startDateTime}</p>
                    </div>
                    <div class="date-and-time">
                        <img src="../../../assets/icons/calender.png" alt="calendar">
                        <p>${endDateTime}</p>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(activityBox);
    });
}

// Search filter
document.getElementById('searchInput').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const filteredPolls = pollsCache.filter(poll =>
        poll.description.toLowerCase().includes(query) ||
        (poll.startDateTime && new Date(poll.startDateTime).toLocaleDateString("en-GB").includes(query))
    );
    renderPolls(filteredPolls);
});

// Sorting function
document.getElementById('sortOptions').addEventListener('change', (event) => {
    const sortOrder = event.target.value;
    let sortedPolls = [...pollsCache];

    if (sortOrder === "newest") {
        sortedPolls.sort((a, b) => new Date(b.startDateTime) - new Date(a.startDateTime));
    } else if (sortOrder === "oldest") {
        sortedPolls.sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));
    } else if (sortOrder === "endDate") {
        sortedPolls.sort((a, b) => new Date(a.endDateTime) - new Date(b.endDateTime));
    }

    renderPolls(sortedPolls);
});

// Date range filter
function filterPollsByDateRange() {
    const dateFilterEnabled = document.getElementById("dateFilterToggle").checked;
    let filteredPolls = [...pollsCache];

    if (dateFilterEnabled) {
        const fromDateInput = document.getElementById("fromDate").value;
        const toDateInput = document.getElementById("toDate").value;

        const fromDate = new Date(fromDateInput);
        const toDate = new Date(toDateInput);

        filteredPolls = filteredPolls.filter(poll => {
            const pollStartDate = new Date(poll.startDateTime);
            return pollStartDate >= fromDate && pollStartDate <= toDate;
        });
    }

    renderPolls(filteredPolls);
}

document.getElementById("filterButton").addEventListener("click", filterPollsByDateRange);

window.addEventListener('load', function () {
    const fromDateInput = document.getElementById("fromDate");
    const toDateInput = document.getElementById("toDate");
    const toggle = document.getElementById("dateFilterToggle");

    function updateDateInputs() {
        if (toggle.checked) {
            fromDateInput.disabled = false;
            toDateInput.disabled = false;
        } else {
            fromDateInput.disabled = true;
            toDateInput.disabled = true;
            fromDateInput.value = '';
            toDateInput.value = '';
        }
    }

    updateDateInputs();
    toggle.addEventListener("change", updateDateInputs);
});

const toggleSwitch = document.getElementById("dateFilterToggle");
const filterButton = document.getElementById("filterButton");

// Change filter button color based on toggle state
function handleToggleChange() {
    filterButton.style.backgroundColor = toggleSwitch.checked ? "#0c1e31" : "#a3a9b8";
}

toggleSwitch.addEventListener("change", handleToggleChange);

// Initial display of polls
displayPolls(userUID);

document.getElementById('refreshButton').addEventListener('click', () => {
    location.reload(); // Refresh the page
});