var modelos = require("./modelos");
var utils = require("./utils");
// ### Transacciones de excursiones ###
// Get principal
exports.getPrincipal= function(req,res){
    //modelos.Excursion.find({}).populate("guia").populate("destino").populate("microbuses microbuses.propietario").exec(function(err,docs){
    /*modelos.Excursion.find({}).populate("guia").populate("destino").populate("microbuses.microbus").exec(function(err,docs){
        console.log(docs);
        res.render("excursiones/index",{excursiones:docs});
    });*/
    modelos.Excursion.find({}).populate("guia").populate("destino").populate({"path":'microbuses',"populate":{"path":"propietario"}}).exec(function(err,docs){
        //console.log(docs);
        //res.json({excursiones:docs});
        res.render("excursiones/index",{excursiones:docs});
    });
};
// ### Transacciones de excursiones ###

// + Crear
// get
exports.getCrear= function(req,res){
    modelos.Asociado.find({puesto:"chofer"},function(err,choferes) {
      modelos.Asociado.find({puesto:"guia"},function(err,guias) {
        modelos.Microbus.find({}).populate("propietario").exec(function(err,docs) {
            modelos.Destinos.find({},function(err,destinos){
                res.render("excursiones/crear",{choferes:choferes,guias:guias,microbuses:docs,destinos:destinos});
            })            
        })
      })
    })
};

// post
exports.postCrear= function(req,res){
    var data={};
    data.guia= req.body.guia;
    data.chofer= req.body.chofer;
    data.destino= req.body.destino;
    data.cantMaxPersonas= req.body.cantMaxPersonas;
    data.fechaHoraSalida= req.body.fechaSalida;
    data.fechaHoraVuelta= req.body.fechaEntrada;
    data.fechaLimitePago= req.body.fechaLimitePago;
    data.comidas= req.body.comidas = utils.parseo(req.body.comidas);
    data.lugaresDeAbordaje= req.body.lugaresDeAbordaje = utils.parseo(req.body.lugares);    
    data.microbuses= req.body.microbuses = utils.parseo(req.body.listaMicrobus);
    data.costos= req.body.costos = [req.body.niño,req.body.adulto,req.body.terceraEdad];        
    modelos.Excursion.create(data, function(err,doc){
      if(err){
          console.log(err);
      }
      res.redirect("/excursiones");
  })
};

// Eliminar
// get
exports.getEliminar= function(req,res){
    modelos.Excursion.findByIdAndRemove(req.params.id, function(err, doc){
        res.redirect("/excursiones");
    });
};
