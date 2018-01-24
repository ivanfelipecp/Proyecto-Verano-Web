var utils = require("../utils");
var modelos = require("../modelos");

exports.getPrincipal = function(req,res){
    modelos.Destinos.find({},function(err,docs){
        res.render("clientes/client",{destinos:docs});
    });
};