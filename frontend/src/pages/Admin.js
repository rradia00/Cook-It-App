import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LocalPolice from '@mui/icons-material/LocalPolice';
import Grid from '@mui/material/Grid';

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
    const navigate = useNavigate();    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
      
    };
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
                        Administrador
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={()=>navigate("/user/admin/nuevoIngrediente")}
                                >
                                    Añadir ingrediente
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={()=>navigate("/user/admin/nuevoPlato")}
                                >
                                    Añadir plato
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={()=>navigate("/user/admin/nuevoUser")}
                                >
                                    Añadir usuario
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
              /*{<Stack
                  sx={{ pt: 4 }}
                  direction="colum"
                  spacing={2}
                  justifyContent="center"
              >
              </Stack>
          </Container>
          </Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                  Nuevo Usuario
                  </Button>
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={()=>navigate("/")}
                  >
                    Nuevo Plato
                  </Button>
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={()=>navigate("/")}
                  >
                    Nuevo Ingrediente
                  </Button>}*/

)}