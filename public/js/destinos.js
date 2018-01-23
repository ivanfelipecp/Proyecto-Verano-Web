var slideIndex = 1;
//showDivs(slideIndex);

function plusDivs(n, nombre) {
  showDivs(slideIndex += n, nombre);
}

function showDivs(n, nombre) {
  var i;
  var x = document.getElementsByClassName(nombre);
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}