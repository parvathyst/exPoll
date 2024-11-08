import { fetchNewestPollDetails } from "../../../backend/firebase/admin/loadDashboard/loadDashboard.js";
import { authCheck } from "../../../functions/authentication/authCheck.js";

let userUID;

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
      <img src="../../../assets/icons/poll-solid.png" alt="icon" />

    </div>
    <div  onclick="window.location.href='../pollDetails/index.html?poll-id=${poll.id}'">
     <h5>${poll.title || 'Untitled Poll'}</h5>

    <div class="content"  >
      <div class="date-and-time" id="date-and-time">
        <img src="../../../assets/icons/calender.png" alt="calendar">
        <p>${poll.startDate ? new Date(poll.startDate).toLocaleDateString() : 'Start Date not available'}</p>
        <img src="../../../assets/icons/clock.png" alt="clock">
        <p>${poll.startTime || 'Start Time not available'}</p>
      </div>
      <div class="date-and-time" id="end-date-and-time">
        <img src="../../../assets/icons/calender.png" alt="calendar">
        <p>${poll.endDate ? new Date(poll.endDate).toLocaleDateString() : 'End Date not available'}</p>
        <img src="../../../assets/icons/clock.png" alt="clock">
        <p>${poll.endTime || 'End Time not available'}</p>
      </div>
    </div>
</div>

`;
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


window.addEventListener('load', function() {
    const fromDateInput = document.getElementById("fromDate");
    const toDateInput = document.getElementById("toDate");
    const toggle = document.getElementById("dateFilterToggle");
    const button = document.getElementById("filterButton");
   

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

function handleToggleChange() {
    if (toggleSwitch.checked) {
        filterButton.style.backgroundColor = "#0c1e31";

    } else {
        filterButton.style.backgroundColor = "#a3a9b8";
    }
}

toggleSwitch.addEventListener("change", handleToggleChange);

    
    

   
  