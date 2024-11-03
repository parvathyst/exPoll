function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.getElementById('togglePassword');
    if (passwordField && toggleIcon) {
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            toggleIcon.src = '../../../assets/icons/eyeopen.svg';
        }
        else {
            passwordField.type = 'password';
            toggleIcon.src = '../../../assets/icons/eyeclose.svg';
        }
    }
}