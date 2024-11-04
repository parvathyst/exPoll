import { db } from '../../config.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

async function fetchPollData(pollID) {
  const paths = [
    `poll-details/${pollID}`,
    `poll-options/${pollID}`,
    `poll-recipients/${pollID}`
  ];

  try {
    const [detailsSnapshot, optionsSnapshot, recipientsSnapshot] = await Promise.all(
      paths.map(path => get(ref(db, path)))
    );

    const pollDetails = detailsSnapshot.exists() ? detailsSnapshot.val() : null;
    const pollOptions = optionsSnapshot.exists() ? optionsSnapshot.val() : null;
    const pollRecipients = recipientsSnapshot.exists() ? recipientsSnapshot.val() : null;

    return {
      pollDetails,
      pollOptions,
      pollRecipients
    };
  } catch (error) {
    console.error("Error fetching poll data:", error);
    return null;
  }
}

export { fetchPollData };
