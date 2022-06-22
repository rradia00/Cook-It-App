const exp = require('express');
var app = exp.Router();
const baseDatos = require('../models/ingredientes');
const validateToken = require('../middleware/validate-token');
//const ingredientesPlato = require('../models/ingredientesPlato');

app.get('/', validateToken, function (req, res){
    const ordenacion = req.body;
    console.log("Todos los ingredientes ordenados según " + ordenacion);
    baseDatos.find({}).exec(function(error, ingredientes){
        if(error){
            throw error;
        }
        res.send(ingredientes);
    });
});

app.put('/', validateToken, function (req, res){
    const {ingrediente, cantidad} = req.body;
    console.log("Actualizando las existencias del ingrediente " + ingrediente);
    baseDatos.find({}).exec( function(error, ingredientes){
        ingredientes.forEach(nota => {
            if(ingredientes.nombre===ingrediente){
                ingrediente.cantidad = cantidad;
                ingrediente.save();
            }
        });
    })
    res.send(req.body);
});

module.exports = app;