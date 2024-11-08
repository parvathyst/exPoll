
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