import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
const alergenos = ['no', 'gluten', 'lacteos', 'huevos', 'mostaza', 'pescado', 'molusco', 'crustaceo', 'cacahuetes', 'soja', 'cáscara de frutos secos', 'apio', 'sésamo', 'sulfitos', 'altramuces'];

export default function App() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

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
                        <AddShoppingCart />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Nuevo ingrediente
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                name="ingrediente"
                                required
                                fullWidth
                                id="ingrediente"
                                label="Nombre del Ingrediente"
                                autoFocus
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    fullWidth
                                    options={alergenos}
                                    label="Alérgenos"
                                    renderInput={(params) => <TextField {...params} label='Alérgenos'/>}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="cantidad"
                                    type="number"
                                    min="0.01"
                                    max="100"
                                    label="Cantidad e.j.: huevos->unidades (int) || patatas->peso (double)"
                                    name="cantidad"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Añadir ingrediente
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}