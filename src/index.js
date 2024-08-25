window.addEventListener('scroll', function(){
const header = document.getElementById('header');
if(window.scrollY >= header.offsetHeight){
    console.log("scrolled")
}
});

