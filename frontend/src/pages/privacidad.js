import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Pie from '../components/pie';
import Component from '../components/termino';

const theme = createTheme();

export default function Privacidad() {  

    const [condiciones, setCondiciones]=useState([]);
    var cargar = true;

    useEffect(() => {
        if(cargar===true){
            cargar = false;
            cargarTerminos(); 
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function cargarTerminos(){
        var terms;
        await axios.get("http://localhost:3053/terminos", {}).then((response)=>{
            terms = response.data;            
        });
        setCondiciones(terms);
        cargar = false;
    }
 

    function handleSubmit(){
        alert("estamos");
    }

    return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" sx={{width: 500}}>
                      Términos y condiciones de uso
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box >
                <Container sx={{ py: 8, bgcolor: 'cyan' }} maxWidth="md">
                    <Grid container spacing={4}>
                        {condiciones.map((card, index) => (
                            <Grid item key={index} xs={12} sm={6} md={12}>
                                <Component
                                    titulo={card.titulo}
                                    item={card.item}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }} 
                >
                    Atras
                </Button>
                </Container>
            </Box>
            <Pie></Pie>
        </ThemeProvider>
    );
}