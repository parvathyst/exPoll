import { app } from '../../../firebase/config.js'; 
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js"; 

const database = getDatabase(app);

async function fetchPollDetails() {
    const pollDetailsRef = ref(database, 'poll-details');

  
    try {
    
      const snapshot = await get(pollDetailsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("Poll Details Data:", data);

        const container = document.getElementById("leftSideBox");
        container.innerHTML = ''; 
  
        Object.keys(data).forEach(key => {
          const poll = data[key];
  
          // Create card container for each poll
          const elementBox = document.createElement("div");
          elementBox.className = "elements";
  
          // Construct inner HTML based on the template you provided
          elementBox.innerHTML = `
             <div class="lef" id="lef">
                        <h3>${poll.title || 'Untitled Poll'}</h3>
                        <p><i class="fa-solid fa-calendar"></i>18-08-24 <i class="fa-solid fa-clock"></i> 13:00</p>


                    </div>
                    <div class="righ">
                        <h4>Hamza</h4>
                        <p>example@gmail.com</p>
                        

                    </div>
                  </div>

         
          `;
  
          // Append the card to the container
          container.appendChild(elementBox);
        });
      } else {
        console.log("No data available");
      }
  
    } catch (error) {
      console.error("Error fetching poll details:", error);
    }
  }
  
  fetchPollDetails();


  async function fetchPolloptions() {
    const polloptionsRef = ref(database, 'poll-options');

  
    try {
    
      const snapshot = await get(polloptionsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("Poll Options Data:", data);

        const container = document.getElementById("leftSideBox");
        container.innerHTML = ''; 
  
        Object.keys(data).forEach(key => {
          const poll = data[key];
  
          // Create card container for each poll
          const elementBox = document.createElement("div");
          elementBox.className = "elements";
  
          // Construct inner HTML based on the template you provided
          elementBox.innerHTML = `
             <div class="lef" id="lef">
                        <h3>${poll.title || 'Untitled Poll'}</h3>
                        <p><i class="fa-solid fa-calendar"></i>18-08-24 <i class="fa-solid fa-clock"></i> 13:00</p>


                    </div>
                    <div class="righ">
                        <h4>Hamza</h4>
                        <p>example@gmail.com</p>
                        

                    </div>
                  </div>

         
          `;
  
          // Append the card to the container
          container.appendChild(elementBox);
        });
      } else {
        console.log("No data available");
      }
  
    } catch (error) {
      console.error("Error fetching poll details:", error);
    }
  }

  fetchPolloptions() ;

    