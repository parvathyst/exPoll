function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show');
  }


function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('show');
}

document.getElementById('sidebar').addEventListener('mouseleave', closeSidebar);

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