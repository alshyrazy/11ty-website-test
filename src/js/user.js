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


// Get the user ID from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const userId = getQueryParam('uid');  // Or 'username' depending on your URL structure

if (userId) {
    // Fetch the user document from Firestore
    db.collection('users').doc(userId).get().then((doc) => {
        if (doc.exists) {
            
            const userData = doc.data();
          
            document.getElementById('user-name').textContent = userData.fullname;
            document.getElementById('user-email').textContent = userData.email;
            document.getElementById('user-special').textContent = userData.specialize;
            document.getElementById('user-residence').textContent = userData.country
        } else {
            console.log('User does not exist!');
        }
    }).catch((error) => {
        console.error('Error fetching user data:', error);
    });
} else {
    console.log('No user ID provided in the URL');
}