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
const storage = firebaseConfig.storage();

let currentCancleClickListener = null;
let currentDoneClickListener = null;
let cancleHaveListener = false;
let doneHaveListener = false;

let currentEventCancleClickListener = null;
let currentEventDoneClickListener = null;
let eventCancleHaveListener = false;
let eventDoneHaveListener = false;

let currentCourseCancleClickListener = null;
let currentCourseDoneClickListener = null;
let courseCancleHaveListener = false;
let courseDoneHaveListener = false;

const projectBtn = document.getElementById("project-btn");
const courseBtn = document.getElementById("course-btn");
const researchtBtn = document.getElementById("research-btn");
const memberBtn = document.getElementById("member-btn");
const requestBtn = document.getElementById("request-btn");
const eventBtn = document.getElementById("event-btn");

const addBtn =  document.getElementById("add-btn");
const addBtnTitle =  document.getElementById("add-btn-title");
const collectionTitle = document.getElementById("collec-title");
const addProjectMenu = document.getElementById("add-project-menu");
const addEventMenu = document.getElementById("add-event-menu");
const addCourseMenu = document.getElementById("add-course-menu");

const addProjectCancle = document.getElementById("add-project-cancle");
const addProjectDone = document.getElementById("add-project-done");

const addCourseCancle = document.getElementById("add-course-cancle");
const addCourseDone = document.getElementById("add-course-done");
const addCourseBtn = document.getElementById("add-course-btn");

const addEventCancle = document.getElementById("add-event-cancle");
const addEventDone = document.getElementById("add-event-done");
const addEventBtn = document.getElementById("add-event-btn");
const addResearchBtn = document.getElementById("add-research-btn");


//VIEW BUTTONS
projectBtn.onclick = function(){

    collectionTitle.innerText = "Projects";

    addCourseBtn.style.display = "none";
    addResearchBtn.style.display = "none";
    addEventBtn.style.display = "none";
    addBtn.style.display = "block";

    displayProjects();
}
courseBtn.onclick = function(){
    document.getElementById("collec-title").innerText = "Courses";

    addCourseBtn.style.display = "block";
    addResearchBtn.style.display = "none";
    addEventBtn.style.display = "none";
    addBtn.style.display = "none";

    displayCourses();
}
researchtBtn.onclick = function(){
    collectionTitle.innerText = "Researches";

    addResearchBtn.style.display = "block";
    addEventBtn.style.display = "none";
    addBtn.style.display = "none";
    addCourseBtn.style.display = "none";

    displayResearches();
}
memberBtn.onclick = function(){
    document.getElementById("collec-title").innerText = "Members"
    
    addResearchBtn.style.display = "none";
    addEventBtn.style.display = "none";
    addBtn.style.display = "none";
    addCourseBtn.style.display = "none";

    displayUsers();
}
requestBtn.onclick = function(){
    document.getElementById("collec-title").innerText = "Requests";
    
    addResearchBtn.style.display = "none";
    addEventBtn.style.display = "none";
    addBtn.style.display = "none";
    addCourseBtn.style.display = "none";

    displayRequests();
}
eventBtn.onclick = function(){
    collectionTitle.innerText = "Events"

    addResearchBtn.style.display = "none"
    addEventBtn.style.display = "block"
    addBtn.style.display = "none"
    addCourseBtn.style.display = "none";
    
    displayEvents();
}

