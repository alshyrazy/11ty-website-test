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

const image = document.getElementById('image');
const name = document.getElementById('name');
const date = document.getElementById('date');
const address = document.getElementById('address');
const residence = document.getElementById('residence');
const email = document.getElementById('email');
const specialization = document.getElementById('specialization');

const fileInput = document.getElementById('fileInput');

pickBtn.onclick = function(){
  setImageContainer.style.display = "block";
}
closeSetImageBtn.onclick = function(){
  setImageContainer.style.display = "none";
}
editImgBtn.onclick = function(){
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
      confirmImg.style.display = "none";
    }
    //setImageContainer.style.display = "none"
}

const actualImage = document.getElementById("edit-image");
const clickableImages = document.querySelectorAll(".profile-image-set-inner img");
// Add click event listeners to each clickable image
clickableImages.forEach((img) => {
    img.addEventListener("click", function() {
        // Set the src of the actual image to the src of the clicked image
        actualImage.src = this.src;
        setImageContainer.style.display = "none";
    });
});
  

  authen.onAuthStateChanged((user) => {
    if (user) {
      ID = user.uid;
      displayProjects(ID);
      db.collection('users').doc(ID).get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

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
  upload();
  db.collection("users").doc(ID).update({
    fullname: editName.value,
    birth: editDate.value,
    address: editAddress.value,
    country: editResidence.value
      })
    .then(() => {
     console.log('Information updated');
     popContainer.style.display = "none";
     //location.reload();
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

/*function upload(){
  
  const file = fileInput.files[0];

  if (file) {
    // Create a storage reference
    const storageRef = storage.ref('images/' + file.name);
    const userId = authen.currentUser.uid;
    const uploadTask = storageRef.child(`profile_pictures/${userId}/${file.name}`).put(file);

    // Monitor the upload process
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Handle progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      }, 
      (error) => {
        // Handle unsuccessful uploads
        console.error('Upload failed:', error);
      }, 
      () => {
        // Handle successful uploads
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          // Save the file path (or URL) in Firestore
          const userDocRef = db.collection('users').doc(userId);
          userDocRef.set({
            profilePicture: downloadURL
          }, { merge: true });
        });
      }
    );
  } else {
    alert('No file selected');
  }
}*/

function upload(){
  const refImage = document.getElementById("edit-image");
  const actualImage = document.getElementById("user-image");

  actualImage.setAttribute("src", refImage.src);
}

function set(){
  const userDocRef = db.collection('users').doc(authen.currentUser.uid);
  userDocRef.get().then((doc) => {
  if (doc.exists) {
    const profilePictureURL = doc.data().profilePicture;
    document.getElementById('profileImage').src = profilePictureURL;
  }
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