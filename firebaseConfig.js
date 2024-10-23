const userName = document.getElementById('username');
const fullname = document.getElementById('full-name');
const specialize = document.getElementById('specialization');
const birthDate = document.getElementById('birth-date');
const address = document.getElementById('address');
const email = document.getElementById('email');
const password = document.getElementById('password');
const country = document.getElementById('country');

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

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
      const countrySelect = document.getElementById('country');
      
      // Sort countries alphabetically by name
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      
      // Loop through each country and add an option to the select element
      data.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name.common;
        option.textContent = country.name.common;
        countrySelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching country data:', error));

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
    blocked: false,
    username: userName.value,
    fullname: fullname.value,
    specialize: specialize.value,
    birth: birthDate.value,
    address: address.value,
    email: email.value,
    profilePicture: "https://firebasestorage.googleapis.com/v0/b/static-site-firebase.appspot.com/o/profile%20images%2Fuser.png?alt=media&token=8bb78a73-769c-4197-9a2d-0fb0082acb0c",
    password: password.value,
    uid: user.uid,
    country: country.value,
    Projects: {},
    Courses: {}
    }, {merge: true});
    })
      .then(() => {
       console.log('User signed up and information added to Firestore');
       window.location.href = '/login/';
      })
      .catch((error) => {
      console.error('Error during sign-up:', error.code, error.message);
      });
}
