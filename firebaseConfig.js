const userName = document.getElementById('username');
const fullname = document.getElementById('full-name');
const specialize = document.getElementById('specialization');
const birthDate = document.getElementById('birth-date');
const address = document.getElementById('address');
const email = document.getElementById('email');
const password = document.getElementById('password');
const country = document.getElementById('country');

const firebaseConfig = firebase.initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
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
document.getElementById('submit').addEventListener('click', signIn);
//window.signIn = signIn;
//console.log(import.meta.env.VITE_FIREBASE_API_KEY);
//const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

//document.getElementById("test-env").innerText = apiKey