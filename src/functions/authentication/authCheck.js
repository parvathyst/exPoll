import { auth } from "../../backend/firebase/config.js";

function authCheck() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid);
      } else {
        reject("User not authenticated");
      }
    });
  });
}

export { authCheck };
