const exp = require('express');
var app = exp.Router();
const baseDatos = require('../models/bolsas');
const hashMode = require('blueimp-md5/js/md5.min.js');

app.get('/', function (req, res){
    baseDatos.find({}).exec(function(error, usuarios){
        res.send(usuarios);
    });
})

app.get('/:numero', function (req, res){
    const numero = req.params.numero;

    console.log("buscando al candidato en la posicion " + numero);
    baseDatos.find({}).exec(function(error, usuarios){
        var contador = 0;
        usuarios.forEach(usuario =>{
            console.log(usuario + " " + contador + " " + numero);
            if(contador == numero){
                console.log(usuario);
                res.send(usuario);
            }
            contador = contador + 1;
        })
    });
})


app.delete('/', function(req, res){
    const {nombre, apellidos, telefono} = req.body;
    console.log("borrando al candidato " + nombre + " " + apellidos +" de la bolsa de trabajo");
    nota.deleteOne({
        nombre: nombre,
        apellidos: apellidos,
        telefono: telefono
     }).exec(() => {});
});

app.post('/', function (req, res){
    const {puesto, nombre, apellidos, direccion, localidad, telefono, pais, clave} = req.body;
    console.log("Nuevo candidato de trabajador de hostelería postula al puesto de " + puesto);
    console.log(nombre + " " + apellidos + " " + direccion + " " + localidad + " " + telefono + " " + pais + " " + clave);
    const pass = hashMode(clave);
    let now = new Date();
    baseDatos.find({
        nombre: nombre,
        apellidos: apellidos
    }).exec(function(error, usuarios){
        if(error){
            throw error;
        }
        console.log(usuarios);
        if(usuarios.length>0){
            console.log("Usuario ya está en la base de datos");
            res.send(usuarios);
        }else{
            const usuario = new baseDatos({_id: null, puesto: puesto, nombre: nombre, apellidos: apellidos, direccion: direccion, 
                                            localidad: localidad, telefono: telefono, pais: pais, clave: pass, fCre: now, fAct: now});
            usuario.save();
            res.send(usuarios);
        }
    });
});

module.exports = app;