import { Depositos } from "../../routes/modelos";

var servicios = ["Aire acondicionado","Música","WiFi"];
var puntosAbordaje = [];
var comidas = [];
var microbuses = [];

function generateRandomCode()
{
  var cont = 0;
  var code = "";
  var min = 65;
  var max = 90;
  while(cont<8){
    code += String.fromCharCode(Math.random()  (max - min) + min);
    cont++;
  }
  return code;
}

$(document).ready(function(){

  $("#agregaServicio").click(function() {
      var nuevo = $("#nuevoServicio").val();
      if(nuevo!="") {
        servicios.push(nuevo);
        $("#servicios").val(servicios);
        var nuevo = $("#nuevoServicio").val("");
      }
  });

  $("#agregaLugar").click(function() {
    var nuevo = $("#nuevoPunto").val();
    if(nuevo!="") {
      puntosAbordaje.push(nuevo);
      $("#lugares").val(puntosAbordaje);
      $("#nuevoPunto").val("");
    }
  });

  $("#agregaComida").click(function() {
    var nombre = $("#nombComida").val();
    var precio = $("#precioComida").val();
    if(nombre!="" && precio!="") {
      var comida = "nombre: "+nombre+" | precio: "+precio;
      comidas.push(comida);
      $("#comidas").val(comidas);
      $("#nombComida").val("");
      $("#precioComida").val("");
    }
  });

  $("#agregaMicrobus").click(function() {
    var nuevo = $("#selectMicrobus").val();
    if(nuevo!="") {
      microbuses.push(nuevo);
      $("#listaMicrobus").val(microbuses);
    }
  });

  $("#agregaDestino").click(function() {
    var nuevoDestino = $("#selectDestino").val();
    if(nuevoDestino!="") {      
      $("#destino").val(nuevoDestino);
    }
  });

  $("#servicios").val(servicios);
  
});
