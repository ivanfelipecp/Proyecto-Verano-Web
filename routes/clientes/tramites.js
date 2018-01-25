var modelos = require("../modelos");
var utils = require("../utils");

exports.postConsultar = function(req,res){
    modelos.Reservaciones.find({cedula:req.body.cedula,estado:"pendiente"}).populate({"path":'excursion',"populate":{"path":"destino"}}).populate({"path":'depositos'}).exec(function(err,docs){
        console.log(docs);
        res.render("clientes/tramites/pendientes",{reservaciones:docs,cedula:req.body.cedula});
    }); 
}

exports.getConsultar = function(req,res){
    res.render("clientes/tramites/consultar");
}

exports.getPago = function(req,res){
    modelos.Reservaciones.findByIdAndUpdate(req.params.id,{estado:"cancelado"},function(err,doc){
        res.redirect("/consultar");
    });    
}
