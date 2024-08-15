// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1tG_Sgpd4QUJ2jBGvyk3akBo8baRBBek",
  authDomain: "static-site-firebase.firebaseapp.com",
  projectId: "static-site-firebase",
  storageBucket: "static-site-firebase.appspot.com",
  messagingSenderId: "94422243821",
  appId: "1:94422243821:web:a274bee2c61bcd6bd6afe4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = firebase.auth(app);

    // Handle Sign Up
    document.getElementById('signInForm').addEventListener('submit', (event) => {
      event.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Successfully signed up
          console.log('User signed up:', userCredential.user);
          alert('Sign-up successful! You are now registered.');
        })
        .catch((error) => {
          // Handle errors
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Error during sign-up:', errorCode, errorMessage);
          document.getElementById('error-message').textContent = errorMessage;
        });
    });