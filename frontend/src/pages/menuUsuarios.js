import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import LocalPolice from '@mui/icons-material/LocalPolice';
import Avatar from '@mui/material/Avatar';
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

export default function Admin() {
    const Navigate = useNavigate();

    const admin = sessionStorage.getItem('usuario');
    const navigate = useNavigate();    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
      
    };
    
    function salir(){
        Navigate("/"+admin+"/admin");
    }
    return(
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
                        <LocalPolice />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Menu de Ingredientes
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={()=>navigate("/"+admin+"/admin/verListaUsuarios")}
                                >
                                    Lista de usuarios
                                </Button>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={()=>navigate("/"+admin+"/admin/nuevoUsuario")}
                            >
                                Añadir nuevo usuarios
                            </Button>
                            <Button
                            type=""
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => {
                                salir();
                            }}
                        >
                            Salir
                        </Button>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            <Box
            marginTop={16.7}
            >
            <Pie></Pie>
            </Box>
        </ThemeProvider>
    );
}