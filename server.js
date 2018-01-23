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
var asociados = require("./routes/asociados");
var microbuses = require("./routes/microbuses");
var excursiones = require("./routes/excursiones");
var admin = require("./routes/admin");
var client = require("./routes/client");

// Configuraciones
app.set("view engine","pug");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// Conexión a la BD
mongoose.connect('mongodb://heroku_45wgrpkj:cs3i3n46i4epjm2hi968q09678@ds111618.mlab.com:11618/heroku_45wgrpkj');//mongodb://localhost:27017/proyectoDB');

// ### Transacciones de asociados ###
// + Crear
// get
app.get("/asociados/crear", asociados.getCrear);
// post
app.post("/asociados/crear",asociados.postCrear);
// + Modificar
// get
app.get("/asociados/modificar/:id",asociados.getModificar);
// post
app.post("/asociados/modificar/:id",asociados.postModificar);
// Eliminar
// solo el get, ya que se hace directo por parametro
app.get("/asociados/eliminar/:id",asociados.getEliminar);
// Get principal
app.get("/asociados",asociados.getPrincipal);

// ### Transacciones de microbuses ###
// + Crear
// get
app.get("/microbuses/crear", microbuses.getCrear);
// post
app.post("/microbuses/crear", microbuses.postCrear);

// Eliminar
// solo el get, ya que se hace directo por parametro
app.get("/microbuses/eliminar/:id", microbuses.getEliminar);
// Get principal
app.get("/microbuses", microbuses.getPrincipal);

// Obtener el home page de los admin
//app.get("/admin", admin.getPrincipal());
app.get("/admin", function (req, res) {
    res.render("admin");
});

// Obtener el home page de los clientes
//app.get("/clientes", client.getPrincipal());
app.get("/clientes", function (req, res) {
    res.render("client");
});

app.listen(port, function(){
    console.log("*** SERVER RUNNING ON PORT -> " + port);
});
