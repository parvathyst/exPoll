// Firebase import and initialization
import { app } from '../../../backend/firebase/config.js';
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const database = getDatabase();

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

function sendEmail(toEmail, subject, message) {
  const templateParams = {
    to_email: toEmail,
    subject: subject,
    message: message
  };

  emailjs.send('service_3oe3rm8', 'template_w6t6b5h', templateParams)
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
    });
}

function showPopup() {
  document.getElementById("myPopup").style.display = "block";
}

function hidePopup() {
  document.getElementById("myPopup").style.display = "none";
}

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

document.getElementById("cancel-email").addEventListener("click", function() {
  hidePopup();
});

document.getElementById('generate-button').addEventListener('click', showPopup);
