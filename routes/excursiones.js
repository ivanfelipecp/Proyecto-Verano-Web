var modelos = require("./modelos");
var utils = require("./utils");
// ### Transacciones de excursiones ###
// Get principal
exports.getPrincipal= function(req,res){
    modelos.Excursion.find({}).populate("guia","chofer").exec(function(err,docs){
        res.render("excursiones/index",{excursiones:docs});
    }
};
// ### Transacciones de excursiones ###

// + Crear
// get
exports.getCrear= function(req,res){
    modelos.Asociado.find({puesto:"chofer"},function(err,choferes) {
      modelos.Asociado.find({puesto:"guia"},function(err,guias) {
        modelos.Microbus.find({}).populate("propietario").exec(function(err,docs) {
            res.render("excursiones/crear",{choferes:choferes,guias:guias,microbuses:docs});
        })
      })
    })
};

// post
exports.postCrear= function(req,res){
    req.body.comidas = utils.parseo(req.body.comidas);
    req.body.lugaresDeAbordaje = utils.parseo(req.body.lugares);    
    req.body.microbuses = utils.parseo(req.body.listaMicrobus);
    req.body.costos = [req.body.niño,req.body.adulto,req.body.terceraEdad];
    modelos.Excursion.create(req.body, function(err,doc){
      if(err){
          console.log(err);
      }
      res.redirect("/microbuses");
  })
};
