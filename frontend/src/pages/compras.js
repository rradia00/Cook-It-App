import * as React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Autocomplete from '@mui/material/Autocomplete';
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



export default function Comprar() {

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const cantidad = data.get('cantidadAct');
      axios.put("http://localhost:3053/ingredientes", {
        ingrediente: selecIngred,
        cantidad: cantidad
      }).then(response =>{

      });
    };
    
    const [ingredientes, setIngredientes]=useState([]);
    const [selecIngred, seleccionIngrediente]=useState();

    useEffect(() => {
      
      cargarIngredientes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function cargarIngredientes(){
    var nombres = [];
    axios.get("http://localhost:3053/ingredientes", {

    }).then(response =>{
      response.data.forEach(element => {
        nombres.push(element.nombre);
      });
      setIngredientes(nombres);
    });
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
              <ShoppingBagIcon />
            </Avatar>
            <Typography 
                component="h1" 
                variant="h5" 
                id="cantidad"
            >
                Compra de Ingredientes
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                
                <Autocomplete
                  fullWidth
                  options={ingredientes}
                  value={selecIngred}
                  inputValue={selecIngred}
                  onChange={(event, postre) => {
                    seleccionIngrediente(postre);
                  }}
                  renderInput={(params) => <TextField {...params} label="Ingrediente"/>}
                />
                 
                </Grid> 
                <Grid item xs={15}>
                <TextField
                    name="cantidadAct"
                    id="cantidadAct"
                    Autocomplete="cantidadAct"
                    label="Seleccione cantidad a comprar(kg)"
                  />
                </Grid>
                </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Añadir al almacen
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    );

}
  
