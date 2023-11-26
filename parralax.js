const parralax = document.getElementById("top");

window.addEventListener("scroll", function(){
    console.log(window.pageYOffset);
    let offset = window.pageYOffset;
    parralax.style.transform = "translateY(" + (offset * 0.5) + "px)";
});