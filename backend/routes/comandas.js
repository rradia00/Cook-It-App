const exp = require('express');
var app = exp.Router();
const mesas = require('../models/mesas');
const platos = require('../models/platos');
const comanda = require('../models/comandas');

const {ObjectID} = require('mongodb');//para convertir los string a objectId 

app.get("/", function(req, res){

    comanda.find({}).exec(function(error, platos){
        res.send(platos);
    });
});

app.post('/', async function (req, res){
    const {mesa} = req.body;
    console.log("Cargando los platos de la mesa "+ mesa);
    var idMesa = await buscaMesa(mesa);
    var platosComanda = await buscaComanda(idMesa);
    console.log(platosComanda);
    var listaPlatos = [];

    for(var i=0; i<platosComanda.length; i++){
        var plato = await buscaPlatos(platosComanda[i].plato);
        var entrada ={idPlato: platosComanda[i]._id, plato, proceso: platosComanda[i].proceso};
        listaPlatos.push(entrada);
    }
    console.log(listaPlatos);
    res.send(listaPlatos);
});

app.post('/todas', async function (req, res){
    console.log("Cargando todos los platos ");

    var listaPlatos = [];
    comanda.find({}).exec(async function(error, platosComanda){    
        for(var i=0; i<platosComanda.length; i++){
            var plato = await buscaPlatos(platosComanda[i].plato);
            var entrada ={idPlato: platosComanda[i]._id, plato, proceso: platosComanda[i].proceso};
            listaPlatos.push(entrada);
        }
        console.log(listaPlatos);
        res.send(listaPlatos);
    })
});

app.put('/modificar/:idPlato', function(req, res){
    var id = req.params.idPlato;
    var op = req.params.op;
    console.log("cambio de proceso para " + id);
    comanda.find({
       
    }).exec(function(error, platos){
        if(error)
            throw error;
        platos.forEach(plato => {
            console.log(plato._id + " " + id);
            if(plato._id==id){
                plato.proceso = plato.proceso + 1;
                plato.save();
                res.send(plato);
            }
        });
    })
})




 app.put('/nueva', function(req, res){
     console.log("nueva comanda");
    const {primeros, segundos, postres, bebidas, mesa} = req.body;

    mesaOcupada(mesa);

    primeros.forEach(plato => {
        const servicio = new comanda({_id: null, mesa: new ObjectID(mesa._id), plato: new ObjectID(plato._id), proceso: 0});
        servicio.save();
    });

    segundos.forEach(plato => {
        const servicio = new comanda({_id: null, mesa: new ObjectID(mesa._id), plato: new ObjectID(plato._id), proceso: 0});
        servicio.save();
    });

    postres.forEach(plato => {
        const servicio = new comanda({_id: null, mesa: new ObjectID(mesa._id), plato: new ObjectID(plato._id), proceso: 0});
        servicio.save();
    });

    bebidas.forEach(plato => {
        const servicio = new comanda({_id: null, mesa: new ObjectID(mesa._id), plato: new ObjectID(plato._id), proceso: 0});
        servicio.save();
    });
    res.send(primeros);
});



async function buscaComanda(idMesa){
    console.log("buscando los platos de la comanda");
    const promesa = new Promise((resolve, reject) => {
        comanda.find({
            mesa: idMesa
        }) .exec(function(error, platosComanda){
            if(error) 
                throw error;

            resolve(this.platosComanda = platosComanda);
        }); 
    });  
    return promesa;  
}  

async function buscaMesa(mesa){
    console.log("buscando la id de la mesa  " + mesa);
    const promesa = new Promise((resolve, reject) => {
       mesas.find({
          numero: mesa
       }).exec(function(error, mesaEncontrada){
          if(error){
             throw error;
          }
          resolve(this.id=mesaEncontrada[0]._id);
       })
    });
    return promesa
}

async function buscaPlatos(id){
    const promesa = new Promise((resolve, reject) => {
        platos.find({
            _id: id
        }).exec(function(error, plato){
            if(error){
                throw error;
            }
            resolve(this.plato = plato);
        })
    });
    return promesa; 
} 

function mesaOcupada(mesaOcupada){
    mesas.find({
    }).exec(function(error, mesa){
        mesa.forEach(element => {
            if(element.numero == mesaOcupada.numero){
                element.libre = false;
                element.save();
            }
        });

    });
}
module.exports = app;