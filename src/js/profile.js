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
const storage = firebaseConfig.storage();

const pickBtn = document.getElementById("pick-btn");
const setImageContainer = document.getElementById("set-image-container");
const closeSetImageBtn = document.getElementById("close-set-image-btn");

const editImgBtn = document.getElementById('editBtn');
const popContainer = document.getElementById('popUp');
let ID = 0;

/*const confirmImg = document.getElementById('confirmImg');
const proImage = document.getElementById('proImage');
const closeBtn = document.getElementById('closeBtn')*/

const editImage = document.getElementById('edit-image');
const editName = document.getElementById('edit-name');
const editDate = document.getElementById('edit-date');
const editAddress = document.getElementById('edit-address');
const editResidence = document.getElementById('edit-residence');
const editButton = document.getElementById('edit-button');

const image = document.getElementById('user-image');
const name = document.getElementById('name');
const date = document.getElementById('date');
const address = document.getElementById('address');
const residence = document.getElementById('residence');
const email = document.getElementById('email');
const specialization = document.getElementById('specialization');

const fileInput = document.getElementById('fileInput');

pickBtn.onclick = function(){
  getImages();
  setImageContainer.style.display = "block";
}
closeSetImageBtn.onclick = function(){
  setImageContainer.style.display = "none";
}
editImgBtn.onclick = function(){
    editImage.src = image.src;
    popContainer.style.display = "block";
    editName.value = name.innerText;
    editDate.value = date.value;
    editAddress.value = address.innerText;
    editResidence.value = residence.innerText
}
window.onclick = function(event){
    if (event.target == popContainer) {
        popContainer.style.display = "none";
    } 
    else if(event.target == confirmImg){
      //confirmImg.style.display = "none";
    }
    //setImageContainer.style.display = "none"
}
 

authen.onAuthStateChanged((user) => {
    if (user) {
      ID = user.uid;
      displayProjects(ID);
      db.collection('users').doc(ID).get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const profileImage = document.getElementById("profile-image");
          profileImage.src = userData.profilePicture;

          image.src = userData.profilePicture;
          name.innerText = userData.fullname;
          date.innerText = userData.birth;
          address.innerText = userData.address;
          residence.innerText = userData.country || "test";
          email.innerText = userData.email;
          specialization.innerText = userData.specialize;

        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.error("Error getting document:", error);
      });
      set();
    } else {
      console.log("No user is signed in.");
    }
  });

