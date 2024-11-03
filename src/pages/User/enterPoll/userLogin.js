


document.getElementById("submit").addEventListener("click", () => {
    // Retrieve the values from the input fields
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;

    // Store the values in an object (optional)
    const userInfo = {
        name: fullName,
        email: email
    };

    // Log the values to the console
    console.log("User Info:", userInfo);
    console.log("Full Name:", fullName);
    console.log("Email Address:", email);
});