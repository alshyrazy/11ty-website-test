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


const projectBtn = document.getElementById("project-btn");
const researchtBtn = document.getElementById("research-btn");
const memberBtn = document.getElementById("member-btn");
const requestBtn = document.getElementById("request-btn");

const addBtn =  document.getElementById("add-btn");
const addBtnTitle =  document.getElementById("add-btn-title");
const collectionTitle = document.getElementById("collec-title");
const addProjectMenu = document.getElementById("add-project-menu");
const addProjectCancle = document.getElementById("add-project-cancle");
const addProjectDone = document.getElementById("add-project-done");

projectBtn.onclick = function(){
    /*collectionTitle.innerText = "Projects"
    if(addBtn.style.display === "none"){
        addBtn.style.display = "block"
    }
    addBtnTitle.innerText = "Project"
    displayProjects();*/
    console.log("loading")
}
researchtBtn.onclick = function(){
    collectionTitle.innerText = "Researches"
    if(addBtn.style.display === "none"){
        addBtn.style.display = "block"
    }
    addBtnTitle.innerText = "Research"
    displayResearches();
}
memberBtn.onclick = function(){
    document.getElementById("collec-title").innerText = "Members"
    addBtn.style.display = "none"
    displayUsers();
}
requestBtn.onclick = function(){
    document.getElementById("collec-title").innerText = "Requests"
    displayRequests();
}
addBtn.onclick = function(){
    addProjectMenu.style.display = "block";
}
addProjectCancle.onclick = function(){
    if(addProjectMenu.style.display === "block"){

        addProjectMenu.style.display = "none";
    }
        
}
addProjectDone.onclick = addProject;


document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.li-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active'));

            this.classList.add('active');
        });
    });
});


  async function displayProjects() {
    try {

      const querySnapshot = await db.collection("Projects").get();
      
      const projectList = document.getElementById("project-list");

      projectList.innerHTML = '';

      querySnapshot.forEach((doc) => {

        const project = doc.data();
        
        const li = document.createElement("li");
      
        const a = document.createElement("a");
        a.href = "#";  

        const h3 = document.createElement("h3");
        h3.textContent = project.title;  
        a.appendChild(h3);

        li.appendChild(a);

        projectList.appendChild(li);
      });
      
    } catch (error) {
      console.error("Error retrieving projects: ", error);
    }
  }


  async function displayResearches() {
    try {

      const querySnapshot = await db.collection("Researches").get();
      
      const projectList = document.getElementById("project-list");

      projectList.innerHTML = '';

      querySnapshot.forEach((doc) => {

        const project = doc.data();
        
        const li = document.createElement("li");
      
        const a = document.createElement("a");
        a.href = "#";  

        const h3 = document.createElement("h3");
        h3.textContent = project.name;  
        a.appendChild(h3);

        li.appendChild(a);

        projectList.appendChild(li);
      });
      
    } catch (error) {
      console.error("Error retrieving projects: ", error);
    }
  }


  async function displayUsers() {
    try {

      const querySnapshot = await db.collection("users").get();
      
      const projectList = document.getElementById("project-list");

      projectList.innerHTML = '';

      querySnapshot.forEach((doc) => {

        const project = doc.data();
        const userId = project.uid;
        
        const li = document.createElement("li");

        const div = document.createElement("div");

        //View button
        const btn1 = document.createElement("button");
        btn1.addEventListener('click', () =>{
            
            window.location.href = '/';
          })
        btn1.classList.add("button1");
        btn1.innerText = "View";
        
        // Delete button
        const btn2 = document.createElement("button");
        btn2.addEventListener('click', () =>{
            //window.location.href = '/space/';
            blockUser(userId)
          })
        btn2.classList.add("button2");
        btn2.innerText = "Delete";

        const a = document.createElement("a");
        a.href = `/user?uid=${userId}`;

        const h3 = document.createElement("h3");
        h3.textContent = project.fullname;  
        a.appendChild(h3);
        div.appendChild(btn1);
        div.appendChild(btn2);
        li.appendChild(a);
        li.appendChild(div);
        projectList.appendChild(li);
      });
      
    } catch (error) {
      console.error("Error retrieving projects: ", error);
    }
  }


  async function displayRequests() {
    try {

      const querySnapshot = await db.collection("requests").get();
      
      const projectList = document.getElementById("project-list");

      projectList.innerHTML = '';

      querySnapshot.forEach((doc) => {

        const request = doc.data();
        
        const li = document.createElement("li");
      
        const a = document.createElement("a");
        a.href = "#";  

        const h3 = document.createElement("h3");
        h3.textContent = request.name + " asked to join "+ request.projectTitle;  
        a.appendChild(h3);

        li.appendChild(a);

        projectList.appendChild(li);
      });
      
    } catch (error) {
      console.error("Error retrieving projects: ", error);
    }
  }

  async function addProject() {
    
    await db.collection("Projects").add({
        title: document.getElementById("project-title").value,
        author: document.getElementById("project-author").value,
        date: document.getElementById("project-date").value,           
        description: document.getElementById("project-description").value,
        deadline:document.getElementById("project-deadline").value, 
        special: document.getElementById("project-special").value,     
        status: document.getElementById("project-status").value  
    })
    .then((docRef) => {
        console.log("Project added with ID: ", docRef.id);
        addProjectMenu.style.display = "none";
    })
    .catch((error) => {
        console.error("Error adding project: ", error);
    });
}

async function blockUser(userId) {
    try {
      // Update the user's 'blocked' field to true in Firestore
      await db.collection("users").doc(userId).update({
        blocked: true
      });
  
      // Log success message or show a success alert to the admin
      console.log(`User ${userId} has been blocked successfully.`);
  
      // Optionally, show a visual feedback to indicate the user is blocked (e.g., disable block button or change text)
      /*const blockButton = document.querySelector(`button[data-user-id="${userId}"]`);
      if (blockButton) {
        blockButton.disabled = true;  // Disable the button
        blockButton.innerText = "Blocked";  // Change text to 'Blocked'
        blockButton.classList.add("blocked"); // Optionally, add a class for styling
      }*/
  
    } catch (error) {
      console.error("Error blocking the user: ", error);
      alert("Error blocking the user. Please try again.");
    }
  }
  