//ADD BUTTONS
addBtn.onclick = function(){
    addProjectMenu.style.display = "block";

    //Add eventListeners
    if(cancleHaveListener){
        addProjectCancle.removeEventListener('click', currentCancleClickListener);
        currentCancleClickListener = function (){
            if(addProjectMenu.style.display === "block"){
                addProjectMenu.style.display = "none";
            }
            console.log("Cansle from proj");
        }
        addProjectCancle.addEventListener('click', currentCancleClickListener);
    } else{
        currentCancleClickListener = function (){
            if(addProjectMenu.style.display === "block"){
                addProjectMenu.style.display = "none";
            }
            console.log("Cansle from proj");
        }
        addProjectCancle.addEventListener('click', currentCancleClickListener);
        cancleHaveListener = true;
        console.log("new listener Added to proj");
    }

    if(doneHaveListener){
        addProjectDone.removeEventListener('click', currentDoneClickListener);
        currentDoneClickListener = function (){
            addProject();
            console.log("Done from proj");
        }
        addProjectDone.addEventListener('click', currentDoneClickListener);
    } else{
        currentDoneClickListener = function (){
            addProject();
            console.log("Done from proj");
        }
        addProjectDone.addEventListener('click', currentDoneClickListener);
       doneHaveListener = true;
        console.log("new done listener Added to proj");
    }
}
addEventBtn.onclick = function(){
    addEventMenu.style.display = "block";

    //Add eventListeners
    if(eventCancleHaveListener){
        addEventCancle.removeEventListener('click', currentEventCancleClickListener);
        currentEventCancleClickListener = function (){
            if(addEventMenu.style.display === "block"){
                addEventMenu.style.display = "none";
            }
            console.log("Cansle from new");
        }
        addEventCancle.addEventListener('click', currentEventCancleClickListener);
    } else{
        currentEventCancleClickListener = function (){
            if(addEventMenu.style.display === "block"){
                addEventMenu.style.display = "none";
            }
            console.log("Cansle from new");
        }
        addEventCancle.addEventListener('click', currentEventCancleClickListener);
        eventCancleHaveListener = true;
        console.log("new listener Added to event");
    }

    if(eventDoneHaveListener){
        addEventDone.removeEventListener('click', currentEventDoneClickListener);
        currentEventDoneClickListener = function (){
            addEvent();
            addEventMenu.style.display = "none";
            console.log("Done from new");
        }
        addEventDone.addEventListener('click', currentEventDoneClickListener);
    } else{
        currentEventDoneClickListener = function (){
            addEvent();
            addEventMenu.style.display = "none";
            console.log("Done from new");
        }
        addEventDone.addEventListener('click', currentEventDoneClickListener);
       eventDoneHaveListener = true;
        //console.log("new done listener Added");
    }
}
addCourseBtn.onclick = function(){
    addCourseMenu.style.display = "block";

    //Add eventListeners
    if(courseCancleHaveListener){
        addCourseCancle.removeEventListener('click', currentCourseCancleClickListener);

        currentCourseCancleClickListener = function (){
            if(addCourseMenu.style.display === "block"){
                addCourseMenu.style.display = "none";
            }
            console.log("Cansle from new");
        }
        addCourseCancle.addEventListener('click', currentCourseCancleClickListener);
    } else{
        currentCourseCancleClickListener = function (){
            if(addCourseMenu.style.display === "block"){
                addCourseMenu.style.display = "none";
            }
            console.log("Cancle from new");
        }
        addCourseCancle.addEventListener('click', currentCourseCancleClickListener);
        courseCancleHaveListener = true;
        console.log("new listener Added to course");
    }

    if(courseDoneHaveListener){
        addCourseDone.removeEventListener('click', currentCourseDoneClickListener);
        currentCourseDoneClickListener = function (){
            addCourse();
            addCourseMenu.style.display = "none";
            console.log("Done from new");
        }
        addCourseDone.addEventListener('click', currentCourseDoneClickListener);
    } else{
        currentCourseDoneClickListener = function (){
            addCourse();
            addCourseMenu.style.display = "none";
            console.log("Done from new");
        }
        addCourseDone.addEventListener('click', currentCourseDoneClickListener);
       courseDoneHaveListener = true;
        //console.log("new done listener Added");
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.li-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active'));

            this.classList.add('active');
        });
    });
});


//RESEARCHES operation side
async function displayResearches() {
    try {

      const querySnapshot = await db.collection("Researches").get();
      
      const projectList = document.getElementById("project-list");

      projectList.innerHTML = '';

      querySnapshot.forEach((doc) => {

        const project = doc.data();
        
        const li = document.createElement("li");
        const div = document.createElement("div");

        //Edit button
        const btn1 = document.createElement("button");
        btn1.addEventListener('click', () =>{            
   
          })
        btn1.classList.add("button1");
        btn1.innerText = "Edit";
        
        // Delete button
        const btn2 = document.createElement("button");
        btn2.addEventListener('click', () =>{
         
          })
        btn2.classList.add("button2");
        btn2.innerText = "Delete";

        const a = document.createElement("a");
        a.href = "#";  

        const h3 = document.createElement("h3");
        h3.textContent = project.name;  
        a.appendChild(h3);
        div.appendChild(btn1);
        div.appendChild(btn2);
        li.appendChild(a);
        li.appendChild(div);

        projectList.appendChild(li);
      });
      
    } catch (error) {
      console.error("Error retrieving projects: ", error);
    }
}

