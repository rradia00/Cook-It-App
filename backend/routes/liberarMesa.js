const exp = require('express');
var app = exp.Router();
const mesas = require('../models/mesas');
const comanda = require('../models/comandas');
const validateToken = require('../middleware/validate-token');

app.post('/', validateToken, async function (req, res){
    const {mesa} = req.body;
    console.log("Liberando la mesa: " + mesa);
    const mesaEncontrada = await buscaMesa(mesa);
    await borrarPlatos(mesaEncontrada._id);
    liberarMesa(mesa);
    res.send(mesaEncontrada);
});

async function buscaMesa(limpiar){
    console.log("buscando la id de la mesa  " + limpiar);
    const promesa = new Promise((resolve, reject) => {
       mesas.find({
          numero: limpiar
       }).exec(function(error, mesaEncontrada){
          if(error){
             throw error;
          }
          resolve(this.id=mesaEncontrada[0]);
       })
    });
    return promesa
}

async function borrarPlatos(limpiar){
    console.log("Borrando los platos de la mesa  " + limpiar);
    comanda.find({
        mesa: limpiar
    }).exec(function(error, platos){
        if(error){
            throw error;
        }
        platos.forEach(element => {
            comanda.deleteOne({
                _id: element._id,
                mesa: limpiar,
                plato: element.plato
             }).exec(() => {});
        });
    })
}

function liberarMesa(limpiar){
    console.log("cambiado el estado de la mesa " + limpiar)
    mesas.find({
    }).exec(function(error, mesa){
        mesa.forEach(element => {
            console.log(element);
            if(element.numero == limpiar){
                console.log(element.numero + "**************************** "  + limpiar);
                element.libre = true;
                console.log(element);
                element.save();
            }
        });

    });
}

module.exports = app;