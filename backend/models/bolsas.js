const mongoose = require('mongoose');

const bolsa = new mongoose.Schema({
    _id: Object,
    puesto: String,
    nombre: String,
    apellidos: String,
    direccion: String,
    localidad: String,
    telefono: String,
    pais: String,
    clave: String,
    fAct: Date,
    fCre: Date,
});

const Objeto = mongoose.model('bolsa', bolsa);

module.exports = Objeto;