//PROJECTS operation side
async function displayProjects() {
    try {

      const querySnapshot = await db.collection("Projects").get();
      
      const projectList = document.getElementById("project-list");

      projectList.innerHTML = '';

      querySnapshot.forEach((doc) => {

        const project = doc.data();
        const projectId = doc.id;

        const li = document.createElement("li");
        const div = document.createElement("div");

        //View button
        const btn1 = document.createElement("button");
        btn1.classList.add("button1");
        btn1.innerText = "Edit";
        btn1.addEventListener('click', () =>{
            addProjectMenu.style.display = "block";
            document.getElementById("project-title").value = project.title;
            document.getElementById("project-author").value = project.author;
            document.getElementById("project-date").value = project.date;         
            document.getElementById("project-description").value = project.description;
            document.getElementById("project-deadline").value = project.deadline;
            document.getElementById("project-special").value = project.special;     
            document.getElementById("project-status").value = project.status;
            document.getElementById("project-link").value = project.link;
            //Add eventListeners
            if(cancleHaveListener){
                addProjectCancle.removeEventListener('click', currentCancleClickListener);
                currentCancleClickListener = function (){
                    if(addProjectMenu.style.display === "block"){
                        addProjectMenu.style.display = "none";
                    }
                    console.log("Cansle from set");
                }
                addProjectCancle.addEventListener('click', currentCancleClickListener);
            } else{
                currentCancleClickListener = function (){
                    if(addProjectMenu.style.display === "block"){
                        addProjectMenu.style.display = "none";
                    }
                    console.log("Cansle from set");
                }
                addProjectCancle.addEventListener('click', currentCancleClickListener);
                cancleHaveListener = true;
                //console.log(" set listener Added");
            }

            if(doneHaveListener){
                addProjectDone.removeEventListener('click', currentDoneClickListener);
                currentDoneClickListener = function (){
                    updateProject(projectId);
                    //console.log("Done from set");
                }
                addProjectDone.addEventListener('click', currentDoneClickListener);
            } else{
                currentDoneClickListener = function (){
                    updateProject(projectId);
                    //console.log("Done from set");
                }
                addProjectDone.addEventListener('click', currentDoneClickListener);
               doneHaveListener = true;
                console.log("new done listener Added");
            }

          })
        
        // Delete button
        const btn2 = document.createElement("button");
        btn2.classList.add("button2");
        btn2.innerText = "Delete";
        btn2.addEventListener('click', () =>{
            deleteProject(projectId);
          });

        const a = document.createElement("a");
        a.href = "#";  
        const h3 = document.createElement("h3");
        h3.textContent = project.title;  
        a.appendChild(h3);
        div.appendChild(btn1);
        div.appendChild(btn2);
        li.appendChild(a);
        li.appendChild(div);
        

        projectList.appendChild(li);
      });
      
    } catch (error) {
      console.error("Error retrieving projects: ", error);
    }
}
async function addProject() {
    
    await db.collection("Projects").add({
        title: document.getElementById("project-title").value,
        author: document.getElementById("project-author").value,
        date: document.getElementById("project-date").value,           
        description: document.getElementById("project-description").value,
        deadline:document.getElementById("project-deadline").value, 
        special: document.getElementById("project-special").value,     
        status: document.getElementById("project-status").value,
        link: document.getElementById("project-link").value
    })
    .then((docRef) => {
        console.log("Project added with ID: ", docRef.id);
        addProjectMenu.style.display = "none";
    })
    .catch((error) => {
        console.error("Error adding project: ", error);
    });
}
async function updateProject(projectId){

    await db.collection("Projects").doc(projectId).update({
        title: document.getElementById("project-title").value,
        author: document.getElementById("project-author").value,
        date: document.getElementById("project-date").value,           
        description: document.getElementById("project-description").value,
        deadline:document.getElementById("project-deadline").value, 
        special: document.getElementById("project-special").value,     
        status: document.getElementById("project-status").value,
        link: document.getElementById("project-link").value
    })
    .then((docRef) => {
        console.log("Project updtaed with ID: ",projectId);
        addProjectMenu.style.display = "none";
    })
    .catch((error) => {
        console.error("Error updating project: ", error);
    });
}
async function deleteProject(projectId){
    db.collection("Projects").doc(projectId).delete().then(() => {
        console.log("Project successfully deleted!");
        displayProjects()
    }).catch((error) => {
        console.error("Error removing project: ", error);
    });
}

