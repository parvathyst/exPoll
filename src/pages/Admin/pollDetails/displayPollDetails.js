function displayPollOptions(pollOptions) {

    if (pollOptions && typeof pollOptions === 'object') {
        const pollOptionsContainer = document.getElementById("poll-options");
        const responsesHeader = document.getElementById("poll-responces");
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


            if (!poll.isSelected) { pollContainer.classList.add("not-selected"); }

            const lef = document.createElement("div");
            lef.classList.add("lef");

            const date = new Date(poll.selectedTime);
            lef.innerHTML = `
                <h4>${poll.content || 'Untitled Poll'}</h4>
                <p>
                    <i class="fa-solid fa-calendar"></i> ${date instanceof Date && !isNaN(date) ? date.toLocaleDateString() : '--'} 
                    <i class="fa-solid fa-clock"></i> ${date instanceof Date && !isNaN(date) ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--'}
                </p>
            `;


            const righ = document.createElement("div");
            righ.classList.add("righ");
            righ.innerHTML = `
                <h5>${poll.selectedUserName || 'Not Selected'}</h5>
                <p>${poll.selectedUserEmail || '.'}</p>
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
        document.getElementById("poll-title").textContent = pollDetails.title || '--- ---';
        document.getElementById("start-date").textContent = pollDetails.startDate || '-- --';
        document.getElementById("srat-time").textContent = pollDetails.startTime || '-- --';
        document.getElementById("end-date").textContent = pollDetails.endDate || '-- --';
        document.getElementById("end-time").textContent = pollDetails.endTime || '-- --';

        document.getElementById("poll-description").textContent = pollDetails.description || '.';
    } else {
        console.log("Poll details are unavailable or data format is incorrect");
    }
}

export { displayPollOptions, displayPollDetails };
