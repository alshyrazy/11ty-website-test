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


authen.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("signin-btn").style.display = "none";
      document.getElementById("signup-btn").style.display = "none";
      document.getElementById("profile-a").style.display = "block";
      document.getElementById("logoutBtn").style.display = "block";
    const docRef = db.collection("users").doc(user.uid);
    docRef.get().then(doc => {
      const userData = doc.data();

      const projectsMap = userData.Projects || {};
      const userAcceptedProjects = Object.keys(projectsMap);

      const profileImage = document.getElementById("profile-image");
      profileImage.src = userData.profilePicture;
    })}
});

/*async function displayEvents() {
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
}*/

async function displayEvents() {
  try {

    const querySnapshot = await db.collection("events").get();
    
    const eventsList = document.getElementById("events-list");

    //eventsList.innerHTML = '';

    querySnapshot.forEach((doc) => {

      const event = doc.data();
      
      const li = document.createElement("li");
      const snippetDiv = document.createElement("div");
      snippetDiv.classList.add("event-snippet");
      const img = document.createElement("img");
      img.classList.add("event-image");
      img.src = event.imagePath;
     
      snippetDiv.appendChild(img);
      li.appendChild(snippetDiv);
      eventsList.appendChild(li);
    });
    
  } catch (error) {
    console.error("Error retrieving projects: ", error);
  }
}

window.onload = displayEvents;

function signOutUser() {
  authen.signOut().then(() => {
    console.log("User signed out successfully.");
    // Optionally, redirect to another page or show a message
    window.location.href = '/index.html'; // Example: Redirect to sign-in page
  }).catch((error) => {
    console.error("Error signing out: ", error);
  });
}

function searchAcrossCollections(query) {
  document.getElementById("searchResults").innerHTML = "";

  // Search in 'Projects' collection
  db.collection("Projects")
    .where("title", ">=", query)
    .where("title", "<=", query + '\uf8ff')
    .onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        console.log("there is proj")
        displaySearchResult("Project", doc.data());
      });
    });

  // Search in 'Courses' collection
  db.collection("courses")
    .where("title", ">=", query)
    .where("title", "<=", query + '\uf8ff')
    .onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        console.log("there is cour")
        displaySearchResult("Course", doc.data());
      });
    });

  /*Search in 'Researches' collection
  db.collection("Researches")
    .where("title", ">=", query)
    .where("title", "<=", query + '\uf8ff')
    .onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        console.log("there is res")
        displaySearchResult("Research", doc.data());
      });
    });*/
}
function displaySearchResult(type, data) {
  const resultDiv = document.getElementById("searchResults");

  // Create HTML elements
  const a = document.createElement("a");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  const span = document.createElement("span");

  // Set content
  strong.innerText = type + " ";
  span.innerText = data.title;

  // Append elements
  p.appendChild(strong);
  p.appendChild(span);
  a.appendChild(p);

  // Dynamically set the href based on the type
  if (type === "Course") {
      a.href = "/courses"; // Assuming data.id contains the document ID or a unique identifier
  } else if (type === "Project") {
      a.href = "/projects";
  } else if (type === "Research") {
      a.href = `/researches/${data.id}`;
  }

  // Append to the result div
  resultDiv.appendChild(a);
}
document.getElementById("searchInput").addEventListener("input", (event) => {
  const searchQuery = event.target.value;
  const resultDiv = document.getElementById("searchResults");
  if (searchQuery) {
    resultDiv.style.display = "block"
    searchAcrossCollections(searchQuery);
  } else {
    // Clear the results if search is empty
    resultDiv.style.display = "none"
    document.getElementById("searchResults").innerHTML = "";
    console.log("nothing")
  }
});