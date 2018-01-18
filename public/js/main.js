var servicios = ["Aire acondicionado","Música","WiFi"];

$(document).ready(function(){

  $("#agregaServicio").click(function() {
      var nuevo = $("#nuevoServicio").val();
      if(nuevo!="") {
        servicios.push(nuevo);
        $("#servicios").val(servicios);
        var nuevo = $("#nuevoServicio").val("");
      }
  });

  $("#servicios").val(servicios);

});
