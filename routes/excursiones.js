// ### Transacciones de excursiones ###
var modelos = require("./modelos");
// Get principal
exports.getPrincipal= function(req,res){
    modelos.Excursion.find({}, function(err, docs){
        res.render("e/index",{asociados:docs});
    })
};
