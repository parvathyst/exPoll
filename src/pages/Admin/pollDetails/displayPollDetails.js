function displayPollOptions(pollOptions) {


    if (pollOptions && typeof pollOptions === 'object') {


        const pollOptionsContainer = document.getElementById("poll-options");
        const responsesHeader = document.getElementById("poll-responces");

        console.log(pollOptions);
        pollOptionsContainer.innerHTML = "";

        const selectedCount = Object.values(pollOptions).filter(poll => poll.isSelected).length;

        responsesHeader.innerHTML = `
        <h4 class="responses-header">
            <i class="fa-solid fa-users"></i> 
            Responses 
            <span class="selected-count">( ${selectedCount} )</span>
        </h4>`;
    
        Object.keys(pollOptions).forEach((key) => {
            const poll = pollOptions[key];
            const pollContainer = document.createElement("div");
            pollContainer.classList.add("elements");

            const lef = document.createElement("div");
            lef.classList.add("lef");
            lef.innerHTML = `
                <h4>${poll.content || 'Untitled Poll'}</h4>
                <p><i class="fa-solid fa-calendar"></i> ${poll.selectedDate || 'Unknown Date'} <i class="fa-solid fa-clock"></i> ${poll.selectedTime || 'Unknown Time'}</p>
            `;

            const righ = document.createElement("div");
            righ.classList.add("righ");
            righ.innerHTML = `
                <h5>${poll.name || 'Unknown User'}</h5>
                <p>${poll.assignedEmployee || '.'}</p>
            `;
            pollContainer.appendChild(lef);
            pollContainer.appendChild(righ);
            pollOptionsContainer.appendChild(pollContainer);
        });
    } else {
        console.log("No poll options available or data format is incorrect");
    }
}

function displayPollDetails(pollDetails) {
    if (pollDetails && typeof pollDetails === 'object') {
        document.getElementById("poll-title").textContent = pollDetails.title || 'poll title';

        document.getElementById("start-date").textContent = pollDetails.startDate || 'start date';
        document.getElementById("srat-time").textContent = pollDetails.startTime || 'start time';
        document.getElementById("end-date").textContent = pollDetails.endDate || 'end date';
        document.getElementById("end-time").textContent = pollDetails.endTime || 'ed time';

        document.getElementById("poll-description").textContent = pollDetails.description || 'No description';

    } else {
        console.log("Poll details are unavailable or data format is incorrect");
    }
}

export { displayPollOptions, displayPollDetails };
