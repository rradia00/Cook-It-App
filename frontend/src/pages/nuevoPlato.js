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

import Pie from '../components/pie';
import Component from '../components/platoCocina';

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
    
    const [platos, setPlatos]=useState([]);
    const [seleccionPlatos, setSeleccionPlatos]=useState();

     const [nuevo, setNuevo]=useState(false);
    const [seleccionAlergenos, setSeleccionAlergenos]=useState();
    const Navigate = useNavigate();
    useEffect(() => {
        setNuevo(false);
        cargarPlatos();
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (event) => {
        if(salir===false){
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            var nombre;
            if(nuevo){
                nombre =data.get('plato');
                //compruebo que los platos no están en la base de datos
                platos.forEach(plat =>{
                    if(plat===nombre){
                        
                    }
                });
                
                if(nombre!==""){
                    unoMas(nombre, data);
                }
            } 
            else {
                nombre = seleccionPlatos;

            }
        }
        salida();
    };

    function colocaComponentes(cantidad){
        var ingredientes=[];
        for (var i = 0; i < cantidad; i++) {
            ingredientes.push(i+1);      
        }
        setCardIngredientes(ingredientes); 
    }
    

    function salida(){
        Navigate("/"+admin+"/admin/menuPlatos");
    }

    function suma(nombre, data){
        const plato = data.get("nombre");
        const precio = data.get("precio");
        axios.put("http://localhost:3053/platos", {
            plato: nombre,
            precio: precio,
        }).then((response)=>{

        });
    }
    
    function unoMas(nombre, data){
        const alergenos = seleccionAlergenos;
        const cantidad = data.get("cantidad");
        axios.put("http://localhost:3053/ingredientes/nuevo", {
            ingrediente: nombre,
            cantidad: cantidad,
            alergenos: alergenos,
        }).then((response)=>{

        });
    }

    function cargarPlatos(){
        axios.get(`http://localhost:3053/ingredientes`, {}).then((response) => {
            var lista = [];
            var listaCompleta = [];
            response.data.forEach(element => {
                lista.push(element.nombre);
                listaCompleta.push(element);
            });
            setPlatos(lista);
        });
    }

    function nuevoPlato(plat){
        setNuevo(plat);
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
                            Menu Platos
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            <Pie></Pie>
        </ThemeProvider>
    );
}