const mongoose = require('mongoose');

const nuevoIngrediente = new mongoose.Schema({
    nombre: String,
    cantidad: Number,
    alergenos: String,
    fAct: Date,
    fCre: Date,
});

const Objeto = mongoose.model('nuevoIngrediente', nuevoIngrediente);

module.exports = Objeto;