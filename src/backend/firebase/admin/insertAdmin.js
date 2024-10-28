import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import db from '../config.js'


async function addCollectionData() {
    try {
        const docRef = await addDoc(collection(db, "admin-details"), {
            name: "John Doe",
            email: "john.doe@example.com",
            createdAt: new Date()
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function getCollectionData() {
    const querySnapshot = await getDocs(collection(db, "admin-details"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
}
