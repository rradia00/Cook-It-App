import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormControlLabel } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

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
    const axios = require("axios").default;
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get('email')==="" || data.get('password')===""){
            alert("Falta un dato");
        }else{
            var parametros = {"user":data.get("email"), "password":data.get("password")};
            axios.post("http://localhost:3053/login", parametros)
            .then((contesto)=>{
                if(contesto.status===200 && contesto.data!=null){
                    sessionStorage.setItem("usuario", contesto.data.user);
                    sessionStorage.setItem("admin", contesto.data.administrator);
                    if(contesto.data.type==="camarero"){
                        navigate('/'+data.get('email')+'/camarero');
                    }else{
                        navigate('/'+data.get('email')+'/cocinero');
                    }
                }
            })
        }
    };

    function condiciones(){
        navigate("/privacidad");
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
                    <Typography component="h1" variant="h5">
                        Bienvenido a nuestra bolsa de trabajo
                    </Typography>
                    <Typography component="h1" variant="h6">
                        Por favor rellene los datos
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="nombre"
                            label="Su nombre"
                            name="nombre"
                            autoComplete="nombre"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="apellido"
                            label="Apellidos"
                            name="apellido"
                            autoComplete="apellido"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="direccion1"
                            label="Dirección"
                            name="direccion1"
                            autoComplete="direccion1"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="direccion2"
                            label="Localidad de residencia"
                            name="direccion2"
                            autoComplete="direccion"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="pais"
                            label="País"
                            name="pais"
                            autoComplete="pais"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password1"
                            label="Clave de acceso"
                            type="password1"
                            id="password1"
                            autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="Repítala"
                            type="password2"
                            id="password2"
                        />

                        <FormControlLabel control={<Checkbox />} label="Declaro que he leído y acepto los "/>
                        <Link onClick={()=>condiciones()}>términos de uso y privacidad.</Link>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Enviar
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={()=>navigate("/")}
                        >
                            cancelar
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
