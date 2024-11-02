// Firebase import and initialization
import { app } from '../../../backend/firebase/config.js';
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const database = getDatabase();

// Function to fetch recipients from Firebase
function fetchRecipients() {
  return new Promise((resolve, reject) => {
    const parentRef = ref(database, 'poll-recipients/-OAM5Lf-y8N9-lFTFck0');
    get(parentRef).then(snapshot => {
      const recipients = [];
      if (snapshot.exists()) {
        snapshot.forEach(sessionSnapshot => {
          const recipient = sessionSnapshot.val();
          if (recipient.email) {
            recipients.push(recipient.email);
          }
        });
        resolve(recipients);
      } else {
        reject('No recipients found');
      }
    }).catch(error => reject(error));
  });
}

// Function to send an email using EmailJS
function sendEmail(toEmail, subject, message) {
  const templateParams = {
    to_email: toEmail,
    subject: subject,
    message: message
  };

  emailjs.send('service_bxt3eel', 'template_0mg1p1y', templateParams)
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
    });
}

// Show and hide popup functions
function showPopup() {
  document.getElementById("myPopup").style.display = "block";
}

function hidePopup() {
  document.getElementById("myPopup").style.display = "none";
}

// Event listener for the "Yes" button to notify recipients
document.getElementById("send-email").addEventListener("click", async function() {
  hidePopup(); // Close popup on confirmation

  try {
    const recipients = await fetchRecipients();
    const subject = 'Leader of the day';
    const message = 'Cast your poll by clicking this link :';

    recipients.forEach(recipientEmail => {
      sendEmail(recipientEmail, subject, message);
    });
  } catch (error) {
    console.error('Error fetching recipients:', error);
  }
});

// Event listener for the "No" button to close popup
document.getElementById("cancel-email").addEventListener("click", function() {
  hidePopup();
});

// Event listener to open the popup when "notify" button is clicked
document.getElementById('generate-button').addEventListener('click', showPopup);
