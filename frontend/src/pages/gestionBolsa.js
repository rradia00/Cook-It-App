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

export default function ListadoCandidatos() {

    const navigate = useNavigate();
    const admin = sessionStorage.getItem('usuario');
    const [candidatos, setCandidatos]=useState([]);

    const valores=[250, 250, 150, 350];
    
   useEffect(() => {
        cargarCandidatos(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    async function cargarCandidatos(ordenacion){  
        var ingr = [];
        await axios.get(`http://localhost:3053/Bolsa`, 
        {
            ordenado: ordenacion,
            token: localStorage.getItem("jwt"),
        }).then((response) => {
            ingr = response.data;
            
        });
        setCandidatos(ingr);
    }

    function handleSubmit(){
        sessionStorage.removeItem("mesa");
        navigate(`/${admin}/cocinero`);
    }   

    function salir(){
        navigate('/'+admin+'/admin');
    }

    function consultar(posicion){
        sessionStorage.setItem("nCandidato", posicion);
        navigate('/admin/'+admin+'/datosCandidato/'+posicion);
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
                            Listado de Candidatos
                        </Typography>

                        <Box>
                            <Button
                                type="button"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: valores[0]}}
                            >
                                Nombre
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: valores[0]}}
                            >
                                Apellidos   
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: valores[2]}}
                            >
                                Telefono
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: valores[3]}}
                            >
                                Fecha Entrada a la bolsa
                            </Button>
                        </Box>

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            {candidatos.map((card, index) => (
                                <Grid item key={index} xs={12} sm={6} md={6}>
                                    <Component
                                        puesto={card.puesto}
                                        uno={card.nombre}
                                        dos={card.apellidos}
                                        tres={card.telefono}
                                        cuatro={card.fCre}
                                        cinco={card.fAct}
                                        posicion={index}
                                        valores={valores}
                                        contratacion="true"
                                        consultar={consultar}
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
            <Box
            marginTop='8vw'
            >
            <Pie></Pie>
            </Box>
            
        </ThemeProvider>
    );
}
