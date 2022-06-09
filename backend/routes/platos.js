const exp = require('express');
var app = exp.Router();
const platos = require('../models/platos');

app.get('/primeros', async function (req, res){
   platos.find({
      tipo: "Primero"
   }).exec(function(error, platos){
      res.send(platos);
   });
});

app.get('/segundos', async function (req, res){
   platos.find({
      tipo: "Segundo"
   }).exec(function(error, platos){
      res.send(platos);
   });
});

app.get('/postres', async function (req, res){
   platos.find({
      tipo: "Postre"
   }).exec(function(error, platos){
      res.send(platos);
   });
});

app.get('/bebidas', async function (req, res){
   platos.find({
      tipo: "Bebida"
   }).exec(function(error, platos){
      res.send(platos);
   });
});

app.post('/', async function (req, res){
   const id = req.body.id
   platos.find({
   }).exec(function(error, platos){
      res.send(platos);
   });
});

module.exports = app;