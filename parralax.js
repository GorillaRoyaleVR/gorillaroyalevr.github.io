const parralax = document.getElementById("volcano");

window.addEventListener("scroll", function(){
    console.log(window.pageYOffset);
    let offset = window.pageYOffset;
    parralax.style.transform = "translateY(" + (-offset) + "px)";
});