const logoutBtn = document.getElementById('logoutBtn');

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
    if(user){
      document.getElementById("signin-btn").style.display = "none";
      document.getElementById("signup-btn").style.display = "none";
      document.getElementById("profile-a").style.display = "block";
      document.getElementById("logoutBtn").style.display = "block";
      const userId = user.uid;
      const profileImage = document.getElementById("profile-image");
      db.collection('users').doc(userId).get().then((doc) => {
        if (doc.exists) {
          console.log("founded")
          const userData = doc.data();
          profileImage.src = userData.profilePicture;
        }});
    }
});
  
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
// Function to handle displaying search results
function displaySearchResult(type, data) {
  const resultDiv = document.getElementById("searchResults");

  // Create HTML elements
  const a = document.createElement("a");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  const span = document.createElement("span");
  span.style.color = "blue"

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
// Event listener for search input
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


//FEEDBACK COUNTER
let targetDate = localStorage.getItem("countdownTargetDate");

if (!targetDate) {
    // If no target date is set, create a new one for 15 days from now
    targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15);
    localStorage.setItem("countdownTargetDate", targetDate); // Save target date in local storage
} else {
    // Parse the stored date string back into a Date object
    targetDate = new Date(targetDate);
}

function updateCountdown() {
  const now = new Date();
  const timeRemaining = targetDate - now; // Time difference in milliseconds

  if(timeRemaining > 0){
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }else {
    document.getElementById("timer").innerHTML = "Countdown Finished!";
    clearInterval(countdownInterval); // Stop updating when countdown ends
  }
}

const countdownInterval = setInterval(updateCountdown, 1000);
//updateCountdown();

