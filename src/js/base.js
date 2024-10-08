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

 /* authen.onAuthStateChanged((user) => {
    if(user){
      const userId = user.uid;
      const profileImage = document.getElementById("profile-image");
      db.collection('users').doc(userId).get().then((doc) => {
        if (doc.exists) {
          console.log("founded")
          const userData = doc.data();
          profileImage.src = userData.profilePicture;
        }});
    }
  });*/
  
  function signOutUser() {
    authen.signOut().then(() => {
      console.log("User signed out successfully.");
      // Optionally, redirect to another page or show a message
      window.location.href = '/index.html'; // Example: Redirect to sign-in page
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  }
