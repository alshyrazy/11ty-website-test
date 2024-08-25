
const editImgBtn = document.getElementById('editBtn');
const popContainer = document.getElementById('popUp');

const editImage = document.getElementById('edit-image');
const editName = document.getElementById('edit-name');
const editDate = document.getElementById('edit-date');
const editAddress = document.getElementById('edit-address');
const editResidence = document.getElementById('edit-residence');

const finalImage = document.getElementById('final-image');
const finalName = document.getElementById('final-name');
const finalDate = document.getElementById('final-date');
const finalAddress = document.getElementById('final-address');
const finalResidence = document.getElementById('final-residence');

finalName.innerText = "Hello just"
editImgBtn.onclick = function(){
    popContainer.style.display = "block";
}

window.onclick = function(event){
    if (event.target == popContainer) {
        popContainer.style.display = "none";
    }
}



