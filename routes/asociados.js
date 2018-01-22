var modelos = require("./modelos");
// ### Transacciones de modelos.Asociados ###

// + Crear
// get
exports.getCrear= function(req,res){
    res.render("asociados/crear");
};

// post
exports.postCrear= function(req,res){
    modelos.Asociado.create(req.body, function(err,doc){
        if(err){
            console.log(err);
        }
        res.redirect("/");
    })
};

// + Modificar
// get
exports.getModificar = function(req,res){
    //console.log(req.body);
    modelos.Asociado.findById(req.params.id, function(err,doc){
        res.render("asociados/modificar",{asociado:doc});
    })
};

// post
exports.postModificar= function(req,res){
    console.log(req.body);
    modelos.Asociado.findByIdAndUpdate(req.params.id, req.body ,function(err, doc){
        if(err){
            console.log(err);
        }
        res.redirect("/");
    });
};

// Eliminar
// solo el get, ya que se hace directo por parametro
exports.getEliminar= function(req,res){
    modelos.Asociado.findByIdAndRemove(req.params.id, function(err, doc){
        res.redirect("/");
    });
};

// Get principal
exports.getPrincipal= function(req,res){
    modelos.Asociado.find({}, function(err, docs){
        res.render("asociados/index",{asociados:docs});
    })
};
