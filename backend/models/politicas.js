const mongoose = require('mongoose');

const politicas = new mongoose.Schema({
    _id: Object,
    titulo: String,
    item: String,
});

const Objeto = mongoose.model('politicas', politicas);

module.exports = Objeto;