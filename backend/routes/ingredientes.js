const exp = require('express');
var app = exp.Router();
const baseDatos = require('../models/ingredientes');

app.get('/', function (req, res){
    const ordenacion = req.body;
    console.log("Todos los ingredientes ordenados según " + ordenacion);
    baseDatos.find({}).exec(function(error, ingredientes){
        if(error){
            throw error;
        }
        res.send(ingredientes);
    });
});

module.exports = app;