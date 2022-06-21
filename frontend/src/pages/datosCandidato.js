import * as React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
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

export default function Login() {
    const navigate = useNavigate();
    const admin = sessionStorage.getItem("usuario");
    var posicion= sessionStorage.getItem("nCandidato");
    const axios = require("axios").default;
    const [candidato, setCandidato]=useState([]);

    useEffect(() => {
        cargarCandidato(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    function contrata(){
        alert(candidato.nombre+ " " + candidato.apellidos + " " + candidato.telefono);
        axios.delete("http://localhost:3053/bolsa", {
            nombre: candidato.nombre,
            apellidos: candidato.apellidos,
            telefono: candidato.telefono
        }).then(response=>{

        });

        /*axios.post("http://localhost:3053/usuarios", {
            user: candidato.nombre,
            password: candidato.clave,
            type: candidato.puesto
        }).then(response=>{

        });*/

        salir();
    }

    function cargarCandidato(){
        
        axios.get("http://localhost:3053/bolsa/candidato/"+posicion, {

        }).then(response =>{
            setCandidato(response.data);
        });
    }

    function salir(){
        navigate("/admin/"+admin+"/bolsaTrabajo");
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                        Datos del candidato {posicion}
                    </Typography>
                    <Typography component="h1" variant="h4">
                        Puesto de: {candidato.puesto}
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <Typography component="h1" variant="h5">
                            Nombre: {candidato.nombre}
                        </Typography>
                        
                        <Typography component="h1" variant="h5">
                            Apellidos: {candidato.apellidos}
                        </Typography>

                        <Typography component="h1" variant="h5">
                            Telefono: {candidato.telefono}
                        </Typography>

                        <Typography component="h1" variant="h5">
                            Direccion: {candidato.direccion}
                        </Typography>
                        
                        <Typography component="h1" variant="h5">
                            Localidad: {candidato.localidad}
                        </Typography>

                        <Typography component="h1" variant="h5">
                            País: {candidato.pais}
                        </Typography>

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={()=>{
                                contrata();
                            }}
                        >
                            Contratar
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={()=>{salir()}}
                        >
                            cancelar
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
            <Pie></Pie>
        </ThemeProvider>
    );
}
