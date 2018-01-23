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

exports.Microbus = mongoose.model("microbus",
    {
        propietario:{"type":mongoose.Schema.Types.ObjectId,ref:"asociado"},
        estadoMecanico: String,
        servicios: Array
    }
);


exports.Excursion = mongoose.model("excursion",
    {
        guia:{"type":mongoose.Schema.Types.ObjectId,ref:"asociado"},  
        destino:{"type":mongoose.Schema.Types.ObjectId,ref:"destino"},         
        cantMaxPersonas: Number,
        microbuses: [{"type":mongoose.Schema.Types.ObjectId,ref:"microbus"}],
        fechaHoraSalida: Date,
  	    lugaresDeAbordaje: Array,
  	    fechaHoraVuelta: Date,
        costos: Array,
        comidas: Array
    }
);


exports.Reservaciones = mongoose.model("reservacion",
    {
        excursion: {"type":mongoose.Schema.Types.ObjectId,ref:"excursion"},   
        tipoTurista: String,
        monto: Number,
        saldo: Number, 
        depositos: Array,  
	    estado: String,	    
	    fechaMaxPago: Date
    }
);

exports.Destinos = mongoose.model("destino",
    {
        nombre:String,
        provincia: String,
        fotos:Array
    }
);

exports.Depositos = mongoose.model("deposito",
    {
        montoAbonado:Number,
        fotos:Array
    }
);
