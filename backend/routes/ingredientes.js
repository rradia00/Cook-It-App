const exp = require('express');
var app = exp.Router();
const baseDatos = require('../models/ingredientes');

app.get('/', function (req, res){
    console.log("Todos los ingredientes");
    baseDatos.find({}).exec(function(error, ingredientes){
        if(error){
            throw error;
        }
        res.send(ingredientes);
    });
});

module.exports = app;