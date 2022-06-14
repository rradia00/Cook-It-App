const mongoose = require('mongoose');

const mesa = new mongoose.Schema({
    _id: Object,
    numero: Number,
    libre: Boolean,
    fAct: Date,
    fCre: Date,
});

const Objeto = mongoose.model('mesa', mesa);

module.exports = Objeto;