//COURSES operation side
async function displayCourses() {
    try {

      const querySnapshot = await db.collection("courses").get();
      
      const projectList = document.getElementById("project-list");

      projectList.innerHTML = '';

      querySnapshot.forEach((doc) => {

        const course = doc.data();
        
        const li = document.createElement("li");
        const div = document.createElement("div");

        //Edit button
        const btn1 = document.createElement("button");
        btn1.addEventListener('click', () =>{ 

            addCourseMenu.style.display = "block";

            document.getElementById("course-title").value = course.title
            document.getElementById("course-count").value = course.lectureCount;
            document.getElementById("course-date").value = course.date;          
            document.getElementById("course-description").value = course.description;
            document.getElementById("course-special").value = course.special;   
            document.getElementById("course-link").value = course.link;
                  
            if(courseCancleHaveListener){
                addCourseCancle.removeEventListener('click', currentCourseCancleClickListener);
        
                currentCourseCancleClickListener = function (){
                    if(addCourseMenu.style.display === "block"){
                        addCourseMenu.style.display = "none";
                    }
                    console.log("Cansle from new");
                }
                addCourseCancle.addEventListener('click', currentCourseCancleClickListener);
            } else{
                currentCourseCancleClickListener = function (){
                    if(addCourseMenu.style.display === "block"){
                        addCourseMenu.style.display = "none";
                    }
                    console.log("Cancle from edit");
                }
                addCourseCancle.addEventListener('click', currentCourseCancleClickListener);
                courseCancleHaveListener = true;
                console.log("new listener Added to course");
            }
        
            if(courseDoneHaveListener){
                addCourseDone.removeEventListener('click', currentCourseDoneClickListener);
                currentCourseDoneClickListener = function (){
                    updateCourse(doc.id);
                    addCourseMenu.style.display = "none";
                    console.log("Done from edit");
                }
                addCourseDone.addEventListener('click', currentCourseDoneClickListener);
            } else{
                currentCourseDoneClickListener = function (){
                    updateCourse(doc.id);
                    addCourseMenu.style.display = "none";
                    console.log("Done from edit");
                }
                addCourseDone.addEventListener('click', currentCourseDoneClickListener);
               courseDoneHaveListener = true;
                //console.log("new done listener Added");
            }
           
          });
        btn1.classList.add("button1");
        btn1.innerText = "Edit";
        
        // Delete button
        const btn2 = document.createElement("button");
        btn2.addEventListener('click', () =>{
            deleteCourse(doc.id);
          })
        btn2.classList.add("button2");
        btn2.innerText = "Delete";


        const a = document.createElement("a");
        a.href = "#";  

        const h3 = document.createElement("h3");
        h3.textContent = course.title;  
        a.appendChild(h3);
        div.appendChild(btn1);
        div.appendChild(btn2);
        li.appendChild(a);
        li.appendChild(div);

        projectList.appendChild(li);
      });
      
    } catch (error) {
      console.error("Error retrieving projects: ", error);
    }
}
async function addCourse() {
    
    await db.collection("courses").add({
        title: document.getElementById("course-title").value,
        lectureCount: document.getElementById("course-count").value,
        date: document.getElementById("course-date").value,           
        description: document.getElementById("course-description").value,
        special: document.getElementById("course-special").value,     
        link: document.getElementById("course-link").value,
        members: {}
    })
    .then((docRef) => {
        console.log("Course added with ID: ", docRef.id);
        addProjectMenu.style.display = "none";
    })
    .catch((error) => {
        console.error("Error adding Course: ", error);
    });
}
async function updateCourse(courseId){

    await db.collection("courses").doc(courseId).update({

        title: document.getElementById("course-title").value,
        lectureCount: document.getElementById("course-count").value,
        date: document.getElementById("course-date").value,           
        description: document.getElementById("course-description").value,
        special: document.getElementById("course-special").value,     
        link: document.getElementById("course-link").value
    })
    .then((docRef) => {
        console.log("Course updtaed with ID: ",courseId);
        addProjectMenu.style.display = "none";
    })
    .catch((error) => {
        console.error("Error updating Course: ", error);
    });
}
async function deleteCourse(courseId){
    db.collection("courses").doc(courseId).delete().then(() => {
        console.log("Course successfully deleted!");
        displayCourses();
    }).catch((error) => {
        console.error("Error removing Course: ", error);
    });
}

