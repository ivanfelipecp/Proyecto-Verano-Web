var utils = require("../utils");
var modelos = require("../modelos");

exports.getPrincipal = function(req,res){
    res.render("admin/admin");
};

exports.postPrincipal = function(req,res){
    //res.render();
    if(req.body.password === utils.password){
        res.render("admin/index",{password: req.body.password});
    }
}

exports.postAsociados = function(req,res){
    //res.render();
    if(req.body.password === utils.password){
        //res.render("admin/asociados/index",{password: req.body.password});
        modelos.Asociado.find({}, function(err, docs){
            res.render("admin/asociados/index",{asociados:docs,password:req.body.password});
        });
    }
    else{
        res.render("admin/admin");
    }
}

exports.postDepositos = function(req,res){
    //res.render();
    if(req.body.password === utils.password){
        //res.render("admin/depositos/index",{password: req.body.password});
        modelos.Depositos.find({},function(err,docs){
            res.render("admin/depositos/index",{depositos:docs,password:req.body.password});
        });
    }
    else{
        res.render("admin/admin");
    }
}

exports.postDestinos = function(req,res){
    //res.render();
    if(req.body.password === utils.password){
        //res.render("admin/destinos/index",{password: req.body.password});
        modelos.Destinos.find({},function(err,docs){
            res.render("admin/destinos/index",{destinos:docs,password:req.body.password});
        });
    }
    else{
        res.render("admin/admin");
    }
}

exports.postExcursiones = function(req,res){
    if(req.body.password === utils.password){
        modelos.Excursion.find({}).populate("guia").populate("destino").populate({"path":'microbuses',"populate":{"path":"propietario"}}).exec(function(err,docs){
            res.render("admin/excursiones/index",{excursiones:docs,password:req.body.password});
        });
    }
    else{
        res.render("admin/admin");
    }
}

exports.postMicrobuses = function(req,res){
    //res.render();
    if(req.body.password === utils.password){
        //res.render("admin/microbuses/index",{password: req.body.password});
        modelos.Microbus.find({}).populate("propietario").exec(function(err,docs) {
            res.render("admin/microbuses/index",{microbuses:docs,password:req.body.password});
        });
    }
    else{
        res.render("admin/admin");
    }
}

exports.postReservaciones = function(req,res){
    //res.render();
    if(req.body.password === utils.password){
        //res.render("admin/reservaciones/index",{password: req.body.password});
        modelos.Reservaciones.find({}).populate("excursion").populate({"path":'depositos'}).exec(function(err,docs){
            console.log(docs);
            res.render("admin/reservaciones/index",{reservaciones:docs,password:req.body.password});
        });
    }
    else{
        res.render("admin/admin");
    }
}