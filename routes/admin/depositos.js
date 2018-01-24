var modelos = require("../modelos");
var utils = require("../utils");
var cloudinary = require("cloudinary");

exports.getPrincipal = function(req,res){
    modelos.Depositos.find({},function(err,docs){
        res.render("admin/depositos/index",{depositos:docs});
    });
};

exports.getCrear = function(req,res){
    if(req.body.password == utils.password){
        res.render("admin/depositos/crear");
    }
    else{
        res.redirect("/admin");
    }
    
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
                    modelos.Depositos.create(req.body, function(err,doc){
                        if(err){
                            console.log(err);
                        }
                        //res.redirect("/depositos");
                        modelos.Depositos.find({},function(err,docs){
                            res.render("admin/depositos/index",{depositos:docs,password:req.body.password});
                        });
                    });
                }
            });
        }
    }
    else{
        res.redirect("/admin");
    }
};

exports.getEliminar = function(req,res){
    modelos.Depositos.findByIdAndRemove(req.params.id, function(err, doc){
        //res.redirect("/depositos");
        modelos.Depositos.find({},function(err,docs){
            res.render("admin/depositos/index",{depositos:docs,password:req.body.password});
        });
    });
};