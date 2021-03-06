var modelos = require("../modelos");
var utils = require("../utils");
// ### Transacciones de excursiones ###
// Get principal
exports.getPrincipal= function(req,res){
    modelos.Reservaciones.find({}).populate("excursion").populate({"path":'depositos'}).exec(function(err,docs){
        console.log(docs);
        res.render("admin/reservaciones/index",{reservaciones:docs});
    });
};
// ### Transacciones de excursiones ###

// + Crear
// get
exports.getCrear= function(req,res){    
    if(req.body.password == utils.password){
        modelos.Excursion.find({}).populate("destino").exec(function(err,docs) {
            //res.json({reservaciones:docs});
            res.render("admin/reservaciones/crear",{excursiones:docs,password:req.body.password});
        });
    }
};

// post
exports.postCrear= function(req,res){
    var data={};
    data.excursion= req.body.excursion;
    data.tipoTurista= req.body.tipoTurista;
    data.monto= req.body.monto;
    data.saldo= req.body.saldo;
    data.estado= req.body.estado;
    data.fechaMaxPago= req.body.fechaMaxPago;
    modelos.Reservaciones.create(data, function(err,doc){
      if(err){
          console.log(err);
      }
      //res.redirect("/reservaciones");
      modelos.Reservaciones.find({}).populate("excursion").populate({"path":'depositos'}).exec(function(err,docs){
        console.log(docs);
        res.render("admin/reservaciones/index",{reservaciones:docs,password:req.body.password});
    });
  })
};

// Eliminar
// get
exports.getEliminar= function(req,res){
    modelos.Reservaciones.findByIdAndRemove(req.params.id, function(err, doc){
        //res.redirect("/reservaciones");
        modelos.Reservaciones.find({}).populate("excursion").populate({"path":'depositos'}).exec(function(err,docs){
            console.log(docs);
            res.render("admin/reservaciones/index",{reservaciones:docs,password:req.body.password});
        });
    });
};