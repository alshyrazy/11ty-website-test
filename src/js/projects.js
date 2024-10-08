

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
          const project = projectsMap[projectId];
          if(project.status === "allow"){
          button.textContent = "Open";  // Change text to "Open"
          button.style.backgroundColor = "rgb(0, 163, 228)";  // Change color to green
          button.dataset.status = "open";  // Update data-status
          button.addEventListener('click', () =>{
            window.location.href = '/space/';
          })
        }else if(project.status === "pinned"){
          button.textContent = "Pinned";  // Change text to "Open"
          button.style.backgroundColor = "rgb(128, 128, 128)";  // Change color to green
          button.dataset.status = "pinned";  // Update data-status
        }
      }
      });
    });
        } else {
          console.log("No such document!");
        }
});

async function apply(projectId){
const docRef = db.collection("users").doc(authen.currentUser.uid);
let projectTitle;
const projRef = db.collection("Projects").doc(projectId);
projRef.get().then((doc) => {
    if (doc.exists) {
         projectTitle = doc.data().title;  // Access the title
        console.log("Project title:", projectTitle);
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.error("Error getting document:", error);
});

await docRef.get().then((doc) => {
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
          projectName: projectTitle,
          count: 12,
          status: "pinned"
          // Add other project details as needed
        };
        db.collection("requests").add({
          type: "Join project",
          projectId: projectId,
          userId: userData.uid,
          name: userData.fullname,
          projectTitle: projectTitle
        });
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

async function displayProjects() {
  try {
    // Get all documents from the 'projects' collection
    const querySnapshot = await db.collection("Projects").get();

    // Get the <ul> element where projects will be appended
    const projectsUl = document.getElementById("projects-ul");

    // Clear the list before appending new items (optional)
    //projectsUl.innerHTML = '';

    // Loop through each document in the collection
    querySnapshot.forEach((doc) => {
      // Get project data
      const project = doc.data();

      // Create list item (<li>) element
      const li = document.createElement("li");

      // Create project-snippet div with class 'project-card'
      const projectSnippetDiv = document.createElement("div");
      projectSnippetDiv.classList.add("project-snippet", "project-card");
      projectSnippetDiv.setAttribute("data-project-id", doc.id);

      // Create title div
      const titleDiv = document.createElement("div");
      titleDiv.classList.add("title");

      const titleH2 = document.createElement("h2");
      titleH2.textContent = `${project.title} | ${project.special}`;
      titleDiv.appendChild(titleH2);

      // Create image div
      const imageDiv = document.createElement("div");
      imageDiv.classList.add("image");

      const img = document.createElement("img");
      img.src = "/Icons/surgy.jpg";  // Replace with dynamic URL if necessary
      img.alt = "Project Image";
      imageDiv.appendChild(img);

      // Create meta-data div
      const metaDataDiv = document.createElement("div");
      metaDataDiv.classList.add("meta-data");

      const metaDataP = document.createElement("p");
      metaDataP.innerHTML = `Posted on <span>${project.date}</span> By <span>DR. ${project.author}</span>`;
      metaDataDiv.appendChild(metaDataP);

      // Create description div
      const descriptionDiv = document.createElement("div");
      descriptionDiv.classList.add("description");

      const descriptionP = document.createElement("p");
      descriptionP.textContent = project.description;  // Project description from Firestore
      descriptionDiv.appendChild(descriptionP);

      // Create deadline div
      const deadlineDiv = document.createElement("div");
      deadlineDiv.classList.add("deadline");

      const deadlineP1 = document.createElement("p");
      deadlineP1.innerHTML = `Deadline: <span style="color: rgb(75, 75, 75);">${project.deadline}</span>`;
      deadlineDiv.appendChild(deadlineP1);

      const deadlineP2 = document.createElement("p");
      deadlineP2.classList.add("status");
      deadlineP2.textContent = project.status;  // e.g., 'Full' or 'Open'
      deadlineDiv.appendChild(deadlineP2);

      // Create Apply button
      const applyButton = document.createElement("button");
      applyButton.classList.add("applyBtn");
      applyButton.textContent = "Apply";
      applyButton.setAttribute("onclick", `apply('${doc.id}')`);  // Pass project ID to apply function

      deadlineDiv.appendChild(applyButton);

      // Append all elements to the project-snippet div
      projectSnippetDiv.appendChild(titleDiv);
      projectSnippetDiv.appendChild(imageDiv);
      projectSnippetDiv.appendChild(metaDataDiv);
      projectSnippetDiv.appendChild(descriptionDiv);
      projectSnippetDiv.appendChild(deadlineDiv);

      // Append project-snippet div to the list item
      li.appendChild(projectSnippetDiv);

      // Append list item to the <ul>
      projectsUl.appendChild(li);
    });

  } catch (error) {
    console.error("Error retrieving projects: ", error);
  }
}

window.onload = displayProjects;