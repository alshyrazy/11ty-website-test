
const editImgBtn = document.getElementById('editBtn');
const popContainer = document.getElementById('popUp');

const editImage = document.getElementById('edit-image');
const editName = document.getElementById('edit-name');
const editDate = document.getElementById('edit-date');
const editAddress = document.getElementById('edit-address');
const editResidence = document.getElementById('edit-residence');

const image = document.getElementById('image');
const name = document.getElementById('name');
const date = document.getElementById('date');
const address = document.getElementById('address');
const residence = document.getElementById('residence');
const email = document.getElementById('email');

editImgBtn.onclick = function(){
    popContainer.style.display = "block";
}
window.onclick = function(event){
    if (event.target == popContainer) {
        popContainer.style.display = "none";
    }
}

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
      const uid = user.uid;
      db.collection('users').doc(uid).get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          name.innerText = userData.firstname +' '+ userData.secondname;
          date.innerText = userData.birth;
          address.innerText = userData.address;
          residence.innerText = userData.country;
          email.innerText = userData.email;

        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.error("Error getting document:", error);
      });
    } else {
      console.log("No user is signed in.");
    }
  });