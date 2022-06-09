const exp = require('express');
var app = exp.Router();
const baseDatos = require('../models/user');

app.get('/', function (req, res){
    console.log("Todos los usuarios");
    baseDatos.find({}).exec(function(error, usuarios){
        if(error){
            throw error;
        }
        res.send(usuarios);
    });
});

module.exports = app;