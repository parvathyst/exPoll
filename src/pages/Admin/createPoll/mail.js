// Import Firebase app and database functions
import { app } from '../../../backend/firebase/config.js'; // Ensure this path is correct
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const database = getDatabase();

// Function to fetch recipients from Firebase
// function fetchRecipients() {
//   return new Promise((resolve, reject) => {
//     const parentRef = ref(database, 'poll-recipients/-OAM5Lf-y8N9-lFTFck0'); // Adjust the path as needed
//     get(parentRef).then(snapshot => {
//       const recipients = [];
//     //   const name = [];
//       if (snapshot.exists()) {
//         snapshot.forEach(sessionSnapshot => { // Iterate through each recipient
//           const recipient = sessionSnapshot.val();
//           if (recipient.email){
//             recipients.push(recipient.email); // Collect email addresses
//             // name.push(recipient.name);// collect name
//           }
//         });
//         resolve(recipients);
//         console.log(recipients);
        
//       } else {
//         reject('No recipients found');
//       }
//     }).catch(error => reject(error));
//   });
// }

// // Function to send an email using EmailJS
// function sendEmail(toEmail, subject, message) {
//   const templateParams = {
//     to_email: toEmail,
//     subject: subject,
//     message: message
//   };

//   emailjs.send('service_bxt3eel', 'template_0mg1p1y', templateParams)
//     .then((response) => {
//       console.log('Email sent successfully!', response.status, response.text);
//     })
//     .catch((error) => {
//       console.error('Failed to send email:', error);
//     });
// }

// // Notify recipients by sending emails
// async function notifyRecipients() {
//   try {
//     const recipients = await fetchRecipients();
//     // const name = await fetchRecipients();
//     const subject = 'Leader of the day';
//     const message = 'Cast your poll by clicking this link :';

//     recipients.forEach(recipientEmail => {
//       sendEmail(recipientEmail, subject, message);
//     });
//   } catch (error) {
//     console.error('Error fetching recipients:', error);
//   }
// }

// Trigger the notification on button click
// document.getElementById('notify').addEventListener('click', notifyRecipients);


// Function to show the popup
function showPopup() {
  document.getElementById("myPopup").style.display = "block";
}

// Function to hide the popup
function hidePopup() {
  document.getElementById("myPopup").style.display = "none";
}

// Event listener for the "Yes" button
document.getElementById("send-email").addEventListener("click", function() {
  function fetchRecipients() {
    return new Promise((resolve, reject) => {
      const parentRef = ref(database, 'poll-recipients/-OAM5Lf-y8N9-lFTFck0'); // Adjust the path as needed
      get(parentRef).then(snapshot => {
        const recipients = [];
      //   const name = [];
        if (snapshot.exists()) {
          snapshot.forEach(sessionSnapshot => { // Iterate through each recipient
            const recipient = sessionSnapshot.val();
            if (recipient.email){
              recipients.push(recipient.email); // Collect email addresses
              // name.push(recipient.name);// collect name
            }
          });
          resolve(recipients);
          console.log(recipients);
          
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
  
  // Notify recipients by sending emails
  async function notifyRecipients() {
    try {
      const recipients = await fetchRecipients();
      // const name = await fetchRecipients();
      const subject = 'Leader of the day';
      const message = 'Cast your poll by clicking this link :';
  
      recipients.forEach(recipientEmail => {
        sendEmail(recipientEmail, subject, message);
      });
    } catch (error) {
      console.error('Error fetching recipients:', error);
    }
  }
  document.getElementById('notify').addEventListener('click', notifyRecipients);
  hidePopup();
  // Add additional code here to handle the email sending
});

// Event listener for the "No" button
document.getElementById("cancel-email").addEventListener("click", function() {
  hidePopup();
});

document.getElementById('notify').addEventListener('click', showPopup);