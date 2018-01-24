var modelos = require("../modelos");
var utils = require("../utils");
// ### Transacciones de modelos.Asociados ###

// + Crear
// get
exports.getCrear= function(req,res){
    if(req.body.password === utils.password){
        res.render("admin/asociados/crear");
    }
    else{
        res.redirect("/admin");
    }
};

// post
exports.postCrear= function(req,res){
    modelos.Asociado.create(req.body, function(err,doc){
        if(err){
            console.log(err);
        }
        //res.redirect("/admin");
        modelos.Asociado.find({}, function(err, docs){
            res.render("admin/asociados/index",{asociados:docs,password:req.body.password});
        });
    })
};

// + Modificar
// get
exports.getModificar = function(req,res){
    //console.log(req.body);
    modelos.Asociado.findById(req.params.id, function(err,doc){
        res.render("admin/asociados/modificar",{asociado:doc});
    })
};

// post
exports.postModificar= function(req,res){
    console.log(req.body);
    modelos.Asociado.findByIdAndUpdate(req.params.id, req.body ,function(err, doc){
        if(err){
            console.log(err);
        }
        //res.redirect("/");
        modelos.Asociado.find({}, function(err, docs){
            res.render("admin/asociados/index",{asociados:docs,password:req.body.password});
        });
    });
};

// Eliminar
// solo el get, ya que se hace directo por parametro
exports.getEliminar= function(req,res){
    modelos.Asociado.findByIdAndRemove(req.params.id, function(err, doc){
        //res.redirect("/");
        modelos.Asociado.find({}, function(err, docs){
            res.render("admin/asociados/index",{asociados:docs,password:req.body.password});
        });
    });
};

// Get principal
/*exports.getPrincipal= function(req,res){
    modelos.Asociado.find({}, function(err, docs){
        res.render("admin/asociados/index",{asociados:docs});
    })
};*/
