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
    const [primeros, setPrimeros]=useState([]);
    const [primerosCompletos, setPrimerosCompletos]=useState([]);
    const [seleccionPrimero, setSeleccionPrimero]=useState();

    const [segundos, setSegundos]=useState([]);
    const [segundosCompletos, setSegundosCompletos]=useState([]);
    const [seleccionSegundo, setSeleccionSegundo]=useState();
    

    const [postres, setPostres]=useState([]);
    const [postresCompletos, setPostresCompletos]=useState([]);
    const [seleccionPostre, setSeleccionPostre]=useState();

    const [bebidas, setBebidas]=useState([]);
    const [bebidasCompletos, setBebidassCompletos]=useState([]);
    const [seleccionBebida, setSeleccionBebida]=useState();

    useEffect(() => {
        cargarPlatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function cargarPlatos(){
        axios.get(`http://localhost:3053/platos/primeros`, {}).then((response) => {
            var lista = [];
            var listaCompleta = [];
            response.data.forEach(element => {
                lista.push(element.nombre);
                listaCompleta.push(element);
            });
            setPrimeros(lista);
            setPrimerosCompletos(listaCompleta);
        });

        axios.get(`http://localhost:3053/platos/segundos`, {}).then((response) => {
            var lista = [];
            var listaCompleta = [];
            response.data.forEach(element => {
                lista.push(element.nombre);
                listaCompleta.push(element);
            });
            setSegundos(lista);
            setSegundosCompletos(listaCompleta);
        });

        axios.get(`http://localhost:3053/platos/postres`, {}).then((response) => {
            var lista = [];
            var listaCompleta = [];
            response.data.forEach(element => {
                lista.push(element.nombre);
                listaCompleta.push(element);
            });
            setPostres(lista);
            setPostresCompletos(listaCompleta);
        });

        axios.get(`http://localhost:3053/platos/bebidas`, {}).then((response) => {
            var lista = [];
            var listaCompleta = [];
            response.data.forEach(element => {
                lista.push(element.nombre);
                listaCompleta.push(element);
            });
            setBebidas(lista);
            setBebidassCompletos(listaCompleta);
        });
    }

    const primerPlato = (plato) => {
        primerosCompletos.forEach(element => {
            if(element.nombre === plato){
                argumentos.primero(argumentos.posicion, element);
            }
        })
    }

    const segundoPlato = (plato) => {
        segundosCompletos.forEach(element => {
            if(element.nombre === plato){
                argumentos.segundo(argumentos.posicion, element);
            }
        })
    }

    const postrePlato = (plato) => {
        postresCompletos.forEach(element => {
            if(element.nombre === plato){
                argumentos.postre(argumentos.posicion, element);
            }
        })
    }

    const bebidaElegida = (plato) => {
        bebidasCompletos.forEach(element => {
            if(element.nombre === plato){
                argumentos.bebida(argumentos.posicion, element);
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
                        fullWidth="true"
                        options={primeros}
                        autoHighlight
                        value={seleccionPrimero}
                        inputValue={seleccionPrimero}
                        onChange={(event, primero) => {
                            setSeleccionPrimero(primero);
                            primerPlato(primero);
                        }}
                        renderInput={(params) => <TextField {...params} label="Primero"/>}
                    />

                    <Autocomplete
                        fullWidth="true"
                        options={segundos}
                        value={seleccionSegundo}
                        inputValue={seleccionSegundo}
                        onChange={(event, segundo) => {
                            setSeleccionSegundo(segundo);
                            segundoPlato(segundo);
                        }}
                        renderInput={(params) => <TextField {...params} label="Segundo"/>}
                    />

                    <Autocomplete
                        fullWidth="true"
                        options={postres}
                        value={seleccionPostre}
                        inputValue={seleccionPostre}
                        onChange={(event, postre) => {
                            setSeleccionPostre(postre);
                            postrePlato(postre);
                        }}
                        renderInput={(params) => <TextField {...params} label="Postre"/>}
                    />

                    <Autocomplete
                        fullWidth="true"
                        options={bebidas}
                        value={seleccionBebida}
                        inputValue={seleccionBebida}
                        onChange={(event, bebida) => {
                            setSeleccionBebida(bebida);
                            bebidaElegida(bebida);
                        }}
                        renderInput={(params) => <TextField {...params} label="Bebida"/>}
                    />

                    <TextField
                        name="intolerancias"
                        label="intolerancias"
                        type="text"
                        id="intolerancias"
                    />

                    <TextField
                    fullWidth="true"
                    name="aclaraciones"
                    label="Aclaraciones"
                    type="text"
                    id="aclaraciones"
                    />

                    <Typography align='center'> Pan incluido</Typography>
                </Grid>
            </Container>

            
        </CardContent>
    </Card>


    );
  }