function edit(){
  
  db.collection("users").doc(ID).update({
    fullname: editName.value,
    birth: editDate.value,
    address: editAddress.value,
    country: editResidence.value
      })
    .then(() => {
     console.log('Information updated');
     popContainer.style.display = "none";
     location.reload();
    })
    .catch((error) => {
    console.error('Error during update:', error.code, error.message);
    });
    //
    //
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

async function set(userId, imageSrc){
 await db.collection("users").doc(userId).update({
    profilePicture: imageSrc
    })
    .then(() => {
     console.log('Picture updated');
     
    })
    .catch((error) => {
    console.error('Error during update:', error.code, error.message);
    });

}

async function displayProjects(userId) {
  try {

    const querySnapshot = await db.collection("Projects").get();
    
    const projectList = document.getElementById("project-list");

    projectList.innerHTML = '';

    querySnapshot.forEach((doc) => {

      const project = doc.data();
      const membersMap = project.members || {}
      const projectId = doc.id;
      if(membersMap.hasOwnProperty(userId)){
        //console.log("founded");
        const li = document.createElement("li");   

        const a = document.createElement("a");
        a.href = "/projects/";  
        /*const span = document.createElement("span");
        //svg
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("width", "20");
        svg.setAttribute("height", "20");
        // path 1
        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "M8 6H5c-.553 0-1-.448-1-1s.447-1 1-1h3c.553 0 1 .448 1 1s-.447 1-1 1zM13 10H5c-.553 0-1-.448-1-1s.447-1 1-1h8c.553 0 1 .448 1 1s-.447 1-1 1zM13 14H5c-.553 0-1-.448-1-1s.447-1 1-1h8c.553 0 1 .448 1 1s-.447 1-1 1z");
        path1.setAttribute("fill", "black");
        
        //path 2
        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("d", "M18 2v8c0 .55-.45 1-1 1s-1-.45-1-1V2.5c0-.28-.22-.5-.5-.5h-13c-.28 0-.5.22-.5.5v19c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5V21c0-.55.45-1 1-1s1 .45 1 1v1c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0h14c1.1 0 2 .9 2 2z");
        path2.setAttribute("fill", "black");
        
        //path3
        const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path3.setAttribute("d", "M23.87 11.882c.31.54.045 1.273-.595 1.643l-9.65 5.57c-.084.05-.176.086-.265.11l-2.656.66c-.37.092-.72-.035-.88-.314-.162-.278-.09-.65.17-.913l1.907-1.958c.063-.072.137-.123.214-.167.004-.01.012-.015.012-.015l9.65-5.57c.64-.37 1.408-.234 1.72.305l.374.65z");
        path3.setAttribute("fill", "black");*/
       
  
        const spanTitle = document.createElement("span");
        spanTitle.textContent = project.title;  
  
       /* svg.appendChild(path1);
        svg.appendChild(path2);
        svg.appendChild(path3);
        span.appendChild(svg);
        a.appendChild(span);*/
  
        a.appendChild(spanTitle);
        li.appendChild(a);
        
  
        projectList.appendChild(li);
      }

    });
    
  } catch (error) {
    console.error("Error retrieving projects: ", error);
  }
}

async function displayCourses(userId) {
  /*try {

    const querySnapshot = await db.collection("Projects").get();
    
    const projectList = document.getElementById("project-list");

    projectList.innerHTML = '';

    querySnapshot.forEach((doc) => {

      const project = doc.data();
      const membersMap = project.members || {}
      const projectId = doc.id;
      if(membersMap.hasOwnProperty(userId)){
        //console.log("founded");
        const li = document.createElement("li");   

        const a = document.createElement("a");
        a.href = "/projects/";  
        const span = document.createElement("span");
        //svg
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("width", "20");
        svg.setAttribute("height", "20");
        // path 1
        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "M8 6H5c-.553 0-1-.448-1-1s.447-1 1-1h3c.553 0 1 .448 1 1s-.447 1-1 1zM13 10H5c-.553 0-1-.448-1-1s.447-1 1-1h8c.553 0 1 .448 1 1s-.447 1-1 1zM13 14H5c-.553 0-1-.448-1-1s.447-1 1-1h8c.553 0 1 .448 1 1s-.447 1-1 1z");
        path1.setAttribute("fill", "black");
        
        //path 2
        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("d", "M18 2v8c0 .55-.45 1-1 1s-1-.45-1-1V2.5c0-.28-.22-.5-.5-.5h-13c-.28 0-.5.22-.5.5v19c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5V21c0-.55.45-1 1-1s1 .45 1 1v1c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0h14c1.1 0 2 .9 2 2z");
        path2.setAttribute("fill", "black");
        
        //path3
        const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path3.setAttribute("d", "M23.87 11.882c.31.54.045 1.273-.595 1.643l-9.65 5.57c-.084.05-.176.086-.265.11l-2.656.66c-.37.092-.72-.035-.88-.314-.162-.278-.09-.65.17-.913l1.907-1.958c.063-.072.137-.123.214-.167.004-.01.012-.015.012-.015l9.65-5.57c.64-.37 1.408-.234 1.72.305l.374.65z");
        path3.setAttribute("fill", "black");
       
  
        const spanTitle = document.createElement("span");
        spanTitle.textContent = project.title;  
  
        svg.appendChild(path1);
        svg.appendChild(path2);
        svg.appendChild(path3);
        span.appendChild(svg);
        a.appendChild(span);
  
        a.appendChild(spanTitle);
        li.appendChild(a);
        
  
        projectList.appendChild(li);
      }

    });
    
  } catch (error) {
    console.error("Error retrieving projects: ", error);
  }*/
}

async function displayAchivments(userId) {
  /*try {

    const querySnapshot = await db.collection("Projects").get();
    
    const projectList = document.getElementById("project-list");

    projectList.innerHTML = '';

    querySnapshot.forEach((doc) => {

      const project = doc.data();
      const membersMap = project.members || {}
      const projectId = doc.id;
      if(membersMap.hasOwnProperty(userId)){
        //console.log("founded");
        const li = document.createElement("li");   

        const a = document.createElement("a");
        a.href = "/projects/";  
        const span = document.createElement("span");
        //svg
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("width", "20");
        svg.setAttribute("height", "20");
        // path 1
        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "M8 6H5c-.553 0-1-.448-1-1s.447-1 1-1h3c.553 0 1 .448 1 1s-.447 1-1 1zM13 10H5c-.553 0-1-.448-1-1s.447-1 1-1h8c.553 0 1 .448 1 1s-.447 1-1 1zM13 14H5c-.553 0-1-.448-1-1s.447-1 1-1h8c.553 0 1 .448 1 1s-.447 1-1 1z");
        path1.setAttribute("fill", "black");
        
        //path 2
        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("d", "M18 2v8c0 .55-.45 1-1 1s-1-.45-1-1V2.5c0-.28-.22-.5-.5-.5h-13c-.28 0-.5.22-.5.5v19c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5V21c0-.55.45-1 1-1s1 .45 1 1v1c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0h14c1.1 0 2 .9 2 2z");
        path2.setAttribute("fill", "black");
        
        //path3
        const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path3.setAttribute("d", "M23.87 11.882c.31.54.045 1.273-.595 1.643l-9.65 5.57c-.084.05-.176.086-.265.11l-2.656.66c-.37.092-.72-.035-.88-.314-.162-.278-.09-.65.17-.913l1.907-1.958c.063-.072.137-.123.214-.167.004-.01.012-.015.012-.015l9.65-5.57c.64-.37 1.408-.234 1.72.305l.374.65z");
        path3.setAttribute("fill", "black");
       
  
        const spanTitle = document.createElement("span");
        spanTitle.textContent = project.title;  
  
       /* svg.appendChild(path1);
        svg.appendChild(path2);
        svg.appendChild(path3);
        span.appendChild(svg);
        a.appendChild(span);
  
        a.appendChild(spanTitle);
        li.appendChild(a);
        
  
        projectList.appendChild(li);
      }

    });
    
  } catch (error) {
    console.error("Error retrieving projects: ", error);
  }*/
}

function getImages(){
  const storageRef = storage.ref('profile images/');

  // Get reference to the div where images will be displayed
  const editImage = document.getElementById("edit-image");
  const clickableImages = document.querySelectorAll(".profile-image-set-inner img");
  const imageContainer = document.getElementById('profile-image-set-inner');
  imageContainer.innerHTML = '';
  // List all images in the "profile images" folder
  storageRef.listAll().then((result) => {
      result.items.forEach((imageRef) => {
          // Get the URL for each image
          imageRef.getDownloadURL().then((url) => {
              // Create an img element and set its src attribute
              const div = document.createElement("div");
              const imgElement = document.createElement('img');
              imgElement.src = url;

              imgElement.addEventListener('click', function() {
                editImage.src = this.src;
                set(ID, this.src);
                setImageContainer.style.display = "none";
                console.log("clicked", this.src)
              });

              div.appendChild(imgElement);
              imageContainer.appendChild(div);
          }).catch((error) => {
              console.error("Error fetching image URL:", error);
          });
      });
  }).catch((error) => {
      console.error("Error listing images:", error);
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