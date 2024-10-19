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

//Retriev all courses and display them
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
        /*a.addEventListener('click', function(){
          enroll(doc.id).then(() => {
            // Only redirect once the enroll() function has completed
            window.location.href = `/payment?id=${doc.id}`;
        }).catch((error) => {
            console.error('Enrollment failed:', error);
        });
          //window.location.href = `/payment?id=${doc.id}`;
           
        });*/
        a.addEventListener('click', async function() {
          try {
              await enroll(doc.id);  // Wait for enroll() to complete
              //console.log("done");
              window.location.href = `/payment?id=${doc.id}`;  // Redirect after it's done
          } catch (error) {
              console.error('Enrollment failed:', error);
          }
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

//Add the course in the Courses map
async function enroll(courseId){
  const docRef = db.collection("users").doc(authen.currentUser.uid);
  let courseTitle;
  let courseLink;
  
  const courseRef = db.collection("courses").doc(courseId);
  courseRef.get().then((doc) => {
      if (doc.exists) {
           courseTitle = doc.data().title;
           courseLink = doc.data().link;
          console.log("Project title:", courseTitle);
      } else {
          console.log("No such document!");
      }
  }).catch((error) => {
      console.error("Error getting document:", error);
  });
  
  await docRef.get().then((doc) => {
    if (doc.exists) {
      const userData = doc.data();

      const courseMap = userData.Courses || {};

        // Check if the project is already added
        if (!courseMap.hasOwnProperty(courseId)) {
          // Add the project to the Projects map
          courseMap[courseId] = {
            title: courseTitle,
            status: "pinned",
            link: courseLink
            // Add other project details as needed
          };
         
          // Update the user's Projects map in Firestore
           docRef.update({
            Courses: courseMap
          }).then(() => {
            //location.reload();
            console.log("Project added successfully!");
          }).catch((error) => {
            console.error("Error updating document: ", error);
          });
        } else {
          console.log("User is already part of this project.");
        }
      } else {
        console.log("User has reached the limit of 3 projects.");
      }
    
  }).catch((error) => {
    console.log("Error getting document:", error);
    });
}