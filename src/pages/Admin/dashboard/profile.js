function toggleDropdown() {
    const dropdown = document.getElementById("user-dropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

window.onclick = function(event) {
    if (!event.target.matches('.user-icon-black')) {
        const dropdown = document.getElementById("user-dropdown");
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        }
    }
}

function logout() {
    // Add logout functionality here
    alert("Logging out...");
}

function changePassword() {
    // Add change password functionality here
    alert("Redirecting to change password...");
}
