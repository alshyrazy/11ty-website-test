const userName = document.getElementById('username');
const firstName = document.getElementById('first-name');
const secondName = document.getElementById('second-name');
const birthDate = document.getElementById('birth-date');
const address = document.getElementById('address');
const email = document.getElementById('email');
const password = document.getElementById('password');
const country = document.getElementById('country');

/*const countries = ["Afghanistan", "Albania", "Algeria", "Zimbabwe"];
        countries.forEach(item => {
            let option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            country.appendChild(option);
        });*/

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

function signIn(){
  const email = document.getElementById('email').value;
 const password = document.getElementById('password').value;

  authen.signInWithEmailAndPassword(email, password)
  .then((res)=>{
    console.log(res.user)
    window.location.href = '/home/'
  }).catch((err)=>{
    console.log(err.code, err.message)
  });
}


function signUp() {
  authen.createUserWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
   const user = userCredential.user;
  return db.collection("users").doc(user.uid).set({
      username: "@"+userName.value,
      firstname: firstName.value,
      secondname: secondName.value,
      birth: birthDate.value,
      address: address.value,
      email: email.value,
      password: password.value,
      uid: user.uid,
      country: country.value
        });
        })
      .then(() => {
       console.log('User signed up and information added to Firestore');
       window.location.href = '/login/';
      })
      .catch((error) => {
      console.error('Error during sign-up:', error.code, error.message);
      });
}
     
authen.onAuthStateChanged((user) => {
  if (user) {
    const uid = user.uid;

   } else {
    console.log("No user is signed in.");
  }
});
