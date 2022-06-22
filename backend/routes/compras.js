const exp = require('express');
var app = exp.Router();
const ingredientes = require('../models/ingredientes');

app.get('/', validateToken, async function (req, res){
   console.log("Recuperando los ingredientes de la base de datos");
   ingredientes.find({
   }).exec(function(error, ingredientes){
      res.send(ingredientes);
   });
});

app.post('/', validateToken, async function (req, res){
   const {ordenado, sentido} = req.body;
   console.log("Recuperando los ingredientes de la base de datos");
   console.log("ordenacion " + ordenado + " en " + sentido);
   if(ordenado==null){
      ingredientes.find({
      }).exec(function(error, ingredientes){
         res.send(ingredientes);
      });
   }else{
      var mysort;
      if(ordenado=="cantidad" && sentido=="1") mysort = {cantidad: 1};
      else if(ordenado=="cantidad" && sentido=="-1") mysort = {cantidad: -1};
      else if(ordenado=="nombre" && sentido=="1") mysort = {nombre: 1};
      else if(ordenado=="nombre" && sentido=="-1") mysort = {nombre: -1};
      else if(ordenado=="fCre" && sentido=="1") mysort = {fCre: 1};
      else if(ordenado=="fCre" && sentido=="-1") mysort = {fCre: -1};
      else if(ordenado=="fAct" && sentido=="1") mysort = {fAct: 1};
      else if(ordenado=="fAct" && sentido=="-1") mysort = {fAct: -1};
      ingredientes.find({
      }).sort(mysort).exec(function(error, ingredientes){
         res.send(ingredientes);
      });
   }
});

app.put('/', validateToken, async function (req, res){
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

app.put('/nuevo', validateToken, async function (req, res){
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