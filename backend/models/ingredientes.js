const mongoose = require('mongoose');

const ingrediente = new mongoose.Schema({
    _id: Object,
    nombre: String,
    cantidad: Number,
    alergenos: String,
    fAct: Date,
    fCre: Date,
});

const Objeto = mongoose.model('ingrediente', ingrediente);

module.exports = Objeto;