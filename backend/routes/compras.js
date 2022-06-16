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
   res.send(ingrediente);
});

async function actualizaProducto(ingrediente, cantidad){
   let now = new Date();
   ingredientes.find({
      nombre: ingrediente
   }).exec( async function(error, localizado){
      localizado.forEach(element =>{
         element.cantidad = element.cantidad + Number(cantidad);
         element.fAct = now;
         element.save();
      })
      
   })
}

app.put('/nuevo', async function (req, res){
   const {ingrediente, cantidad, alergenos} = req.body;
   console.log("Añadiendo el ingrediente: " + ingrediente + " cantidad: " + cantidad + " alergenos: " + alergenos);
   await nuevoProducto(ingrediente, cantidad, alergenos);
   res.send(ingrediente);
});

async function nuevoProducto(ingrediente, cantidad, alergenos){
   let now = new Date();
   const ingr = new ingredientes({_id:null, nombre: ingrediente, alergenos: alergenos, cantidad: cantidad, fAct: now, fCre: now});  
   ingr.save();
}

module.exports = app;