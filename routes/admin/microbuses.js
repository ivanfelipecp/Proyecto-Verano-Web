var modelos = require("../modelos");
var utils = require("../utils");
// ### Transacciones de microbuses ###

// + Crear
// get
exports.getCrear= function(req,res){
    if(req.body.password == utils.password){
        modelos.Asociado.find({puesto:"chofer"},function(err,docs) {
            res.render("admin/microbuses/crear",{choferes:docs,password:req.body.password});
        })
    }
};

// post
exports.postCrear= function(req,res){
    req.body.servicios = utils.parseo(req.body.servicios);
    modelos.Microbus.create(req.body, function(err,doc){
      if(err){
          console.log(err);
      }
      //res.redirect("/microbuses");
      modelos.Microbus.find({}).populate("propietario").exec(function(err,docs) {
        res.render("admin/microbuses/index",{microbuses:docs,password:req.body.password});
    });
  })
};
/*
// + Modificar
// get
app.get("/asociados/modificar/:id",function(req,res){
    //console.log(req.body);
    Asociado.findById(req.params.id, function(err,doc){
        res.render("asociados/modificar",{asociado:doc});
    })
});

// post
app.post("/asociados/modificar/:id", function(req,res){
    console.log(req.body);
    Asociado.findByIdAndUpdate(req.params.id, req.body ,function(err, doc){
        if(err){
            console.log(err);
        }
        res.redirect("/");
    });
});
*/
// Eliminar
// solo el get, ya que se hace directo por parametro
exports.getEliminar= function(req,res){
    modelos.Microbus.findByIdAndRemove(req.params.id, function(err, doc){
        //res.redirect("/microbuses");
        modelos.Microbus.find({}).populate("propietario").exec(function(err,docs) {
            res.render("admin/microbuses/index",{microbuses:docs});
        });
    });
};

// Get principal
exports.getPrincipal= function(req,res){
    modelos.Microbus.find({}).populate("propietario").exec(function(err,docs) {
        res.render("admin/microbuses/index",{microbuses:docs});
    });
};
