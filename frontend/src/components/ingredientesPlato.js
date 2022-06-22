import * as React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function Mesa(argumentos) {
    const [ingredientes, setIngredientes]=useState([]);
    const [seleccionIngredientes, setSeleccionIngredientes]=useState();

    useEffect(() => {
        cargarIngredientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const cant = data.get("cantidad");
        cantidad(cant);
    }

    function cargarIngredientes(){
        axios.post(`http://localhost:3053/ingredientes`, {
            token: localStorage.getItem("jwt"),
        }).then((response) => {
            var lista = [];
            response.data.forEach(element => {
                lista.push(element.nombre);
            });
            setIngredientes(lista);
        });
    }

    const ingredientePlato = (ingre) => {
        argumentos.setIngrediente(argumentos.posicion, ingre);
    }

    const cantidad = (cant) => {
        argumentos.setCantidad(argumentos.posicion, cant);
    } 
    
    const alergeno = (aler) => {
        argumentos.setAlergeno(argumentos.posicion, aler);
    }

    return (        
        <Container
            direction="column"
            alignItems="left"
            justifyContent="left"
        >
            <Box onSubmit="handleSubmit" component="form" sx={{ mt: 3 }}>
                <Grid container>
                    <Grid sm={5}>
                        <Autocomplete
                            
                            options={ingredientes}
                            autoHighlight
                            value={seleccionIngredientes}
                            inputValue={seleccionIngredientes}
                            onChange={(event, ingrediente) => {
                                setSeleccionIngredientes(ingrediente);
                                ingredientePlato(ingrediente);
                            }}
                            renderInput={(params) => <TextField {...params} label="Ingrediente"/>}
                        />
                    </Grid> 
                    <Grid item xs={6} sm={3.5}>
                        <TextField
                            label="Cantidad"
                            name="cantidad"
                            
                            onChange={(event)=>{
                                cantidad(event.target.value);
                            }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={6} sm={3.5}>
                        <TextField
                            label="Alergeno"
                            name="alergeno"
                            
                            onChange={(event)=>{
                                alergeno(event.target.value);
                            }}
                        >
                        </TextField>
                    </Grid> 
                </Grid>
            </Box>
        </Container>
    );
}
