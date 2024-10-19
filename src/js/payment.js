const cont = document.getElementById("slides-container");
const collecTitle = document.getElementById("collec-title");
let courseTitle = '';
let lecCount = '';


const bankakBtn = document.getElementById("bankak-btn");
const payPalBtn = document.getElementById("paypal-btn");
const fawryBtn = document.getElementById("fawry-btn");

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


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
const courseId = getQueryParam('id');
console.log(courseId);
//"IBvSyKrSIWgyX9EHSlyw"
async function retrieve() {
    const docRef = db.collection("courses").doc(courseId);

    await docRef.get().then(doc => {
        if (doc.exists) {
            const data = doc.data();
             courseTitle = data.title;
             lecCount = data.lectureCount;
            console.log(lecCount)
        } else {
            console.log("please select course");
        }
    }).catch(error => {
        console.log("Error getting document:", error);
    });
}

window.onload = retrieve;


bankakBtn.onclick = function (){

    collecTitle .innerText = "Bankak";
    cont.innerHTML = '';

    const containerDiv = document.createElement("div");
    containerDiv.classList.add("Bankak-container");

    const h3 = document.createElement("h3");
    h3.innerText = "Order info";

    const orderDiv = document.createElement("div");
    orderDiv.classList.add("order-info");

    const titleP = document.createElement("p");
    titleP.innerText = "Title ";
    const titleSpan = document.createElement("span");
    titleSpan.innerText = courseTitle;
    titleP.appendChild(titleSpan);

    const typeP = document.createElement("p");
    typeP.innerText = "Type ";
    const typeSpan = document.createElement("span");
    typeSpan.innerText = "Course";
    typeP.appendChild(typeSpan);

    const lecP = document.createElement("p");
    lecP.innerText = "Lec ";
    const lecSpan = document.createElement("span");
    lecSpan.innerText = lecCount;
    lecP.appendChild(lecSpan);

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-info");
    const proveP = document.createElement("p");
    proveP.innerText = "Prove";

    const lable = document.createElement("label");
    lable.setAttribute('for', 'file-upload');
    lable.classList.add("custom-file-upload");
    lable.innerText = "Upload file";

    const input = document.createElement("input");
    input.setAttribute('type', 'file');
    input.setAttribute('id', 'file-upload');

    const purchasDiv = document.createElement("div");
    purchasDiv.classList.add("done-btn");

    const a = document.createElement("a");
    a.innerText = "Purchas";

    purchasDiv.appendChild(a);
    imageDiv.appendChild(proveP);
    imageDiv.appendChild(lable);
    imageDiv.appendChild(input);
    orderDiv.appendChild(titleP);
    orderDiv.appendChild(typeP);
    orderDiv.appendChild(lecP);
    containerDiv.appendChild(h3);
    containerDiv.appendChild(orderDiv);
    containerDiv.appendChild(imageDiv);
    containerDiv.appendChild(purchasDiv);

    cont.appendChild(containerDiv);
}

fawryBtn.onclick = function (){

}

payPalBtn.onclick = function (){

}