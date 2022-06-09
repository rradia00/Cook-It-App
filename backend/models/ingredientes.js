const mongoose = require('mongoose');

const ingrediente = new mongoose.Schema({
    _id: Object,
    nombre: String,
    cantidad: Number,
    alergenos: String
});

const Objeto = mongoose.model('ingrediente', ingrediente);

module.exports = Objeto;