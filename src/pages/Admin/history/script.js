
window.addEventListener('load', function() {
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


window.onload = function() {
const now = new Date();

const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0'); 
const day = String(now.getDate()).padStart(2, '0');

const defaultDateTime = `${year}-${month}-${day}T00:00`;

document.getElementById('fromDate').value = defaultDateTime;
document.getElementById('toDate').value = defaultDateTime;
};

document.getElementById('refreshButton').addEventListener('click', function() {
location.reload();

});

document.addEventListener("DOMContentLoaded", function () {
            fetch("navbar.html")
                .then(response => response.text())
                .then(data => {
                    document.getElementById("navbar").innerHTML = data;
                })
                .catch(error => console.error("Error loading navbar:", error));
        });


        document.addEventListener("DOMContentLoaded", function () {
            fetch("sidebar.html")
                .then(response => response.text())
                .then(data => {
                    document.getElementById("sidebar").innerHTML = data;
                })
                .catch(error => console.error("Error loading navbar:", error));
        });