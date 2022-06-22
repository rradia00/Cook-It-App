const exp = require('express');
var app = exp.Router();
const platos = require('../models/platos');

app.post('/', validateToken, async function (req, res){
   const {ordenado, sentido} = req.body;
   console.log("Recuperando los ingredientes de la base de datos");
   console.log("ordenacion " + ordenado + " en " + sentido);
   if(ordenado==null){
      platos.find({
      }).exec(function(error, platos){
         res.send(platos);
      });
   }else{
      var mysort;
      if(ordenado=="nombre" && sentido=="1") mysort = {nombre: 1};
      else if(ordenado=="nombre" && sentido=="-1") mysort = {nombre: -1};
      else if(ordenado=="precio" && sentido=="1") mysort = {precio: 1};
      else if(ordenado=="precio" && sentido=="-1") mysort = {precio: -1};
      else if(ordenado=="tipo" && sentido=="1") mysort = {tipo: 1};
      else if(ordenado=="tipo" && sentido=="-1") mysort = {tipo: -1};
      else if(ordenado=="fAct" && sentido=="1") mysort = {fAct: 1};
      else if(ordenado=="fAct" && sentido=="-1") mysort = {fAct: -1};
      platos.find({
      }).sort(mysort).exec(function(error, platos){
         res.send(platos);
      });
   }
});

app.get('/primeros', validateToken, async function (req, res){
   platos.find({
      tipo: "Primero"
   }).exec(function(error, platos){
      res.send(platos);
   });
});

app.get('/segundos', validateToken, async function (req, res){
   platos.find({
      tipo: "Segundo"
   }).exec(function(error, platos){
      res.send(platos);
   });
});

app.get('/postres', validateToken, async function (req, res){
   platos.find({
      tipo: "Postre"
   }).exec(function(error, platos){
      res.send(platos);
   });
});

app.get('/bebidas', validateToken, async function (req, res){
   platos.find({
      tipo: "Bebida"
   }).exec(function(error, platos){
      res.send(platos);
   });
});

app.post('/', validateToken, async function (req, res){
   const id = req.body.id
   platos.find({
   }).exec(function(error, platos){
      res.send(platos);
   });
});

module.exports = app;