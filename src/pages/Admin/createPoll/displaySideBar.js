function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show');
  }


function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('show');
}

document.getElementById('sidebar').addEventListener('mouseleave', closeSidebar);