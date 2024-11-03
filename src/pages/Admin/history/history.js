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

let pollsCache = [];

async function displayPolls(userUID) {
    console.log(userUID);

    const container = document.getElementById("activity-box-container");
    container.innerHTML = '';
    try {
        const polls = await fetchNewestPollDetails(userUID);

        if (polls) {
            pollsCache = Object.keys(polls)
                .map(key => polls[key])
                .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
            renderPolls(pollsCache);
        } else {
            console.log("No polls to display.");
        }
    } catch (error) {
        console.error("Error displaying polls:", error);
    }
}

function renderPolls(polls) {
    const container = document.getElementById("activity-box-container");
    container.innerHTML = '';

    polls.forEach(poll => {
        const activityBox = document.createElement("div");
        activityBox.className = "activityBox";
        activityBox.innerHTML = `
    <div class="icon">
      <img src="/src/assets/icons/rate-icon-solid.png" alt="icon" />

    </div>
    <div>
     <h5>${poll.title || 'Untitled Poll'}</h5>

    <div class="content" >
      <div class="date-and-time" id="date-and-time">
        <img src="/src/assets/icons/calender.png" alt="calendar">
        <h6>${poll.startDate ? new Date(poll.startDate).toLocaleDateString() : 'Start Date not available'}</h6>
        <img src="/src/assets/icons/clock.png" alt="clock">
        <h6>${poll.startTime || 'Start Time not available'}</h6>
      </div>
      <div class="date-and-time" id="end-date-and-time">
        <img src="/src/assets/icons/calender.png" alt="calendar">
        <h6>${poll.endDate ? new Date(poll.endDate).toLocaleDateString() : 'End Date not available'}</h6>
        <img src="/src/assets/icons/clock.png" alt="clock">
        <h6>${poll.endTime || 'End Time not available'}</h6>
      </div>
    </div>
</div>

`;

        activityBox.onclick = () => {
            location.href = `../pollDetails/index.html?poll-id=${poll.id}`;
        };

        container.appendChild(activityBox);
    });
}

document.getElementById('searchInput').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const filteredPolls = pollsCache.filter(poll =>
        poll.title.toLowerCase().includes(query) ||
        (poll.startDate && new Date(poll.startDate).toLocaleDateString().includes(query))
    );
    renderPolls(filteredPolls);
});

document.getElementById('sortOptions').addEventListener('change', (event) => {
    const sortOrder = event.target.value;
    let sortedPolls = [...pollsCache];

    if (sortOrder === "newest") {
        sortedPolls.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    } else if (sortOrder === "oldest") {
        sortedPolls.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    } else if (sortOrder === "endDate") {
        sortedPolls.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    }

    console.log("Sorted Polls:", sortedPolls);
    renderPolls(sortedPolls);
});



function filterPollsByDateRange() {
    const dateFilterEnabled = document.getElementById("dateFilterToggle").checked;
    let filteredPolls = [...pollsCache];

    if (dateFilterEnabled) {
        const fromDateInput = document.getElementById("fromDate").value;
        const toDateInput = document.getElementById("toDate").value;

        const fromDate = new Date(fromDateInput);
        const toDate = new Date(toDateInput);

        filteredPolls = filteredPolls.filter(poll => {
            const pollStartDate = new Date(poll.startDate);
            return pollStartDate >= fromDate && pollStartDate <= toDate;
        });
    }

    renderPolls(filteredPolls);
}


displayPolls(userUID);


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


window.onload = function () {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const defaultDateTime = `${year}-${month}-${day}T00:00`;

    document.getElementById('fromDate').value = defaultDateTime;
    document.getElementById('toDate').value = defaultDateTime;
};

document.getElementById('refreshButton').addEventListener('click', function () {
    location.reload();


});