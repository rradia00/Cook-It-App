const exp = require('express');
const hashMode = require('blueimp-md5/js/md5.min.js');

var app = exp.Router();
const usuario = require('../models/user');

app.post('/', function (req, res){
    const {user, password} = req.body;
    console.log(password);
    const hash = hashMode(password);
    console.log("intentando log para " + user+ " " + hash);
    usuario.find({
        user: user,
        password: hash
    }).exec(function(error, usuarios){
        if(error){
            throw error;
        }

        console.log(usuarios);

        const response = {
            user: usuarios[0].user,
            type: usuarios[0].type,
            administrator: usuarios[0].administrator
        }

        res.send(response);
    });
});

module.exports = app;