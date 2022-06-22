const exp = require('express');
var app = exp.Router();
const politicas = require('../models/politicas');
const validateToken = require('../middleware/validate-token');


app.get("/", validateToken, function(req, res){
    console.log("carga de terminos y condiciones de uso");
    politicas.find({}).exec(function(error, condiciones){
        if(error) 
            throw error;
        res.send(condiciones);
    });
});
module.exports = app;