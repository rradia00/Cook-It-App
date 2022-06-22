import * as React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
import Typography from '@mui/material/Typography';

import Component from '../components/fila';
import Pie from '../components/pie';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
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

export default function ListadoIngredientes() {

    const navigate = useNavigate();
    const admin = sessionStorage.getItem('usuario');
    const [ingredientes, setIngredientes]=useState([]);
    const [direccion, setDireccion]=useState(0);
    const [dNombre, setDNombre]=useState("");
    const [dCantidad, setDCantidad]=useState("");
    const [dFechaCre, setDFechaCre]=useState("");
    const [dFechaAct, setDFechaAct]=useState("");

    const valores=[200, 150, 400, 400];
    
   useEffect(() => {
        cargarIngredientes(null);
        setDireccion(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    async function cargarIngredientes(ordenacion){  
        var ingr = [];
        await axios.post(`http://localhost:3053/ingredientes`, 
        {
            ordenado: ordenacion,
            sentido: direccion,
            token: localStorage.getItem("jwt"),
        }).then((response) => {
            ingr = response.data;
            
        });
        setIngredientes(ingr);
    }

    function salir(){
        navigate('/'+admin+'/admin/menuIngredientes');
    }

    async function cambiaDireccion(){
        if(direccion===0 || direccion===-1) setDireccion(1);
        else setDireccion(-1);
    }

    async function ordenaNombre(){
        await cambiaDireccion();
        await cargarIngredientes("nombre");
        borraDirecciones();
        setDNombre(getDireccion());
    }

    async function ordenaCantidad(){
        await cambiaDireccion();
        await cargarIngredientes("cantidad");
        borraDirecciones();
        setDCantidad(getDireccion());
    }

    async function ordenaFechaCreacion(){
        await cambiaDireccion();
        await cargarIngredientes("fCre");
        borraDirecciones();
        setDFechaCre(getDireccion());
    }

    async function ordenaFechaActualizacion(){
        await cambiaDireccion();
        await cargarIngredientes("fAct");
        borraDirecciones();
        setDFechaAct(getDireccion());
    }

    function getDireccion(){
        if(direccion===1) return "▲";
        else return "▼";
    }

    function borraDirecciones(){
        setDNombre("");
        setDCantidad("");
        setDFechaCre("");
        setDFechaAct("");
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                    }}
                >
                    <Container maxWidth= 'lg'>
                        <Typography
                            component="h1"
                            variant="h2"
                            align="left"
                            color="text.primary"
                            gutterBottom
                        >
                            Listado de Ingredientes
                        </Typography>

                        <Box>
                            <Button
                                type="button"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: valores[0]}}
                                onClick={() => {
                                    ordenaNombre();
                                }}
                            >
                                Nombre {dNombre}
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: valores[1]}}
                                onClick={() => {
                                    ordenaCantidad();
                                }}
                            >
                                Cantidad {dCantidad}
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: valores[2]}}
                                onClick={() => {
                                    ordenaFechaCreacion();
                                }}
                            >
                                Fecha Creacion {dFechaCre}
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: valores[3]}}
                                onClick={() => {
                                    ordenaFechaActualizacion();
                                }}
                            >
                                Fecha ultima compra {dFechaAct}
                            </Button>
                        </Box>

                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            {ingredientes.map((card, index) => (
                                <Grid item key={index} xs={12} sm={6} md={6}>
                                    <Component
                                        uno={card.nombre}
                                        dos={card.cantidad}
                                        tres={card.fCre}
                                        cuatro={card.fAct}
                                        posicion={index}
                                        valores={valores}
                                    />
                                </Grid>
                            ))}
                            
                            <Button
                                type="button"
                                fullwidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: 300}}
                                onClick={() => {
                                    salir();
                                }}
                            >
                                Salir
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </main>
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Todos los derechos reservados
                </Typography>
                <Copyright />
            </Box>
            <Pie></Pie>
        </ThemeProvider>
    );
}
