const enrollBtn = document.getElementById("enroll-btn");


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


async function displayCourses() {
    try {

      const querySnapshot = await db.collection("courses").get();
      
      const projectList = document.getElementById("courses-list");

      //projectList.innerHTML = '';

      querySnapshot.forEach((doc) => {

        const course = doc.data();
        
        const li = document.createElement("li");
        const snippetDiv = document.createElement("div");
        snippetDiv.classList.add("course-snippet");

        const titleDiv = document.createElement("div");
        titleDiv.classList.add("title");

        const h2 = document.createElement("h2");
        h2.innerText = course.title;

        const metaDiv = document.createElement("div");
        metaDiv.classList.add("meta-data");
        metaDiv.innerText = "Added ";

        const metaSpan = document.createElement("span");
        metaSpan.innerText = course.date;

        const descDiv = document.createElement("div");
        descDiv.classList.add("description");
        descDiv.innerText = course.description;

        const deadLineDiv = document.createElement("div");
        deadLineDiv.classList.add("deadline");

        const specialSpan = document.createElement("span");
        specialSpan.style.color = "rgb(1, 182, 31)";
        specialSpan.innerText = course.special;

        const lecSpan = document.createElement("span");
        lecSpan.innerText = "Lectures ";

        const countSpan = document.createElement("span");
        countSpan.innerText = course.lectureCount;

        const a = document.createElement("a");
        a.innerText = "Buy"
        a.addEventListener('click', function(){
            window.location.href = `/payment?id=${doc.id}`; 
        });

        lecSpan.appendChild(countSpan);
        deadLineDiv.appendChild(specialSpan);
        deadLineDiv.appendChild(lecSpan);
        deadLineDiv.appendChild(a);

        metaDiv.appendChild(metaSpan);
        titleDiv.appendChild(h2);

        snippetDiv.appendChild(titleDiv);
        snippetDiv.appendChild(metaDiv);
        snippetDiv.appendChild(descDiv);
        snippetDiv.appendChild(deadLineDiv);

        li.appendChild(snippetDiv);
        projectList.appendChild(li);
      });
      
    } catch (error) {
      console.error("Error retrieving courses: ", error);
    }
  }

window.onload = displayCourses;
