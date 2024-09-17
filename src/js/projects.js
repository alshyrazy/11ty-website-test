

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
      
      const docRef = db.collection("users").doc(user.uid);
      docRef.get().then(doc => {
        const userData = doc.data();
        const projectsMap = userData.Projects || {};
        const userAcceptedProjects = Object.keys(projectsMap);
      
        const applyButtons = document.querySelectorAll('.applyBtn');
        // Loop through the buttons and change text based on project status
        applyButtons.forEach(button => {
        const projectCard = button.closest('.project-card');
        const projectId = projectCard.dataset.projectId;
        if (userAcceptedProjects.includes(projectId)) {
          button.textContent = "Open";  // Change text to "Open"
          button.style.backgroundColor = "rgb(0, 163, 228)";  // Change color to green
          button.dataset.status = "open";  // Update data-status
          button.addEventListener('click', () =>{
            window.location.href = '/space/';
          })
        }
      });
    });
        } else {
          console.log("No such document!");
        }
});

async function apply(projectId){
const docRef = db.collection("users").doc(authen.currentUser.uid);

docRef.get().then((doc) => {
  if (doc.exists) {
    const userData = doc.data();
      // Check if the user has a Projects map
    const projectsMap = userData.Projects || {};

    const projectCount = Object.keys(projectsMap).length;
    
    if (projectCount < 3) {
      // Check if the project is already added
      if (!projectsMap.hasOwnProperty(projectId)) {
        // Add the project to the Projects map
        projectsMap[projectId] = {
          projectName: "New Project",
          count: 12
          // Add other project details as needed
        };
        // Update the user's Projects map in Firestore
         docRef.update({
          Projects: projectsMap
        }).then(() => {
          location.reload();
          console.log("Project added successfully!");
        }).catch((error) => {
          console.error("Error updating document: ", error);
        });
      } else {
        console.log("User is already part of this project.");
      }
    } else {
      console.log("User has reached the limit of 3 projects.");
    }
  } else {
    console.log("No such user document.");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
  });
}

function signOutUser() {
  authen.signOut().then(() => {
    console.log("User signed out successfully.");
    // Optionally, redirect to another page or show a message
    window.location.href = '/index.html'; // Example: Redirect to sign-in page
  }).catch((error) => {
    console.error("Error signing out: ", error);
  });
}