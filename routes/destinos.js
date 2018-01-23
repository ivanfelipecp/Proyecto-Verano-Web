var modelos = require("./modelos");
var utils = require("./utils");
var cloudinary = require("cloudinary");

exports.getPrincipal = function(req,res){
    modelos.Destinos.find({},function(err,docs){
        res.render("destinos/index",{destinos:docs});
    });
};

exports.getCrear = function(req,res){
    res.render("destinos/crear");
};

exports.postCrear = function(req, res){
    if(req.files.length > 0){ // Hay imágenes
        var urls = [];
        var cont = 0;
        for(var i = 0; i < req.files.length; i++){
            cloudinary.uploader.upload(req.files[i].path, function(result){
                cont++;
                urls.push(result.url);
                if(cont == req.files.length){
                    req.body.fotos = urls;
                    modelos.Destinos.create(req.body, function(err,doc){
                        if(err){
                            console.log(err);
                        }
                        res.redirect("/destinos");
                    });
                }
            });
        }
    }
    else{
        res.redirect("/destinos");
    }
};

exports.getEliminar = function(req,res){
    modelos.Destinos.findByIdAndRemove(req.params.id, function(err, doc){
        res.redirect("/destinos");
    });
};