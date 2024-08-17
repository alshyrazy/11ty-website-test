const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyC1tG_Sgpd4QUJ2jBGvyk3akBo8baRBBek",
  authDomain: "static-site-firebase.firebaseapp.com",
  projectId: "static-site-firebase",
  storageBucket: "static-site-firebase.appspot.com",
  messagingSenderId: "94422243821",
  appId: "1:94422243821:web:a274bee2c61bcd6bd6afe4"
});

const auth = firebaseConfig.auth();
const db = firebaseConfig.firestore();
/*const signin = () =>{
   
  const semail = document.getElementById('sign-in-email').value;
  const spassword = document.getElementById('sign-in-password').value;
  auth.signInWithEmailAndPassword(semail, spassword)
  .then((res)=>{
    
    console.log(res.user)
    window.location.href = '/index.html'
  }).catch((err)=>{
    alert(err.message)
    console.log(err.code)
    console.log(err.message)
  })

}*/

const signup = () =>{
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
        console.log('User signed up:', userCredential.user);
        window.location.href = '/index.html';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error during sign-up:', errorCode, errorMessage);
        document.getElementById('error-message').textContent = errorMessage;
      });
  }
 
const signin =()=>{
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
 document.getElementById('test').style.color = 'red'
 db.collection('users')
 .add({
  email: email,
  password: password
 })
 .then( (docRef) => {
  console.log("data id: ", docRef.id)
 })
 .catch((error) =>{
  console.log(error)
 })
}

   