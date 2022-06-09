const mongoose = require('mongoose');

const comandas = new mongoose.Schema({
    _id: Object,
    mesa: Object,
    plato: Object,
    proceso: Number,
});

const Objeto = mongoose.model('comandas', comandas);

module.exports = Objeto;