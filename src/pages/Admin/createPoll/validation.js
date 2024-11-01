function validateForm() {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const startDate = document.getElementById('poll-start-date');
    const startTime = document.getElementById('poll-start-time');
    const endDate = document.getElementById('poll-end-date');
    const endTime = document.getElementById('poll-end-time');
    const optionInputs = document.querySelectorAll('.options-container-bottom input[type="text"]');

    let isValid = true; 

    if (title.value.trim().length < 5) {
        isValid = false;
        alert('Title must be at least 5 characters.');
        title.classList.add('error');
    } else {
        title.classList.remove('error');
    }

    // Validate description
    if (description.value.trim().length < 10) {
        isValid = false;
        alert('Description must be at least 10 characters.');
        description.classList.add('error');
    } else {
        description.classList.remove('error');
    }

    // Validate date and time fields
    if (!startDate.value || !startTime.value || !endDate.value || !endTime.value) {
        isValid = false;
        alert('Start date, start time, end date, and end time are required.');
        startDate.classList.add('error');
        startTime.classList.add('error');
        endDate.classList.add('error');
        endTime.classList.add('error');
    } else {
        startDate.classList.remove('error');
        startTime.classList.remove('error');
        endDate.classList.remove('error');
        endTime.classList.remove('error');
    }

    // Validate start and end date-time against each other and against the current date-time
    const startDateTime = new Date(`${startDate.value}T${startTime.value}`);
    const endDateTime = new Date(`${endDate.value}T${endTime.value}`);
    const currentDateTime = new Date();

    if (startDateTime < currentDateTime) {
        isValid = false;
        alert('Start date and time cannot be in the past.');
        startDate.classList.add('error');
        startTime.classList.add('error');
    } else {
        startDate.classList.remove('error');
        startTime.classList.remove('error');
    }

    if (endDateTime <= startDateTime) {
        isValid = false;
        alert('End date and time cannot be earlier than start date and time.');
        endDate.classList.add('error');
        endTime.classList.add('error');
    } else {
        endDate.classList.remove('error');
        endTime.classList.remove('error');
    }

    // Validate there are at least 2 options
    const filledOptions = Array.from(optionInputs).filter(input => input.value.trim() !== '');
    if (filledOptions.length < 2) {
        isValid = false;
        alert('Please add at least 2 options.');
        document.querySelector('.options-container-bottom').classList.add('error');
    } else {
        document.querySelector('.options-container-bottom').classList.remove('error');
    }

    return isValid;
}

// Add an event listener to validate and proceed only if the form is valid
export { validateForm }
