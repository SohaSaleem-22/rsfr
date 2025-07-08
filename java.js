 const header  = document.querySelector("header");

 window.addEventListener ("scroll", function(){
    header.classList.toggle ("sticky", this.window.scrollY > 0);
 })

 const menuIcon = document.getElementById("menu-icon");
 const navMenu = document.getElementById("navmenu");
 
 menuIcon.addEventListener("click", () => {
     menuIcon.classList.toggle("bx-x");
     navMenu.classList.toggle("open");
 });
 