var modelos = require("../modelos");
var utils = require("../utils");

// ### Transacciones de excursiones para los CLIENTES ###
// Get principal
exports.getPrincipal= function(req,res){
    //console.log("LA PUTA MADRE IVAN");    
    modelos.Excursion.find({}).populate("guia").populate("destino").populate({"path":'microbuses',"populate":{"path":"propietario"}}).exec(function(err,docs){
        //console.log(docs);
        res.render("clientes/excursiones/index",{excursiones:docs});
    });
};
