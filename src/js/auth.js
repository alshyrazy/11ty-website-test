const email = document.getElementById('email');
const password = document.getElementById('password');

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

async function signIn(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    await authen.signInWithEmailAndPassword(email, password)
    .then((res)=>{
      db.collection('users').doc(res.user.uid).get().then((doc) => {
        if (doc.exists && doc.data().role === 'admin') {
          window.location.href = '/admins/';
        } else {
          alert("Access Denied: You do not have permission to access the admin page.");
          authen.signOut();
        }
      });
    }).catch((err)=>{
      console.log(err.code, err.message)
    });
}
/*window.addEventListener('beforeunload', function (e) {
    // Sign out the user when the page/tab is closed
    authen.signOut().then(() => {
      console.log("User signed out due to page close");
    }).catch((error) => {
      console.error("Error during sign out: ", error);
    });
  
    // Optional: Show a confirmation dialog (most browsers ignore this now)
    e.preventDefault();
    e.returnValue = '';  // This is needed for older browsers
  });*/

  