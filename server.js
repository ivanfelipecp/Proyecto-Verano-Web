// Servidor
var express = require("express");

// Parsear métodos post,delete
var bodyParser = require("body-parser");

// Simula métodos http
var methodOverride = require('method-override');

// Para usar mongo
var mongoose = require("mongoose");

// Para usar cloudinary
var cloudinary = require("cloudinary");
var multer = require('multer');

// Variable que tiene el servidor
var app = express();
var port = 8000;
var asociados = require("./routes/asociados");
var microbuses = require("./routes/microbuses");
var excursiones = require("./routes/excursiones");
var destinos = require("./routes/destinos");

// Configuraciones
app.set("view engine","pug");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(multer({dest: "./uploads"}).array("fotos"));

cloudinary.config({
	cloud_name: "ivanfelipecp",
	api_key: "828139415984935",
	api_secret: "DZ9DtVWg6QTTwkU1-g67qJDDgJU"
});

// ### Asociados ###
app.get("/asociados/crear", asociados.getCrear);
app.post("/asociados/crear",asociados.postCrear);
app.get("/asociados/modificar/:id",asociados.getModificar);
app.post("/asociados/modificar/:id",asociados.postModificar);
app.get("/asociados/eliminar/:id",asociados.getEliminar);
app.get("/asociados",asociados.getPrincipal);

// ### Microbuses ###
app.get("/microbuses/crear", microbuses.getCrear);
app.post("/microbuses/crear", microbuses.postCrear);
app.get("/microbuses/eliminar/:id", microbuses.getEliminar);
app.get("/microbuses", microbuses.getPrincipal);

// ### excursiones ###

app.get("/excursiones", excursiones.getPrincipal);
app.get("/excursiones/crear", excursiones.getCrear);
app.post("/excursiones/crear",excursiones.postCrear);
app.get("/excursiones/eliminar/:id", excursiones.getEliminar);


// ### Destinos ###
app.get("/destinos", destinos.getPrincipal);
app.get("/destinos/crear", destinos.getCrear);
app.post("/destinos/crear", destinos.postCrear);
app.get("/destinos/eliminar/:id",destinos.getEliminar);

app.listen(port);

console.log("*** SERVER RUNNING ON PORT -> " + port);
