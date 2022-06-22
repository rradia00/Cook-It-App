const exp = require('express');
const hashMode = require('blueimp-md5/js/md5.min.js');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
var app = exp.Router();
const usuario = require('../models/user');
dotenv.config();


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
        let jwtTokenSecret = process.env.TOKEN_SECRET;
        let data = {
            time: Date(),
            userId: usuarios[0]._id,
        }
  
        const token = jwt.sign(data, jwtTokenSecret);
        const response = {
            user: usuarios[0].user,
            type: usuarios[0].type,
            administrator: usuarios[0].administrator,
            token: token
        }

        res.send(response);
    });
});

module.exports = app;