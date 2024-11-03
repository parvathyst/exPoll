import { auth, db } from "../../backend/firebase/config.js";
import { onAuthStateChanged, getIdTokenResult } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

function authCheck() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = ref(db, `admins/${user.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const userData = snapshot.val();
            if (userData.status === "enabled") {
              resolve(user.uid);
            } else {
              reject("User account is disabled");
            }
          } else {
            reject("User data not found in database");
          }
        } catch (error) {
          reject(`Error fetching user status: ${error.message}`);
        }
      } else {
        reject("User not authenticated");
      }
    });
  });
}

function superAdminAuthCheck() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const idTokenResult = await getIdTokenResult(user);
          if (idTokenResult.claims.role === 'superadmin') {
            resolve(user.uid);
            console.log(idTokenResult.claims.role);

          } else {
            reject("User does not have superadmin privileges");
          }
        } catch (error) {
          reject("Error checking superadmin privileges: " + error);
        }
      } else {
        reject("User not authenticated");
      }
    });
  });
}

export { authCheck, superAdminAuthCheck };
