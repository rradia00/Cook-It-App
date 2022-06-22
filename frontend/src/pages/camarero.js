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
import Stack from '@mui/material/Stack';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Component from '../components/mesa';
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

export default function Album() {
    const camarero = sessionStorage.getItem('usuario');
    const [cardMesas, setCard]=useState([]);
    const [admin, setAdmin]=useState([]);

    var url = `http://localhost:3053/${camarero}/mesas`;

    var mesas;
    const navigate = useNavigate();

    useEffect(() => {
        cargarMesas(); 
        if(sessionStorage.getItem("admin") === "true"){
            setAdmin(true);
        }else{
            setAdmin(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tipoUsuario = "camarero";
    function cargarMesas(){
        axios.post(`${url}`, {
            tipo: tipoUsuario
        }).then((response) => {
            mesas = response.data;
            setCard(mesas);
        });
    }

    async function comanda(nMesa, accion){
        if(accion===1){
            tomarComanda(nMesa);
        }else if(accion===2){
            verComanda(nMesa);
        }else{
            await borrarComanda(nMesa);
            cargarMesas();
        }
    }

    function tomarComanda(nMesa){
        sessionStorage.setItem("mesa", nMesa);
        navigate('/'+camarero+'/comanda/'+nMesa);
    }

    function verComanda(nMesa){
        sessionStorage.setItem("mesa", nMesa);
        navigate('/'+camarero+'/verComanda/'+nMesa);
    }

    async function borrarComanda(nMesa){
        axios.post('http://localhost:3053/'+camarero+'/liberar', {
            mesa: nMesa,
        }).then(response =>{
            alert("Mesa " + nMesa + " queda libre");
        });
    }

    function color(nMesa){
        if(cardMesas[nMesa].libre===true){
            return "green";
        }else{
            return "darkred";
        }
    }

    function salir(){
        sessionStorage.removeItem("admin");
        sessionStorage.removeItem("usuario");
        localStorage.removeItem("jwt");
        navigate('/login');
    }

    function administrar(){
        navigate('/'+camarero+'/admin');
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
                    <Typography variant="h6" color="inherit" sx={{width: 500}}>
                      Camarero que le atiende: {camarero}
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
              {/* Hero unit */}
              <Box
                  sx={{
                      bgcolor: 'background.paper',
                      pt: 8,
                      pb: 6,
                  }}
              >
                  <Container maxWidth="sm">
                      <Typography
                          component="h1"
                          variant="h2"
                          align="center"
                          color="text.primary"
                          gutterBottom
                      >
                          COMEDOR 1
                      </Typography>

                      <Stack
                          sx={{ pt: 4 }}
                          direction="colum"
                          spacing={2}
                          justifyContent="center"
                      >
                      </Stack>
                  </Container>
            </Box>
            <Container sx={{ py: 8, bgcolor: 'cyan' }} maxWidth="md">
                <Grid container spacing={4}>
                    {cardMesas.map((card, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Component
                                mesa={card.numero}
                                comensales={card.comensales}
                                index={index}
                                comanda={comanda}
                                color ={color(index)}

                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
          </main>
              {
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
               }
              <Pie></Pie>
        </ThemeProvider>
    );
}