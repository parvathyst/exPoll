// Get DOM elements
const openPopupBtn = document.getElementById('openPopupBtn');
const popupForm = document.getElementById('popupForm');
const cancelBtn = document.getElementById('cancelBtn');

// Open the popup form when the button is clicked
openPopupBtn.addEventListener('click', function() {
    popupForm.style.display = 'flex';
});

// Close the popup when the "Cancel" button is clicked
cancelBtn.addEventListener('click', function() {
    popupForm.style.display = 'none';
});

// Optional: Close the popup when the user clicks outside the form content
window.addEventListener('click', function(event) {
    if (event.target === popupForm) {
        popupForm.style.display = 'none';
    }
});
