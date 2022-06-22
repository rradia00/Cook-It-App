const exp = require('express');
var app = exp.Router();
const baseDatos = require('../models/user');
const validateToken = require('../middleware/validate-token');

app.get('/', validateToken, function (req, res){
    console.log("Todos los usuarios");
    baseDatos.find({}).exec(function(error, usuarios){
        if(error){
            throw error;
        }
        res.send(usuarios);
    });
});

axios.post("http://localhost:3053/usuarios", {
            user: candidato.nombre,
            password: candidato.clave,
            type: candidato.puesto,
            token: localStorage.getItem("jwt"),
        }).then(response=>{

        });

app.post('/', validateToken, function(req, res){
    let now = new Date();
    const {user, password, type} = req.body;
    console.log("Añadiendo al nuevo trabajador " + user + " " + type);
    const nuevo = new baseDatos({_id: null, user: user, password, password, type: type, fAct: now, fCre: now});
    nuevo.save();
});

module.exports = app;