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

var parseo = function(lista) {
    return lista.split(',');
}

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

var Microbus = mongoose.model("Microbus",
    {
        propietario: mongoose.Schema.Types.ObjectId,
        estadoMecanico: String,
        servicios: Array
    }
);

// ### Transacciones de asociados ###

// + Crear
// get
app.get("/asociados/crear", function(req,res){
    res.render("asociados/crear");
});

// post
app.post("/asociados/crear", function(req,res){
    Asociado.create(req.body, function(err,doc){
        if(err){
            console.log(err);
        }
        res.redirect("/");
    })
});

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

// Eliminar
// solo el get, ya que se hace directo por parametro
app.get("/asociados/eliminar/:id",function(req,res){
    Asociado.findByIdAndRemove(req.params.id, function(err, doc){
        res.redirect("/");
    });
});

// Get principal
app.get("/asociados", function(req,res){
    Asociado.find({}, function(err, docs){
        res.render("asociados/index",{asociados:docs});
    })
});

// ### Transacciones de microbuses ###

// + Crear
// get
app.get("/microbuses/crear", function(req,res){
    Asociado.find({puesto:"chofer"},function(err,docs) {
        res.render("microbuses/crear",{choferes:docs});
    })
});

// post
app.post("/microbuses/crear", function(req,res){
    req.body.servicios = parseo(req.body.servicios);
    Microbus.create(req.body, function(err,doc){
      if(err){
          console.log(err);
      }
      res.redirect("/microbuses");
  })
});
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
app.get("/microbuses/eliminar/:id",function(req,res){
    Microbus.findByIdAndRemove(req.params.id, function(err, doc){
        res.redirect("/microbuses");
    });
});

// Get principal
app.get("/microbuses", function(req,res){
    Microbus.find({}, function(err, docs){
        docs.forEach(function(doc) {
            Asociado.findById(doc.propietario,function(err,d) {
                docs["chofer"]=d.nombre;
                console.log(doc);
            })
            //docs.chofer="lol";
        })
        res.render("microbuses/index",{microbuses:docs});
    })
});

app.listen(port, function(){
    console.log("*** SERVER RUNNING ON PORT -> " + port);
});
