const mongoose = require('mongoose');

const platos = new mongoose.Schema({
    _id: Object,
    nombre: String,
    ingredientes: String,
    precio: Number,
    alergenos: String,
    tipo: String,
});

const Objeto = mongoose.model('platos', platos);

module.exports = Objeto;