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

export default function ListadoPlatos() {

    const navigate = useNavigate();
    const cocinero = sessionStorage.getItem('usuario');
    const [platos, setIPlatos]=useState([]);
    const [direccion, setDireccion]=useState(0);
    const [dNombre, setDNombre]=useState("");
    const [dPrecio, setDPrecio]=useState("");
    const [dTipo, setDTipo]=useState("");
    const [dFechaCre, setDFechaCre]=useState("");
    const [dFechaAct, setDFechaAct]=useState("");

    const valores=[200, 150, 400, 400];
    
   useEffect(() => {
        cargarPlatos(null);
        setDireccion(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    async function cargarPlatos(ordenacion){  
        var plat = [];
        await axios.post(`http://localhost:3053/platos`, 
        {
            ordenado: ordenacion,
            sentido: direccion,
            token: localStorage.getItem("jwt"),
        }).then((response) => {
        plat = response.data;
            
        });
        setIPlatos(plat);
    }

    function handleSubmit(){
        sessionStorage.removeItem("mesa");
        navigate(`/${cocinero}/cocinero`);
    }   

    function salir(){
        navigate('/'+cocinero+'/admin/menuPlatos');
    }

    async function cambiaDireccion(){
        if(direccion===0 || direccion===-1) setDireccion(1);
        else setDireccion(-1);
    }

    async function ordenaNombre(){
        await cambiaDireccion();
        await cargarPlatos("nombre");
        borraDirecciones();
        setDNombre(getDireccion());
    }

    async function ordenaPrecio(){
        await cambiaDireccion();
        await cargarPlatos("precio");
        borraDirecciones();
        setDPrecio(getDireccion());
    }

    async function ordenaTipo(){
        await cambiaDireccion();
        await cargarPlatos("tipo");
        borraDirecciones();
        setDTipo(getDireccion());
    }

    async function ordenaFechaCreacion(){
        await cambiaDireccion();
        await cargarPlatos("fCre");
        borraDirecciones();
        setDFechaCre(getDireccion());
    }

    async function ordenaFechaActualizacion(){
        await cambiaDireccion();
        await cargarPlatos("fAct");
        borraDirecciones();
        setDFechaAct(getDireccion());
    }

    function getDireccion(){
        if(direccion===1) return "▲";
        else return "▼";
    }

    function borraDirecciones(){
        setDNombre("");
        setDPrecio("");
        setDTipo("");
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
                            Listado de Platos
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
                                    ordenaPrecio();
                                }}
                            >
                                Precio {dPrecio}
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: valores[2]}}
                                onClick={() => {
                                    ordenaTipo();
                                }}
                            >
                                Tipo {dTipo}
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

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            {platos.map((card, index) => (
                                <Grid item key={index} xs={12} sm={6} md={6}>
                                    <Component
                                        uno={card.nombre}
                                        dos={card.precio}
                                        tres={card.tipo}
                                        cuatro={card.fAct}
                                        posicion={index}
                                        valores={valores}
                                    />
                                </Grid>
                            ))}
                            
                            <Button
                                type="button"
                                fullWidth
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
