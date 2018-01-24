var modelos = require("./modelos");

// ### Transacciones de excursiones para los CLIENTES ###
// Get principal
exports.getPrincipal= function(req,res){
    modelos.Excursion.find({}).populate("guia").populate("destino").populate("microbuses.microbus").exec(function(err,docs){
        console.log(docs);
        res.render("excursiones-clientes/index",{excursiones:docs});
    });
};
// ### Transacciones de excursiones ###