//EVENTS operation side
async function displayEvents() {
    try {

      const querySnapshot = await db.collection("events").get();
      
      const projectList = document.getElementById("project-list");

      projectList.innerHTML = '';

      querySnapshot.forEach((doc) => {

        const event = doc.data();
        
        const li = document.createElement("li");
        const div = document.createElement("div");

        //Edit button
        const btn1 = document.createElement("button");
        btn1.addEventListener('click', () =>{ 

            addEventMenu.style.display = "block";
            document.getElementById("event-title").value = event.title;
            document.getElementById("event-date").value = event.date      
            //document.getElementById("event-description").value = event.description;
                     
            if(eventCancleHaveListener){
                addEventCancle.removeEventListener('click', currentEventCancleClickListener);
                currentEventCancleClickListener = function (){
                    if(addEventMenu.style.display === "block"){
                        addEventMenu.style.display = "none";
                    }
                    console.log("Cansle from edit");
                }
                addEventCancle.addEventListener('click', currentEventCancleClickListener);
            } else{
                currentEventCancleClickListener = function (){
                    if(addEventMenu.style.display === "block"){
                        addEventMenu.style.display = "none";
                    }
                    console.log("Cansle from edit");
                }
                addEventCancle.addEventListener('click', currentEventCancleClickListener);
                eventCancleHaveListener = true;
                console.log("new listener Added to event");
            }
        
            if(eventDoneHaveListener){
                addEventDone.removeEventListener('click', currentEventDoneClickListener);
                currentEventDoneClickListener = function (){
                    updateEvent(doc.id);
                    addEventMenu.style.display = "none";
                    console.log("Done from edit");
                }
                addEventDone.addEventListener('click', currentEventDoneClickListener);
            } else{
                currentEventDoneClickListener = function (){
                    updateEvent(doc.id);
                    addEventMenu.style.display = "none";
                    console.log("Done from edit");
                }
                addEventDone.addEventListener('click', currentEventDoneClickListener);
               eventDoneHaveListener = true;
                //console.log("new done listener Added");
            }
          })
        btn1.classList.add("button1");
        btn1.innerText = "Edit";
        
        // Delete button
        const btn2 = document.createElement("button");
        btn2.addEventListener('click', () =>{
            deleteEvent(doc.id);
          })
        btn2.classList.add("button2");
        btn2.innerText = "Delete";

        const a = document.createElement("a");
        a.href = "#";  

        const h3 = document.createElement("h3");
        h3.textContent = event.title;  
        a.appendChild(h3);
        div.appendChild(btn1);
        div.appendChild(btn2);
        li.appendChild(a);
        li.appendChild(div);

        projectList.appendChild(li);
      });
      
    } catch (error) {
      console.error("Error retrieving projects: ", error);
    }
}
async function addEvent() {
    const input = document.getElementById("image-input");
    const file = input.files[0];

    await uploadFile(file).then((downloadURL) => {
        console.log('File uploaded! Download URL:', downloadURL);
            db.collection("events").add({
            title: document.getElementById("event-title").value,
            date: document.getElementById("event-date").value,           
            imagePath: downloadURL
        });
        addProjectMenu.style.display = "none";
    }).catch((error) => {
        console.error(error);
    });
  
}
async function updateEvent(eventId){

    await db.collection("events").doc(eventId).update({
        title: document.getElementById("event-title").value,
        date: document.getElementById("event-date").value,           
    })
    .then((docRef) => {
        console.log("Project updtaed with ID: ",eventId);
        addProjectMenu.style.display = "none";
    })
    .catch((error) => {
        console.error("Error updating project: ", error);
    });
}
async function deleteEvent(eventId){
    db.collection("events").doc(eventId).delete().then(() => {
        console.log("Project successfully deleted!");
        displayEvents();
    }).catch((error) => {
        console.error("Error removing project: ", error);
    });
}

