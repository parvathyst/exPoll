import { db } from "../../../backend/firebase/config.js";
import { ref, push, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

async function addPollOption(pollID, newOption) {
    try {
        const pollOptionsRef = ref(db, `poll-options/${pollID}`);
        const newOptionRef = push(pollOptionsRef);
        const newOptionData = {
            selectedUserName: "",
            selectedUserEmail: "",
            isSelected: false,
            selectedTime: "",
            content: newOption,
        };
        await set(newOptionRef, newOptionData);
        console.log(`New poll option added under poll-options/${pollID}`);
        return true;

    } catch (error) {
        console.error("Error adding poll option:", error);
        return false;
    }
}

export { addPollOption }