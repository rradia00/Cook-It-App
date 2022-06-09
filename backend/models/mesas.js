const mongoose = require('mongoose');

const mesa = new mongoose.Schema({
    _id: Object,
    numero: Number,
    libre: Boolean,
});

const Objeto = mongoose.model('mesa', mesa);

module.exports = Objeto;