//REQUESTS operation side
async function displayRequests() {
    try {

      const querySnapshot = await db.collection("requests").get();
      
      const projectList = document.getElementById("project-list");

      projectList.innerHTML = '';

      querySnapshot.forEach((doc) => {

        const request = doc.data();
        
        const li = document.createElement("li");
        const div = document.createElement("div");

        //Edit button
        const h3 = document.createElement("h3");
        const btn1 = document.createElement("button");
        btn1.classList.add("button1");
        const btn2 = document.createElement("button");
        btn2.classList.add("button2");

        if(request.tag === "project"){
            h3.textContent = request.name + " asked to join "+ request.projectTitle;
            btn1.innerText = "Accept";
            btn1.addEventListener('click', () =>{            
                acceptJoin(request.userId, request.projectId, doc.id);
            })
        
            btn2.innerText = "Reject";
            btn2.addEventListener('click', () =>{
                rejectJoin(request.userId, request.projectId, doc.id);
            })
    } else if(request.tag === "course"){

            const menu = document.getElementById('view-purchas-menu');
            const accept = document.getElementById('accept-purchas');
            const cancle = document.getElementById('cancle-purchas');
            const save = document.getElementById('save-btn');
            const proveImg = document.getElementById("prove-img");
            h3.textContent = request.name + " asked to join "+ request.courseTitle;
            
            btn1.innerText = "View";
            btn1.addEventListener('click', () =>{ 
                document.getElementById("purchas-course-title").innerText = request.courseTitle;
                proveImg.src = request.prove;
                menu.style.display = "block";           
                accept.addEventListener('click', function (){
                    acceptJoinCourse(request.userId, request.courseId, doc.id);
                    menu.style.display = "none";
                });
                cancle.addEventListener('click', function (){
                    console.log("canle");
                    if(menu.style.display === "block"){
                        menu.style.display = "none";
                    }
                });
                save.addEventListener('click', function (){
                    downloadImageFromURL(request.prove);
                });
                
            })
        
            btn2.innerText = "Delete";
            btn2.addEventListener('click', () =>{
                rejectJoinCourse(request.userId, request.courseId, doc.id);
            })    
    }
        const a = document.createElement("a");
        a.href = "#";  

        
         
        a.appendChild(h3);
        div.appendChild(btn1);
        div.appendChild(btn2);
        li.appendChild(a);
        li.appendChild(div);

        projectList.appendChild(li);
      });
      
    } catch (error) {
      console.error("Error retrieving projects: ", error);
    }
}
async function acceptJoin(userId, projectId, requestId){
    const status = `Projects.${projectId}.status`;
    const docRef = db.collection("Projects").doc(projectId);

    db.collection("users").doc(userId).update({
         [status]: "allow"
        })
        .then(() => {
         console.log('Information updated');
        })
        .catch((error) => {
        console.error('Error during update:', error.code, error.message);
        });

        db.collection("requests").doc(requestId).delete().then(() => {
            console.log("request successfully deleted!");
            displayRequests();
        }).catch((error) => {
            console.error("Error removing request: ", error);
        });
        
        docRef.get().then((doc) => {
            if (doc.exists){
                
                const membersMap = doc.data().members || {};
                if (!membersMap.hasOwnProperty(userId)) {
                    membersMap[userId] = {
                     
                      // Add other project details as needed
                    };

                    docRef.update({
                    members: membersMap
                }).then(() => {
                    console.log("User successfully added to members");
                }).catch((error) => {
                    console.error("Error adding user to members:", error);
                });
            } else {
                console.log("User is already part of this project");
            }
        } else {
            console.log("No such project found");
        }
    }).catch((error) => {
        console.error("Error fetching project:", error);
    });
}
async function rejectJoin(userId, projectId, requestId){
    const rejectedProject = `Projects.${projectId}`;

    db.collection("users").doc(userId).update({
        [rejectedProject]: firebase.firestore.FieldValue.delete()
        })
        .then(() => {
         console.log('Information updated');
        })
        .catch((error) => {
        console.error('Error during update:', error.code, error.message);
        });

        db.collection("requests").doc(requestId).delete().then(() => {
            console.log("request successfully deleted!");
            displayRequests()

        }).catch((error) => {
            console.error("Error removing request: ", error);
        });
}
async function acceptJoinCourse(userId, courseId, requestId){
    const status = `Courses.${courseId}.status`;
    const docRef = db.collection("courses").doc(courseId);

    db.collection("users").doc(userId).update({
         [status]: "allow"
        })
        .then(() => {
         console.log('Information updated');
        })
        .catch((error) => {
        console.error('Error during update:', error.code, error.message);
        });

        db.collection("requests").doc(requestId).delete().then(() => {
            console.log("request successfully deleted!");
            displayRequests();
        }).catch((error) => {
            console.error("Error removing request: ", error);
        });
        
        docRef.get().then((doc) => {
            if (doc.exists){
                
                const membersMap = doc.data().members || {};

                if (!membersMap.hasOwnProperty(userId)) {
                    membersMap[userId] = {
                     
                      // Add other project details as needed
                    };

                    docRef.update({
                    members: membersMap
                }).then(() => {
                    console.log("User successfully added to members");
                }).catch((error) => {
                    console.error("Error adding user to members:", error);
                });
            } else {
                console.log("User is already part of this project");
            }
        } else {
            console.log("No such project found");
        }
    }).catch((error) => {
        console.error("Error fetching project:", error);
    });
}
async function rejectJoinCourse(userId, courseId, requestId){
    const rejectedCourse = `Course.${courseId}`;

    db.collection("users").doc(userId).update({
        [rejectedCourse]: firebase.firestore.FieldValue.delete()
        })
        .then(() => {
         console.log('Information updated');
        })
        .catch((error) => {
        console.error('Error during update:', error.code, error.message);
        });

        db.collection("requests").doc(requestId).delete().then(() => {
            console.log("request successfully deleted!");
            displayRequests()

        }).catch((error) => {
            console.error("Error removing request: ", error);
        });
}

