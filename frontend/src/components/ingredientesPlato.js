import * as React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import { Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import m from '../fotos/EsperandoMini.png';

export default function Mesa(argumentos) {
    const [ingredientes, setIngredientes]=useState([]);
    const [seleccionIngredientes, setSeleccionIngredientes]=useState();

    useEffect(() => {
        cargarIngredientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function cargarIngredientes(){
        axios.get(`http://localhost:3053/ingredientes`, {}).then((response) => {
            var lista = [];
            response.data.forEach(element => {
                lista.push(element.nombre);
            });
            setIngredientes(lista);
        });

    }

    const ingredientePlato = (ingre) => {
        ingredientes.forEach(element => {
            if(element.nombre === ingre){

               // argumentos.primero(argumentos.posicion, element);
            }
        })
    }


    return (        
    <Card
        sx={{height: '100%', display: 'flex', flexDirection: 'column'}} spacing={1}
    >
        <CardContent sx={{ flexGrow: 1 }} > 
            <Container
                direction="column"
                alignItems="center"
                justifyContent="center"
                maxWidth="md"
                
            >
                <Grid container spacing={1}>
                    {<img src={m} alt="Mesa"  />}
                    <Autocomplete
                        fullwidth="true"
                        options={ingredientes}
                        autoHighlight
                        value={seleccionIngredientes}
                        inputValue={seleccionIngredientes}
                        onChange={(event, ingrediente) => {
                            setSeleccionIngredientes(ingrediente);
                            ingredientePlato(ingrediente);
                        }}
                        renderInput={(params) => <TextField {...params} label="seleccione ingrediente"/>}
                    />
                </Grid>
            </Container>

            
        </CardContent>
    </Card>


    );
  }