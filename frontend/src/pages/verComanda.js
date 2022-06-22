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
import Component from '../components/platoComanda';

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
    const camarero = sessionStorage.getItem('usuario');

    var url = `http://localhost:3053/${camarero}`;

    var mesa = sessionStorage.getItem("mesa");

    useEffect(() => {
        cargarPlatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleSubmit(){
        sessionStorage.removeItem("mesa");
        navigate(`/${camarero}/camarero`);
    }

    const[personas, setPersonas]=useState(0);

    var platos;

    const [primeros, setPrimeros]=useState([]);
    const [segundos, setSegundos]=useState([]);
    const [postres, setPostres]=useState([]);
    const [bebida, setBebida]=useState([]);


    function cargarPlatos(){  
        axios.post(`${url}/comandas`, {
            mesa: mesa,
            token: localStorage.getItem("jwt"),
        }).then((response) => {
            platos = response.data;
            var primeros=[];
            var segundos = [];
            var postres = [];
            var bebidas = [];
            platos.forEach(element => { 
                var nombre = element.plato[0].nombre;
                var estado =  element.proceso;
                var color = buscaColor(estado);
                var id = element.idPlato;
                if(element.plato[0].tipo === "Primero") primeros.push({nombre: nombre, estado: estado, color:color, id:id, tipo: "primero"});
                else if(element.plato[0].tipo==="Segundo") segundos.push({nombre: nombre, estado: estado, color:color, id:id, tipo:"segundo"});
                else if(element.plato[0].tipo==="Postre") postres.push({nombre: nombre, estado: estado, color:color, id:id, tipo: "postre"});
                else if(element.plato[0].tipo==="Bebida") bebidas.push({nombre: nombre, estado: estado, color:color, id:id, tipo: "Bebida"});
            });
            if(primeros.length > segundos.length) setPersonas(primeros.length);
            else setPersonas(segundos.length);


            setPrimeros(primeros);
            setSegundos(segundos);
            setPostres(postres);
            setBebida(bebidas);
        });
    }


    function buscaColor(estado){
        if(estado===0){
            return "darkred";
        }else if(estado===1){
            return "blue";
        }else if(estado===2){
            return "yellow";
        }else{
            return "green";
        }
    }

    

    function servidoPlato(index, tipo){
        let array;
        alert(index + " " + tipo);
        if(tipo==="primero") array=primeros;
        else if(tipo==="segundo") array=segundos;
        else if(tipo==="postre") array=postres;
        else if(tipo==="Bebida") array=bebida;
alert(array[index].nombre);

        const id = array[index].id;
        axios.put(`${url}/comandas/modificar/${id}`, {
            token: localStorage.getItem("jwt"),
        }).then((response) => {
            if(response.status===200){
                cargarPlatos();
            }else{
                alert("Se ha producido algún error");
            }
        });
        return "servido";
    }

    function dservidoPrimeros(index){
        const id = primeros[index].id;
        axios.put(`${url}/comandas/${id}/-`, {
            token: localStorage.getItem("jwt"),
        }).then((response) => {
            if(response.status===200){
                cargarPlatos();
            }else{
                alert("Se ha producido algún error");
            }
        });
        return "servido";
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <BoyIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Camarero que le atiende: {camarero}
                    </Typography>
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
                            COMANDA MESA {mesa}
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <Typography
                                component="h1"
                                variant="h4"
                                align="left"
                                color="text.primary"
                                gutterBottom
                            >
                                Personas: {personas}
                            </Typography>
                            

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
                                            servido={servidoPlato}
                                            dservido={dservidoPrimeros}
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
                                                posicion={index}
                                                estado = {card.color}
                                                tipo = {card.tipo}
                                                servido={servidoPlato}
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
                                                posicion={index}
                                                estado = {card.color}
                                                tipo = {card.tipo}
                                                servido={servidoPlato}
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
                                Bebidas:
                            </Typography>

                            <Container sx={{ py: 8 }} maxWidth="md">
                                <Grid container spacing={1}>
                                    {bebida.map((card, index) => (
                                        <Grid item key={index}  md={40}>
                                            <Component
                                                nombrePlato={card.nombre}
                                                posicion={index}
                                                estado = {card.color}
                                                tipo = {card.tipo}
                                                servido={servidoPlato}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Container>

                            <Button
                                type="submit"
                                //fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Volver
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
