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
        const membersMap = course.members || {};

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

         if (membersMap.hasOwnProperty(authen.currentUser.uid)){
            a.style.backgroundColor = "rgb(0, 163, 228)";
            a.innerText = "Open"; 
            a.addEventListener('click', () =>{
            window.location.href = course.link;
            //console.log(course.link)
          })
         }
         else{
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
         }
    

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

function signOutUser() {
  authen.signOut().then(() => {
    console.log("User signed out successfully.");
    // Optionally, redirect to another page or show a message
    window.location.href = '/index.html'; // Example: Redirect to sign-in page
  }).catch((error) => {
    console.error("Error signing out: ", error);
  });
}

function searchAcrossCollections(query) {
document.getElementById("searchResults").innerHTML = "";

// Search in 'Projects' collection
db.collection("Projects")
  .where("title", ">=", query)
  .where("title", "<=", query + '\uf8ff')
  .onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
      console.log("there is proj")
      displaySearchResult("Project", doc.data());
    });
  });

// Search in 'Courses' collection
db.collection("courses")
  .where("title", ">=", query)
  .where("title", "<=", query + '\uf8ff')
  .onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
      console.log("there is cour")
      displaySearchResult("Course", doc.data());
    });
  });

/*Search in 'Researches' collection
db.collection("Researches")
  .where("title", ">=", query)
  .where("title", "<=", query + '\uf8ff')
  .onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
      console.log("there is res")
      displaySearchResult("Research", doc.data());
    });
  });*/
}
// Function to handle displaying search results
function displaySearchResult(type, data) {
const resultDiv = document.getElementById("searchResults");

// Create HTML elements
const a = document.createElement("a");
const p = document.createElement("p");
const strong = document.createElement("strong");
const span = document.createElement("span");
span.style.color = "blue"

// Set content
strong.innerText = type + " ";
span.innerText = data.title;

// Append elements
p.appendChild(strong);
p.appendChild(span);
a.appendChild(p);

// Dynamically set the href based on the type
if (type === "Course") {
    a.href = "/courses"; // Assuming data.id contains the document ID or a unique identifier
} else if (type === "Project") {
    a.href = "/projects";
} else if (type === "Research") {
    a.href = `/researches/${data.id}`;
}

// Append to the result div
resultDiv.appendChild(a);
}
// Event listener for search input
document.getElementById("searchInput").addEventListener("input", (event) => {
const searchQuery = event.target.value;
const resultDiv = document.getElementById("searchResults");
if (searchQuery) {
  resultDiv.style.display = "block"
  searchAcrossCollections(searchQuery);
} else {
  // Clear the results if search is empty
  resultDiv.style.display = "none"
  document.getElementById("searchResults").innerHTML = "";
  console.log("nothing")
}
});
