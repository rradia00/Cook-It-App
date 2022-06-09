const exp = require('express');
var app = exp.Router();
const ingredientes = require('../models/ingredientes');

app.get('/', async function (req, res){
   console.log("Recuperando los ingredientes de la base de datos");
   ingredientes.find({
   }).exec(function(error, ingredientes){
      res.send(ingredientes);
   });
});

app.put('/', async function (req, res){
   const {ingrediente, cantidad} = req.body;
   console.log("actualizando " + ingrediente + " en " + cantidad);
   await actualizaProducto(ingrediente, cantidad);
});

async function actualizaProducto(ingrediente, cantidad){
   ingredientes.find({
      nombre: ingrediente
   }).exec( async function(error, localizado){
      localizado.forEach(element =>{
         element.cantidad = element.cantidad + Number(cantidad);
         element.save();
      })
      
   })
}

module.exports = app;