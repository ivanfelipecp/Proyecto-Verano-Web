// ### Transacciones de excursiones ###
var modelos = require("./modelos");
// Get principal
exports.getPrincipal= function(req,res){
    modelos.Excursion.find({}, function(err, docs){
        res.render("e/index",{asociados:docs});
    })
};
// ### Transacciones de excursiones ###

// + Crear
// get
exports.getCrear= function(req,res){
    modelos.Asociado.find({puesto:"chofer"},function(err,choferes) {
      modelos.Asociado.find({puesto:"guia"},function(err,guias) {
        modelos.microbuses.find({},function(err,microbuses) {
          res.render("excursiones/crear",{choferes:choferes},{guias:guias},{microbuses:microbuses});
        })
      })
    })
};

// post
exports.postCrear= function(req,res){
    modelos.Excursion.create(req.body, function(err,doc){
      if(err){
          console.log(err);
      }
      res.redirect("/microbuses");
  })
};
