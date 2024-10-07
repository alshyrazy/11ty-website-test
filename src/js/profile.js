
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

editImgBtn.onclick = function(){
    popContainer.style.display = "block";
    editName.value = name.innerText;
    editDate.value = date.innerText;
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
    
}

/*proImage.onclick = function(){

  confirmImg.style.display = "block";
}
closeBtn.onClick = function(){
  confirmImg.style.display = "none";
}*/

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
  
  authen.onAuthStateChanged((user) => {
    if (user) {
      ID = user.uid;
      db.collection('users').doc(ID).get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          name.innerText = userData.fullname;
          date.innerText = userData.birth;
          address.innerText = userData.address;
          residence.innerText = userData.country;
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

function upload(){
  
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