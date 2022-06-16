import * as React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

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
const alergenos = ['no', 'gluten', 'lacteos', 'huevos', 'mostaza', 'pescado', 'molusco', 'crustaceo', 'cacahuetes', 'soja', 'cáscara de frutos secos', 'apio', 'sésamo', 'sulfitos', 'altramuces'];

export default function App() {
    const admin = sessionStorage.getItem('usuario');
    const [salir, setSalir]=useState(false);
    const [ingredientes, setIngredientes]=useState([]);
    const [seleccionIngrediente, setSeleccionIngrediente]=useState();
    const [nuevo, setNuevo]=useState(false);
    const [seleccionAlergenos, setSeleccionAlergenos]=useState();

    const Navigate = useNavigate();


    useEffect(() => {
        setNuevo(false);
        cargarIngredientes();
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (event) => {
        if(salir===false){
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            var nombre;
            if(nuevo){
                nombre =data.get('ingrediente');
                //compruebo que los ingredientes no están en la base de datos
                ingredientes.forEach(ingr =>{
                    if(ingr===nombre){
                        suma(nombre, data);
                        nombre = "";
                    }
                });
                
                if(nombre!==""){
                    unoMas(nombre, data);
                }
            } 
            else {
                nombre = seleccionIngrediente;
                suma(nombre, data);
            }
        }
        salida();
    };

    function salida(){
        Navigate("/"+admin+"/admin");
    }

    function suma(nombre, data){
        const cantidad = data.get("cantidad");
        axios.put("http://localhost:3053/ingredientes", {
            ingrediente: nombre,
            cantidad: cantidad,
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

    function cargarIngredientes(){
        axios.get(`http://localhost:3053/ingredientes`, {}).then((response) => {
            var lista = [];
            var listaCompleta = [];
            response.data.forEach(element => {
                lista.push(element.nombre);
                listaCompleta.push(element);
            });
            setIngredientes(lista);
        });
    }

    function nuevoIngrediente(ingr){
        setNuevo(ingr);
    }

    function mostrar(){
        return(
            (nuevo)?
            <Box>
                <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                    nuevoIngrediente(false);
                    mostrar();
                }}
            >
                Cancelar nuevo ingrediente
            </Button>
            <TextField
                name="ingrediente"
                required
                fullWidth
                id="ingrediente"
                label="Nombre del Ingrediente"
                autoFocus
            />
            </Box>
            :
            <Box>
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => {
                        nuevoIngrediente(true);
                        mostrar();
                    }}
                >
                    Nuevo ingrediente
                </Button>
                <Autocomplete
                    id="ingrediente"
                    options={ingredientes}
                    value={seleccionIngrediente}
                    inputValue={seleccionIngrediente}
                    onChange={(event, ingredientes) => {
                        setSeleccionIngrediente(ingredientes);
                        //ingredienteElegido(ingredientes);
                    }}
                    renderInput={(params) => <TextField {...params} label="Ingrediente"/>}
                />
            </Box>
        );
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
                        <AddShoppingCart />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Gestión de ingredientes
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        

                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={6}>
                                {mostrar()}
                        
                            
                                <Autocomplete
                                    fullWidth
                                    options={alergenos}
                                    value={seleccionAlergenos}
                                    inputValue={seleccionAlergenos}
                                    onChange={(event, alergenos) => {
                                        setSeleccionAlergenos(alergenos);
                                        //ingredienteElegido(ingredientes);
                                    }}
                                    label="Alérgenos"
                                    renderInput={(params) => <TextField {...params} label='Alérgenos'/>}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="cantidad"
                                    type="number"
                                    min="0.01"
                                    max="100"
                                    label="cantidad: unidades o peso"
                                    name="cantidad"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Añadir ingrediente
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