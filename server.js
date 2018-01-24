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
var asociados = require("./routes/admin/asociados");
var microbuses = require("./routes/admin/microbuses");
var excursiones = require("./routes/admin/excursiones");
var destinos = require("./routes/admin/destinos");
var reservaciones = require("./routes/admin/reservaciones");
var depositos = require("./routes/admin/depositos");
var destinosClientes = require("./routes/clientes/destinos");
var excursionesClientes = require("./routes/clientes/excursiones");
var admin = require("./routes/admin/admin");

//var admin = require("./routes/admin");
var client = require("./routes/clientes/client");

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

// Conexión a la BD
// mongo ds111618.mlab.com:11618/heroku_45wgrpkj -u heroku_45wgrpkj -p cs3i3n46i4epjm2hi968q09678
//mongoose.connect('mongodb://heroku_45wgrpkj:cs3i3n46i4epjm2hi968q09678@ds111618.mlab.com:11618/heroku_45wgrpkj');//mongodb://localhost:27017/proyectoDB');

// ### Asociados ###
app.post("/asociados/nuevo", asociados.getCrear);
app.post("/asociados/crear",asociados.postCrear);
app.get("/asociados/modificar/:id",asociados.getModificar);
app.post("/asociados/modificar/:id",asociados.postModificar);
app.get("/asociados/eliminar/:id",asociados.getEliminar);
//app.get("/asociados",asociados.getPrincipal);

// ### Microbuses ###
app.post("/microbuses/nuevo", microbuses.getCrear);
app.post("/microbuses/crear", microbuses.postCrear);
app.get("/microbuses/eliminar/:id", microbuses.getEliminar);
//app.get("/microbuses", microbuses.getPrincipal);

// ### excursiones ###

//app.get("/excursiones", excursiones.getPrincipal);
app.post("/excursiones/nuevo", excursiones.getCrear);
app.post("/excursiones/crear",excursiones.postCrear);
app.get("/excursiones/eliminar/:id", excursiones.getEliminar);
//app.get("/excursiones/reservar/:id", excursiones.getReservaciones);

// ### reservaciones ###
//app.get("/reservaciones", reservaciones.getPrincipal);
app.post("/reservaciones/nuevo", reservaciones.getCrear);
app.post("/reservaciones/crear",reservaciones.postCrear);
app.get("/reservaciones/eliminar/:id", reservaciones.getEliminar);

// ### Destinos ###
//app.get("/destinos", destinos.getPrincipal);
app.post("/destinos/nuevo", destinos.getCrear);
app.post("/destinos/crear", destinos.postCrear);
app.get("/destinos/eliminar/:id",destinos.getEliminar);

// ### Depositos ###
//app.get("/depositos", depositos.getPrincipal);
app.post("/depositos/nuevo", depositos.getCrear);
app.post("/depositos/crear", depositos.postCrear);
app.get("/depositos/eliminar/:id",depositos.getEliminar);

// ### Admin ###
app.get("/admin", admin.getPrincipal);
app.post("/admin", admin.postPrincipal);
app.post("/admin/asociados", admin.postAsociados);
app.post("/admin/destinos",admin.postDestinos);
app.post("/admin/excursiones",admin.postExcursiones);
app.post("/admin/microbuses",admin.postMicrobuses);
app.post("/admin/reservaciones",admin.postReservaciones);
app.post("/admin/depositos",admin.postDepositos);

// #### -------- ####
// #### Clientes ####
// #### -------- ####



app.listen(port);

console.log("*** SERVER RUNNING ON PORT -> " + port);
