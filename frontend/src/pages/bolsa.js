import * as React from 'react';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormControlLabel } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
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
    const axios = require("axios").default;
    const [terminos, setTerminos] = useState(false);
    const [puesto, setPuesto]=useState(["Cocinero", "Camarero"]);
    const [seleccionPuesto, setSeleccionPuesto]=useState("");
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const opcion = seleccionPuesto;
        const nombre = data.get("nombre");
        const apellidos = data.get("apellidos");
        const direccion = data.get("direccion1");
        const localidad = data.get("direccion2");
        const telefono = data.get("telefono");
        const pais = data.get("pais");
        const clave = data.get("password1");
        const clave2 = data.get("password2");

        if(opcion==="" || nombre==="" || apellidos==="" || direccion==="" || localidad==="" || pais==="" || clave==="" || clave2===""){
            alert("falta un dato");
        }else{
            if(terminos===false){
                alert("Por favor, lea y acepte los términos y condiciones de uso, gracias.");
            }else{
                if(clave!==clave2){
                    alert("Por favor, las claves han de ser iguales");
                }else{
                    axios.post("http://localhost:3053/bolsa", 
                    {
                        puesto: opcion,
                        nombre: nombre,
                        apellidos: apellidos,
                        direccion: direccion,
                        localidad: localidad,
                        telefono: telefono,
                        pais: pais,
                        clave: clave
                    }).then((response)=>{
                        if(response.data.length>0){
                            alert("ya existe un usuario en la base de datos con ese nombre");
                        }else{
                            alert("se ha registrado correctamente 🙂");
                            salir();
                        }
                    });
                }
            }
        }
    };

    function condiciones(){
        navigate("/privacidad");
    }

    function aceptarTerminos(){
        setTerminos(!terminos);
    }

    function salir(){
        navigate("/");
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
                        <Autocomplete
                            fullwidth="true"
                            options={puesto}
                            autoHighlight
                            value={seleccionPuesto}
                            inputValue={seleccionPuesto}
                            onChange={(event, puesto) => {
                                setSeleccionPuesto(puesto);
                            }}
                            renderInput={(params) => <TextField {...params} label="Puesto de trabajo"/>}
                        />

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
                            id="apellidos"
                            label="apellidos"
                            name="apellidos"
                            autoComplete="apellidos"
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
                            id="telefono"
                            label="Telefono de contacto"
                            name="telefono"
                            autoComplete="telefono"
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
                            type="password"
                            id="password1"
                            autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="Repítala"
                            type="password"
                            id="password2"
                        />

                        <FormControlLabel id="terminos" onClick={()=>aceptarTerminos()} control={<Checkbox />} label="Declaro que he leído y acepto los "/>
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
