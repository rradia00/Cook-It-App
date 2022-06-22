import * as React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function Mesa(argumentos) {
    const [ingredientes, setIngredientes]=useState([]);
    const [ingredientesCompletos, setIngredientesCompletos]=useState([]);
    const [seleccionIngrediente, setSeleccionIngrediente]=useState();
    

    useEffect(() => {
        cargarIngredientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    function cargarIngredientes(){
        axios.get(`http://localhost:3053/ingredientes`, {
            token: localStorage.getItem("jwt"),
        }).then((response) => {
            var lista = [];
            var listaCompleta = [];
            response.data.forEach(element => {
                lista.push(element.nombre);
                listaCompleta.push(element);
            });
            setIngredientes(lista);
            setIngredientesCompletos(listaCompleta);
        });
    }

    const ingredienteseleccionIngredientes = (componente) => {
        ingredientesCompletos.forEach(element => {
            if(element.nombre === componente){
                argumentos.ingredienteSeleccionado(argumentos.posicion, element._id);
            }
        })
    }

    

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
                <Autocomplete
                    options={ingredientes}
                    autoHighlight
                    value={seleccionIngrediente}
                    inputValue={seleccionIngrediente}
                    onClick={(event, ingrediente) => {
                        setSeleccionIngrediente(ingrediente);
                        ingredienteseleccionIngredientes(ingrediente);
                    }}
                    renderInput={(params) => <TextField {...params} label="Ingrediente"/>}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField xs={12} sm={6} fullWidth required label='Cantidad' type="number" id="cantidad" name="cantidad" />
            </Grid>
        </Grid>
    );
  }
