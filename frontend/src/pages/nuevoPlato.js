import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Restaurant from '@mui/icons-material/Restaurant';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Component from '../components/ingrediente';

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
const tipoPlato = ['Primero', 'Segundo', 'Postre', 'Bebida'];
const ingredientes = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];




export default function App() {
    const [numeroIngredientes, setNumeroIngredientes]=useState();
    const [cardIngredientes, setCardIngredientes]=useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };

    function colocaComponentes(cantidad){
        var ingredientes=[];
        for (var i = 0; i < cantidad; i++) {
            ingredientes.push(i+1);      
        }
        setCardIngredientes(ingredientes);
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
                        <Restaurant />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Nuevo plato
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                  name="nombre"
                                  required
                                  fullWidth
                                  id="nombre"
                                  label="Nombre del Plato"
                                  autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    fullWidth
                                    options={tipoPlato}
                                    label="Tipo de Plato"
                                    renderInput={(params) => <TextField {...params} label='Tipo de Plato'/>}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="precio"
                                    type="number"
                                    min="0.01"
                                    max="100"
                                    label="Precio del Plato"
                                    name="precio"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={<Checkbox value="tieneAlergenos" color="primary" disabled="disabled"/>}
                                    label="Contiene alérgenos"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    fullWidth
                                    autoHighlight
                                    options={ingredientes}
                                    value={numeroIngredientes}
                                    inputValue={numeroIngredientes}
                                    onChange={(event, cantidad) =>{
                                        setNumeroIngredientes(cantidad);
                                        colocaComponentes(cantidad);
                                    }}
                                    renderInput={(params) => <TextField {...params} label='Ingredientes'/>}
                                />
                            </Grid>
                            <Container>
                                <Grid>
                                    {cardIngredientes.map((card, index) => (
                                        <Grid item key={index} xs={12} mt={1} >

                                            <Component 

                                            />
                                        </Grid>
                                    ))}
                                    
                                </Grid>
                            </Container>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Añadir plato
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}