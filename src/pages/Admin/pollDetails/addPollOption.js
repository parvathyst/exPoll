import { db } from "../../../backend/firebase/config.js";
import { ref, get, child, push, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

async function addPollOption(pollID, newOption) {
    try {
        const pollOptionsRef = ref(db, `poll-options/${pollID}`);

        const snapshot = await get(pollOptionsRef);
        const optionCount = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;

        const newOptionID = optionCount;
        const newOptionRef = child(pollOptionsRef, newOptionID.toString());
        const newOptionData = {
            content: newOption,
            isSelected: false,
            selectedUserEmail: "",
            selectedUserName: "",
            selectedTime: ""
        };
        await set(newOptionRef, newOptionData);
        console.log(`New poll option added under poll-options/${pollID} with ID ${newOptionID}`);

        return true;
    } catch (error) {
        console.error("Error adding poll option:", error);
        return false;
    }
}


export { addPollOption }