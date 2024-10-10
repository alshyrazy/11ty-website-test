const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyC1tG_Sgpd4QUJ2jBGvyk3akBo8baRBBek",
    authDomain: "static-site-firebase.firebaseapp.com",
    projectId: "static-site-firebase",
    storageBucket: "static-site-firebase.appspot.com",
    messagingSenderId: "94422243821",
    appId: "1:94422243821:web:a274bee2c61bcd6bd6afe4"
});
const authen = firebaseConfig.auth();
const db = firebaseConfig.firestore();

async function displayEvents() {
    try {

      const querySnapshot = await db.collection("events").get();
      
      const eventsList = document.getElementById("events-list");

      eventsList.innerHTML = '';

      querySnapshot.forEach((doc) => {

        const event = doc.data();
        
        const li = document.createElement("li");
        const snippetDiv = document.createElement("div");
        snippetDiv.classList.add("event-snippet");
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("event-title");
        const dateDiv = document.createElement("div");
        dateDiv.classList.add("event-date");
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("event-content");

        const h3 = document.createElement("h3");
        h3.textContent = event.title;  
        const dateP = document.createElement("p");
        dateP.innerText = event.date;
        const contentP = document.createElement("p");
        contentP.innerText = event.description

        contentDiv.appendChild(contentP);
        dateDiv.appendChild(dateP);
        titleDiv.appendChild(h3);
        snippetDiv.appendChild(titleDiv)
        snippetDiv.appendChild(dateDiv)
        snippetDiv.appendChild(contentDiv)
        li.appendChild(snippetDiv);
        eventsList.appendChild(li);
      });
      
    } catch (error) {
      console.error("Error retrieving projects: ", error);
    }
}

window.onload = displayEvents;