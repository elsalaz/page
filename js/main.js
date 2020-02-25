new WOW().init();

window.onload = function() {
  loader();
};

function loader() {
  //alert("Hello! I am an alert box!!");
  document.getElementById("myLoader").remove();
  document.getElementById("myNavbar").style.display = "flex";
  document.getElementById("myInicio").style.display = "flex";
  document.getElementById("myWho").style.display = "flex";
  document.getElementById("myModelados").style.display = "flex";
  document.getElementById("myAplicaciones").style.display = "flex";
  document.getElementById("MyRenders").style.display = "flex";
  document.getElementById("MyDatos").style.display = "flex";
  document.getElementById("MyContacto").style.display = "flex";
  document.getElementById("MyFooter").style.display = "flex";
}
