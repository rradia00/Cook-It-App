const mongoose = require('mongoose');

const user = new mongoose.Schema({
    _id: Object,
    user: String,
    password: String,
    type: String,
    administrator: Boolean
});

const Objeto = mongoose.model('users', user);

module.exports = Objeto;