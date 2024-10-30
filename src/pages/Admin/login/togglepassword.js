function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.getElementById('togglePassword');
    if (passwordField && toggleIcon) {
        if (passwordField.type === 'password') { console.log("hi");
        
            passwordField.type = 'text';
            toggleIcon.src = '../../../assets/icons/eyeopen.svg'; // Change to open eye icon
            // toggleIcon.title = 'Hide Password'; // Optional: accessibility improvement
        }
        else {
            passwordField.type = 'password';
            toggleIcon.src = '../../../assets/icons/eyeclose.svg'; // Change back to closed eye icon
            // toggleIcon.title = 'Show Password'; // Optional: accessibility improvement
        }
    }
}