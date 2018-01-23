var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/proyectoDB');

exports.Asociado = mongoose.model("asociado",
    {
        nombre: String,
        apellido: String,
        email: String,
        telefono: Number,
        puesto: String
    }
);

exports.Microbus = mongoose.model("Microbus",
    {
        propietario:{"type":mongoose.Schema.Types.ObjectId,ref:"asociado"},
        estadoMecanico: String,
        servicios: Array
    }
);

exports.Excursion = mongoose.model("excursion",
    {
        guia:{"type":mongoose.Schema.Types.ObjectId,ref:"asociado"},
        chofer:{"type":mongoose.Schema.Types.ObjectId,ref:"asociado"},
        cantMaxPersonas: Number,
        microbuses: Array,
        fechaHoraSalida: Date,
  	    lugaresDeAbordaje: Array,
  	    fechaHoraVuelta: Date,
        costos: Array,
        comidas: Array
    }
);

exports.Destinos = mongoose.model("destino",
    {
        nombre:String,
        provincia: String,
        fotos:Array
    }
);
