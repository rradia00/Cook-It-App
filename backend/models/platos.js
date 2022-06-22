const mongoose = require('mongoose');

const platos = new mongoose.Schema({
    _id: Object,
    nombre: String,
    ingredientes: String,
    cantidades: Array,
    precio: Number,
    alergenos: String,
    tipo: String,
    fAct: Date,
    fCre: Date,
    
});

const Objeto = mongoose.model('platos', platos);

module.exports = Objeto;