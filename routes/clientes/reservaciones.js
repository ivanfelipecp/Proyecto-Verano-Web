var modelos = require("../modelos");
var utils = require("../utils");


exports.getReservar= function(req,res){        
    res.render("clientes/reservaciones/crear",{excursion:req.params.id});    
}

exports.postReservar = function(req,res){
    var data;
    //var excursion = modelos.Excursion.findById(req.params.id,
    //data.excursion=req.params.id;
    data.tipoTurista=req.body.tipoTurista;

    modelos.Reservaciones.create()
}