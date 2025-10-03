const toggle = document.getElementById("menu-toggle"); 
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", function() {
    navLinks.classList.toggle("show");
})
