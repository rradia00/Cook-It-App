import * as React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AddReaction from '@mui/icons-material/AddReaction';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Autocomplete from '@mui/material/Autocomplete';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Component from '../components/fila';
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

const tiposDeUsuario = ['Camarero', 'Cocinero', 'Administrador'];

export default function App() {
  const navigate = useNavigate();
  const admin = sessionStorage.getItem('usuario');
  const [salir, setSalir]=useState(false);
  const [user, setUser]=useState([]);
  const [nuevo, setNuevo]=useState(false);
  const [tipoUsuario, setTipoUsuario]=useState();

  const valores=[200, 150, 400, 400];

  const handleSubmit = (event) => {
    if(salir===false){
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      var nombre = data.get('user');
      var password = data.get('password');

      //compruebo que los usuarios no están en la base de datos
      user.forEach(user =>{
          if(user===nombre){
            alert("El usuario ya esta metido en la base de datos");
              nombre = "";
          }
      });
      
      if(nombre!==""){
        unoMas(nombre, password);
      }
    }
    salida();
  };

  function unoMas(usuario, clave){
      axios.post("http://localhost:3053/usuarios", {
        user: usuario,
        password: clave,
        type: tipoUsuario,
        token: localStorage.getItem("jwt"),
      }).then((response)=>{

      });
  }

  function cargarUsuarios(){
    axios.get(`http://localhost:3053/users`, {
      token: localStorage.getItem("jwt"),
    }).then((response) => {
        var listaUsuarios = [];
        var listaCompleta = [];
        response.data.forEach(element => {
            listaUsuarios.push(element.nombre);
            listaCompleta.push(element);
        });
        setUser(listaUsuarios);
    });
  }

  function setSalida(user){
    setSalir(user);
  }

  useEffect(() => {
    setNuevo(false);
    cargarUsuarios();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function salida(){
    navigate('/admin/'+admin+'/menuUsuarios');
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
            <AddReaction/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarse
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="user"
                  required
                  fullWidth
                  id="user"
                  label="Nombre de Usuario"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Contraseña"
				          type="password"
                  name="password"
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                    fullWidth
                    options={tiposDeUsuario}
                    label="Tipo de Usuario"
                    value={tipoUsuario}
                    inputValue={tipoUsuario}
                    onChange={(event, type) =>{
                        setTipoUsuario(type);
                    }}
                    renderInput={(params) => <TextField {...params} label='Tipo de Usuario'/>}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="permitirAdministrador" color="primary" />}
                  label="El nuevo usuario es administrador"
                />
              </Grid>
            </Grid>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2}}
                fullWidth
                onClick={() => {
                    setSalida(false);
                    //mostrar();
                }}
            >
                Agregar nuevo usuario
            </Button>
            {user.map((card, index) => (
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
          </Box>
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2}}
          fullWidth
          onClick={() => {
              setSalida(true);
          }}
        >
          Salir
        </Button>
        <Copyright sx={{ mt: 5 }} />
      </Container>
     
      <Pie></Pie>
    </ThemeProvider>
  );
}
