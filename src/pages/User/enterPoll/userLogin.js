function readPollRecipients(id) {
    const pollRef = ref(db, `/poll-recipients/${id}`);
   
    get(pollRef).then(snapshot => {
        if (snapshot.exists()) {
            let recipientFound = false; // To track if a matching email was found
            const email = document.getElementById("email").value.trim();
            const emailField = document.getElementById("email");
            emailField.style.borderColor = "#8061C3"; // Reset the border color

            snapshot.forEach(sessionSnapshot => {
                const recipient = sessionSnapshot.val();
                console.log("Checking recipient:", recipient);

                if (!recipient.hasDone && recipient.email === email) {
                    // If the email matches and has not done the poll
                    recipientFound = true;
                    recipient.name = fullName; // Update the name
                    console.log("Updating recipient:", recipient);
                    // Update the recipient with the new name
                    set(ref(db, `/poll-recipients/${id}/${sessionSnapshot.key}`), recipient)
                        .then(() => {
                            // Redirect to castPoll after updating
                            window.location.href = `../castPoll/?email=${encodeURIComponent(email)}&id=${id}`;
                        })
                        .catch(error => {
                            console.error("Error updating recipient:", error);
                        });
                }
            });

            // If no existing record was found
            if (!recipientFound) {
                // Create a new recipient object
                const newRecipient = {
                    name: fullName,
                    email: email,
                    hasDone: false // Set as false since they haven't taken the poll
                };
                // Add the new recipient
                const newRef = ref(db, `/poll-recipients/${id}`).push(); // Use push to create a new record
                set(newRef, newRecipient)
                    .then(() => {
                        // Redirect to castPoll after adding new recipient
                        window.location.href = `../castPoll/?email=${encodeURIComponent(email)}&id=${id}`;
                    })
                    .catch(error => {
                        console.error("Error adding new recipient:", error);
                    });
            }

        } else {
            console.log("No data available");
        }
    }).catch(error => {
        console.error("Error reading poll recipients:", error);
    });
}

function readPollRecipient(id) {
    const pollRef = ref(db, `/poll-recipients/${id}`);
   
    get(pollRef).then(snapshot => {
        if (snapshot.exists()) {
            let recipientFound = false; // To track if a matching email was found
            const email = document.getElementById("email").value.trim();
            const emailField = document.getElementById("email");
            emailField.style.borderColor = "#8061C3"; // Reset the border color

            snapshot.forEach(sessionSnapshot => {
                const recipient = sessionSnapshot.val();
                console.log("Checking recipient:", recipient);

                if (!recipient.hasDone && recipient.email === email) {
                    // If the email matches and has not done the poll
                    recipientFound = true;
                    recipient.name = fullName; // Update the name
                    console.log("Updating recipient:", recipient);
                    // Update the recipient with the new name
                    set(ref(db, `/poll-recipients/${id}/${sessionSnapshot.key}`), recipient)
                        .then(() => {
                            // Redirect to castPoll after updating
                            window.location.href = `../castPoll/?email=${encodeURIComponent(email)}&id=${id}`;
                        })
                        .catch(error => {
                            console.error("Error updating recipient:", error);
                        });
                }
            });

            // If no existing record was found
            if (!recipientFound) {
                // Create a new recipient object
                const newRecipient = {
                    name: fullName,
                    email: email,
                    hasDone: false // Set as false since they haven't taken the poll
                };
                // Add the new recipient
                const newRef = ref(db, `/poll-recipients/${id}`).push(); // Use push to create a new record
                set(newRef, newRecipient)
                    .then(() => {
                        // Redirect to castPoll after adding new recipient
                        window.location.href = `../castPoll/?email=${encodeURIComponent(email)}&id=${id}`;
                    })
                    .catch(error => {
                        console.error("Error adding new recipient:", error);
                    });
            }
        } else {
            console.log("No data available");
        }
    }).catch(error => {
        console.error("Error reading poll recipients:", error);
    });
}
