import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import db from '../firebase/config.js'


// document.addEventListener('DOMContentLoaded', function () {
//     const adminDetails = await getCollectionData();
//     console.log(adminDetails);
// });



async function getCollectionData() {
    console.log("aaaa")
    let data = [{}];
    const querySnapshot = await getDocs(collection(db, "admin_details"));
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
        console.log(doc)
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        data.push(JSON.stringify(doc.data()));
    });
    console.log(data)
    return data;
}


getCollectionData()