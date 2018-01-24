exports.parseo = function(lista) {
    return lista.split(',');
}


exports.generateRandomCode = function()
{
  var cont = 0;
  var code = "";
  var min = 65;
  var max = 90;
  while(cont<8){
    code += String.fromCharCode(Math.random() + (max - min) + min);
    cont++;
  }
  return code;
}

exports.password = "1234";