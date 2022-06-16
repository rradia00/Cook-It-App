import React from 'react';

import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Pie from '../components/pie';

const theme = createTheme();

const Saludo = (event) => {

const navigate = useNavigate();
const fondo = require("../fotos/comedor.jpg");

  const HandleSubmit = () => {
      navigate('/login');    
  };

  return (
      <ThemeProvider theme={theme}>
          <Container component="main" className="fondo">
              <CssBaseline/>
                  <Box
                      sx={{
                          marginTop: 8,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                      }}
                  >
                    <Typography 
                        component="h1" 
                        variant="h3" 
                        className="titulo"
                        color="white"
                        sx={{ 
                            mt: 3, 
                            mb: 2,
                            marginTop: 20,
                        }}
                    >
                        Restaurante "El Rincón de la Comida"
                    </Typography>
                    <Box component="form" onSubmit={HandleSubmit} noValidate sx={{ mt: 1, width: 300}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ 
                                mt: 3, 
                                mb: 2,
                                marginTop: 5,
                            }}
                        >
                            Entrar
                        </Button>
                    </Box>
                </Box>
              
            </Container>
        </ThemeProvider>        
    );
}

export default Saludo;