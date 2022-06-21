const exp = require('express');
const cors = require('cors');
const connectionDB = require('./config/connection');
var app = exp();

connectionDB();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors());

//redireccionamientos
app.use('/login', require('./routes/login'));
app.use('/:camarero/mesas', require('./routes/mesas'));
app.use('/:camarero/mesas/:mesa',  require('./routes/mesas'));
app.use('/platos', require('./routes/platos'));
app.use('/:camarero/comandas', require('./routes/comandas'));
app.use('/:camarero/liberar', require('./routes/liberarMesa'));
app.use('/ingredientes', require('./routes/compras'));
app.use('/terminos', require('./routes/terminos'));
app.use('/ingredientes', require('./routes/ingredientes'));
app.use('/bolsa', require('./routes/bolsa'));
app.use('/bolsa/candidato', require('./routes/bolsa'));
app.use('/usuarios', require('./routes/users'));

if(process.env.NODE_ENV === "production"){
    app.use(exp.static("../frontend/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
    });
}

/*const PORT = process.env.PORT || 3053;
app.listen(PORT, () => console.log("Puerto escuchado el 3053"));*/

app.listen(3053, function(){
    console.log("Puerto en el 3053, vayan pasando");
})