//USERS operation side
async function displayUsers() {
    try {

      const querySnapshot = await db.collection("users").get();
      
      let blockBtnText = "Block";
      
      const projectList = document.getElementById("project-list");
      projectList.innerHTML = '';

      querySnapshot.forEach((doc) => {

        const project = doc.data();
        const userId = project.uid;

        const li = document.createElement("li");

        const div = document.createElement("div");

        //View button
        const btn1 = document.createElement("button");
        btn1.addEventListener('click', () =>{
            
            window.location.href = `/user?uid=${userId}`;
          })
        btn1.classList.add("button1");
        btn1.innerText = "View";
        
        // Delete button
        const btn2 = document.createElement("button");
        btn2.addEventListener('click', () =>{
            //window.location.href = '/space/';
            
            blockUser(userId)
          })
        btn2.classList.add("button2");
        btn2.innerText = blockBtnText;

        const a = document.createElement("a");
        //a.href = `/user?uid=${userId}`;

        const h3 = document.createElement("h3");
        h3.textContent = project.fullname;  
        a.appendChild(h3);
        li.appendChild(a);
        div.appendChild(btn1);
        div.appendChild(btn2);
        li.appendChild(div);
        projectList.appendChild(li);
      });
      
    } catch (error) {
      console.error("Error retrieving projects: ", error);
    }
}
async function blockUser(userId) {
    try {
      // Update the user's 'blocked' field to true in Firestore
      await db.collection("users").doc(userId).update({
        blocked: true
      });
  
      // Log success message or show a success alert to the admin
      console.log(`User ${userId} has been blocked successfully.`);
  
      // Optionally, show a visual feedback to indicate the user is blocked (e.g., disable block button or change text)
      /*const blockButton = document.querySelector(`button[data-user-id="${userId}"]`);
      if (blockButton) {
        blockButton.disabled = true;  // Disable the button
        blockButton.innerText = "Blocked";  // Change text to 'Blocked'
        blockButton.classList.add("blocked"); // Optionally, add a class for styling
      }*/
  
    } catch (error) {
      console.error("Error blocking the user: ", error);
      alert("Error blocking the user. Please try again.");
    }
}
  

//Utillis 
function downloadImageFromURL(imageURL) {
    const a = document.createElement('a');
    a.href = imageURL;
    a.download = 'downloaded-image.jpeg';  
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
function uploadFile(file) {
    return new Promise((resolve, reject) => {

        if (!file) {
            reject("No file selected!");
            return;
        }

        const storageRef = storage.ref();
        const fileRef = storageRef.child(`eventImages/${file.name}`);

        fileRef.put(file).then(() => {
            return fileRef.getDownloadURL();
        }).then((downloadURL) => {
            alert('Upload completed successfully!');
            resolve(downloadURL);  // Return the download URL as the resolved value
        }).catch((error) => {
            reject('Failed to upload the file: ' + error);
        });
    });
}


