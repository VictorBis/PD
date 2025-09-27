var nav = document.getElementById("floating-menu");

nav.addEventListener("click", function(){
    var options = document.getElementById("mobile-options");
    if (options.style.display === "block") {
      options.style.display = "none";
    } else {
      options.style.display = "block";
    }
});
