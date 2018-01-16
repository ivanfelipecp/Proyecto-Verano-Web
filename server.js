// Servidor
var express = require("express");

// Parsear métodos post,delete
var bodyParser = require("body-parser");

// Simula métodos http
var methodOverride = require('method-override');

// Para usar mongo
var mongoose = require("mongoose");

// Variable que tiene el servidor
var app = express();
var port = 8000;

// Configuraciones
app.set("view engine","pug");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// Conexión a la BD
mongoose.connect('mongodb://localhost:27017/proyectoDB');

var Asociado = mongoose.model("asociado",
    {
        nombre: String,
        apellido: String,
        email: String,
        telefono: Number,
        puesto: String
    }
);

app.get("/", function(req,res){
    Asociado.find({}, function(err, docs){
        res.render("asociados/index",{asociados:docs});
    })
});

// Modificar
app.get("/asociados/modificar/:id",function(req,res){
    //console.log(req.body);
    Asociado.findById(req.params.id, function(err,doc){
        res.render("asociados/modificar",{asociado:doc});
    })
});

app.post("/asociados/modificar/:id", function(req,res){
    console.log(req.body);
    Asociado.findByIdAndUpdate(req.params.id, req.body ,function(err, doc){
        if(err){
            console.log(err);
        }
        res.redirect("/");
    });
});

app.get("/asociados/eliminar/:id",function(req,res){
    Asociado.findByIdAndRemove(req.params.id, function(err, doc){
        res.redirect("/");
    });
});


app.listen(port, function(){
    console.log("*** SERVER RUNNING ON PORT -> " + port);
});
