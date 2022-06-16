import * as React from 'react';
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

export default function App() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    if(data.get('email')==="" || data.get('password')===""){
        alert("Falta un dato");
    }else{
        var parametros = {"user":data.get("email"), "password":data.get("password")};
        axios.post("http://localhost:3053/nuevoUser", parametros)
        .then((contesto)=>{
            if(contesto.status===200 && contesto.data!=null){
                sessionStorage.setItem("usuario", contesto.data.user);
                sessionStorage.setItem("admin", contesto.data.administrator);
                if(contesto.data.type==="camarero"){
                    navigate('/'+data.get('email')+'/camarero');
                }else if(contesto.data.type==="admin"){
                    navigate('/'+data.get('email')+'/admin');
                }else {
                    navigate('/'+data.get('email')+'/cocinero');
                }
            }
        })
    }
  };

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
                  id="passwd"
                  label="Contraseña"
				          type="password"
                  name="passwd"
                  autoComplete='1234'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="type"
                  label="Tipo de Usuario"
                  name="type"
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
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  ¿Ya tienes una cuenta? Inicia sesión.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Pie></Pie>
    </ThemeProvider>
  );
}
