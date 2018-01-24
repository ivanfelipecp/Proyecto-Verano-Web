var modelos = require("../modelos");
var utils = require("../utils");


exports.getReservar= function(req,res){        
    res.render("clientes/reservaciones/crear",{excursion:req.params.id});    
}

exports.postReservar = function(req,res){   
    modelos.Excursion.findById(req.params.id).populate("guia").populate("destino").populate({"path":'microbuses',"populate":{"path":"propietario"}}).exec(function(err,doc){        
        if(doc.cantMaxPersonas>0){            
            var cupo= doc.cantMaxPersonas - 1 ;
            var data={};
            var codigo= utils.generateRandomCode();            
            data.excursion=req.params.id;  
            data.nombre= req.body.nombre;              
            data.cedula= req.body.cedula;
            data.tipoTurista=req.body.tipoTurista;
            data.codigo=codigo;
            data.estado="pendiente";
            modelos.Reservaciones.create(data, function(err,doc){
                if(err){
                    console.log(err);
                }
                modelos.Excursion.findOneAndUpdate({_id: req.params.id}, {$set:{cantMaxPersonas:cupo}},{ new: true },function(err, d){
                    if(err){
                        console.log("Something wrong when updating data!");
                    }
                    //res.json({reservacion:doc});
                    modelos.Reservaciones.find({}).populate({"path":'excursion',"populate":{"path":"destino"}}).populate({"path":'depositos'}).exec(function(err,docs){
                        //res.render("clientes/reservaciones/index",{reservaciones:docs});
                        res.json({reservaciones:docs});
                    });
                });    
            });                     
        }        
    });
    
    //data.excursion=req.params.id;
    //data.tipoTurista=req.body.tipoTurista;

    //modelos.Reservaciones.create()
}