import * as React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import BoyIcon from '@mui/icons-material/Boy';
import AppBar from '@mui/material/AppBar';
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
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Pie from '../components/pie';
import Component from '../components/platoCocina';

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

export default function Comanda() {

    const navigate = useNavigate();
    const cocinero = sessionStorage.getItem('usuario');
    const [admin, setAdmin]=useState([]);

    var url = `http://localhost:3053/${cocinero}`;


    useEffect(() => {
        cargarPlatos();
        if(sessionStorage.getItem("admin") === "true"){
            setAdmin(true);
        }else{
            setAdmin(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleSubmit(){
        sessionStorage.removeItem("mesa");
        navigate(`/${cocinero}/cocinero`);
    }


    var platos;

    const [primeros, setPrimeros]=useState([]);
    const [segundos, setSegundos]=useState([]);
    const [postres, setPostres]=useState([]);

    function cargarPlatos(){  
        axios.post(`${url}/comandas/todas`, {
        }).then((response) => {
            platos = response.data;
            var primeros=[];
            var segundos = [];
            var postres = [];
            platos.forEach(element => { 
                var nombre = element.plato[0].nombre;
                var estado =  element.proceso;
                var color = buscaColor(estado);
                var id = element.idPlato;
                if(element.plato[0].tipo === "Primero") primeros.push({nombre: nombre, estado: estado, color:color, id:id, tipo: "primero"});
                else if(element.plato[0].tipo==="Segundo") segundos.push({nombre: nombre, estado: estado, color:color, id:id, tipo:"segundo"});
                else if(element.plato[0].tipo==="Postre") postres.push({nombre: nombre, estado: estado, color:color, id:id, tipo: "postre"});
            });


            setPrimeros(primeros);
            setSegundos(segundos);
            setPostres(postres);
        });
    }


    function buscaColor(estado){
        
        if(estado===0){
            return "darkred";
        }else if(estado===1){
            return "blue";
        }else{
            return "green";
        }
    }

    function siguienteProceso(index, tipo){
        var array;
        if(tipo==="primero") array=primeros;
        else if(tipo==="segundo") array=segundos;
        else if(tipo==="postre") array=postres;

        const id = array[index].id;

        axios.put('http://localhost:3053/'+cocinero+'/comandas/modificar/'+id, {
        }).then((response) => {
            if(response.status===200){
                cargarPlatos();
            }else{
                alert("Se ha producido algún error");
            }
        });
        return "servido";
    }

    function salir(){
        sessionStorage.removeItem("admin");
        sessionStorage.removeItem("usuario");
        localStorage.removeItem("jwt");
        navigate('/login');
    }

    function administrar(){
        navigate('/'+cocinero+'/admin');
    }

    function administrador(){
         return (
            (admin) ? 
                <Button variant="contained" 
                    sx={{color: 'white', width: '50'}} 
                    bqColor= "red" 
                    onClick={() => {
                        administrar()
                    }} >
                    Administrador
                </Button>
            :   
                <Button>
                </Button>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <BoyIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Cocinero implicado: {cocinero}
                    </Typography>
                    <Grid sx={{width: 500}}>
                        <Container direction="column">
                            {administrador()}
                            <Button 
                                variant="contained" 
                                sx={{left: 80, color: "white"}}
                                onClick={() => {
                                    salir();
                                }}
                            >
                                Salir
                            </Button>
                        </Container>
                    </Grid>
                </Toolbar>
            </AppBar>
            <main>
                <Box sx={{bgcolor: 'background.paper', pt: 8, pb: 6}}>
                    <Container maxWidth="md">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="left"
                            color="text.primary"
                            gutterBottom
                        >
                            COCINA
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <Typography
                                component="h1"
                                variant="h4"
                                align="left"
                                color="text.primary"
                                gutterBottom
                            >
                                Primeros:
                            </Typography>

                            <Container sx={{ py: 8 }} maxWidth="md">
                                <Grid container spacing={1}>
                                    {primeros.map((card, index) => (
                                    <Grid item key={index} md={40}>
                                        <Component
                                            nombrePlato={card.nombre}
                                            estado={card.color}
                                            posicion={index}
                                            tipo = {card.tipo}
                                            siguienteProceso={siguienteProceso}
                                        />
                                    </Grid>
                                    ))}
                                </Grid>
                                </Container>


                            <Typography
                                component="h1"
                                variant="h4"
                                align="left"
                                color="text.primary"
                                gutterBottom
                            >
                                Segundos:
                            </Typography>
                            <Container sx={{ py: 8 }} maxWidth="md">
                                <Grid container spacing={1}>
                                    {segundos.map((card, index) => (
                                        <Grid item key={index}  md={40}>
                                            <Component
                                                nombrePlato={card.nombre}
                                                estado = {card.color}
                                                tipo = {card.tipo}
                                                siguienteProceso={siguienteProceso}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Container>


                            <Typography
                                component="h1"
                                variant="h4"
                                align="left"
                                color="text.primary"
                                gutterBottom
                            >
                                Postres:
                            </Typography>
                            <Container sx={{ py: 8 }} maxWidth="md">
                                <Grid container spacing={1}>
                                    {postres.map((card, index) => (
                                        <Grid item key={index}  md={40}>
                                            <Component
                                                nombrePlato={card.nombre}
                                                estado = {card.color}
                                                tipo = {card.tipo}
                                                siguienteProceso={siguienteProceso}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Container>
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
