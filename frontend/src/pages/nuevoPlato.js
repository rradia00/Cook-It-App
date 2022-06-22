import * as React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Restaurant from '@mui/icons-material/Restaurant';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Component from '../components/ingredientesPlato';
import Pie from '../components/pie';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                www.grupoInnova6d.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const theme = createTheme();
const tipoPlato = ['Primero', 'Segundo', 'Postre', 'Bebida'];
const ingredientes = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];
export default function App() {
    const admin = sessionStorage.getItem('usuario');
    const [salir, setSalir]=useState(false);
    const [cardIngredientes, setCardIngredientes]=useState([]);
    const [numeroIngredientes, setNumeroIngredientes]=useState();
    const [ingredientesPlato, setIngredientesPlato]=useState([]);
    const [cantidades, setCantidades]=useState([]);
    const [alergenos, setAlergenos]=useState([]);

    const [platos, setPlatos]=useState([]);
    const [tipoPlatoSeleccionado, setTipoPlatoSeleccionado]=useState();
     
    const Navigate = useNavigate();
    useEffect(() => {
        cargarPlatos();
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleSubmit = (event) => {
        if(salir===false){
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            var nombre =data.get('nombre');
            //compruebo que los platos no están en la base de datos
            platos.forEach(plat =>{
                if(plat===nombre){
                    alert("El plato ya está en la base de datos");
                    nombre="";
                }
            });
            
            if(nombre!==""){
                unoMas(data);
            }
        }
        salida();
    };
    function colocaComponentes(cantidad){
        var numero=[];
        for (var i = 0; i < cantidad; i++) {
            numero.push(i+1); 
            ingredientes.push(null);
            cantidades.push(null);    
            alergenos.push(null); 
        }
        setCardIngredientes(numero); 
    }
    
    function salida(){
        Navigate("/"+admin+"/admin/menuPlatos");
    }
    
    function unoMas(data){
        const nombrePlato =data.get('nombre');
        const precio = data.get('precio');
        axios.post("http://localhost:3053/platos/nuevo", {
            nombre: nombrePlato,
            tipo: tipoPlatoSeleccionado,
            ingredientes: ingredientesPlato,
            precio: precio,
            cantidades: cantidades,
            alergenos: alergenos,
            token: localStorage.getItem("jwt"),
        }).then((response)=>{
        });
    }
    function cargarPlatos(){
        axios.get(`http://localhost:3053/ingredientes`, {}).then((response) => {
            var lista = [];
            response.data.forEach(element => {
                lista.push(element.nombre);
            });
            setPlatos(lista);
        });
    }

    function setIngrediente(index, ingrediente){
        var ingredienteRepetido=false;
        ingredientesPlato.forEach(i => {
            if(i===ingrediente){
                ingredienteRepetido=true;
            }
        });
        if(ingredienteRepetido===false){
            var ingr = ingredientesPlato;
            ingr[index] = ingrediente;
            setIngredientesPlato(ingr);
        }else{
            alert(ingrediente + " ya está seleccionado");
        }
    }

    function setCantidad(index, cantidad){
        var cant = cantidades;
        cant[index] = parseFloat(cantidad);
        setCantidades(cant);
    }

    function setAlergeno(index, alergeno){
        var aler = alergenos;
        aler[index] = alergeno;
        setAlergenos(aler);
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <Restaurant />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Nuevo plato
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                  name="nombre"
                                  required
                                  fullWidth
                                  id="nombre"
                                  label="Nombre del Plato"
                                  autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    fullWidth
                                    options={tipoPlato}
                                    label="Tipo de Plato"
                                    value={tipoPlatoSeleccionado}
                                    inputValue={tipoPlatoSeleccionado}
                                    onChange={(event, tipo) =>{
                                        setTipoPlatoSeleccionado(tipo);
                                    }}
                                    renderInput={(params) => <TextField {...params} label='Tipo de Plato'/>}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="precio"
                                    type="number"
                                    min="0.01"
                                    max="100"
                                    label="Precio del Plato"
                                    name="precio"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={<Checkbox value="tieneAlergenos" color="primary" disabled="disabled"/>}
                                    label="Contiene alérgenos"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    fullWidth
                                    autoHighlight
                                    options={ingredientes}
                                    value={numeroIngredientes}
                                    inputValue={numeroIngredientes}
                                    onChange={(event, cantidad) =>{
                                        setNumeroIngredientes(cantidad);
                                        colocaComponentes(cantidad);
                                    }}
                                    renderInput={(params) => <TextField {...params} label='Ingredientes'/>}
                                />
                            </Grid>
                            <Container>
                                <Grid>
                                    {cardIngredientes.map((card, index) => (
                                        <Grid item key={index} xs={12} mt={1} >
                                            <Component 
                                                setIngrediente={setIngrediente}
                                                setCantidad={setCantidad}
                                                setAlergeno={setAlergeno}
                                                posicion={index}
                                            />
                                        </Grid>
                                    ))}
                                    
                                </Grid>
                            </Container>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Añadir plato
                        </Button>
                        <Button
                            type=""
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => {
                                setSalir(true);
                            }}
                        >
                            cancelar
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            <Pie></Pie>
        </ThemeProvider>
    );
}