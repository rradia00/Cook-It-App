import * as React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export default function Fila(argumentos) {
    const [marcas, setMarcas]=useState(" ֎ ");

    useEffect(() => {
        espacios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function espacios(){
        var contrata = argumentos.contratacion;
        if(contrata==="true"){
            
            if(argumentos.puesto==="camarero"){
                setMarcas(" ۝ ");
            }else {
                setMarcas(" ↈ ");
            }
        }
    }

    function contratacion(){
        var contrata = argumentos.contratacion;
        return (
            (contrata) ? 
                <Button
                    component="h1"
                    variant="contained"
                    align="left"
                    width="100"
                    fullwith="true"
                    onClick={()=>{
                        argumentos.consultar(argumentos.posicion);
                    }}
                >
                    Consultar
                </Button>
            :
                <Typography
                >
                </Typography>
        );
    }


    return (
        <Card
          
        >
            <Box
                sx={{
                    marginTop: 1,
                    display: 'flex',
                    alignItems: 'left',
                }}
            >
                <Typography variant="h5" component="h2" sx={{width: argumentos.valores[0]}}>
                     {marcas} {argumentos.uno}
                </Typography>
                <Typography textAlign="center" variant="h5" component="h2" sx={{width: argumentos.valores[1]}}>
                    {argumentos.dos}
                </Typography>
                <Typography textAlign="center" variant="h5" component="h2" sx={{width: argumentos.valores[2]}}>
                    {argumentos.tres}
                </Typography>
                <Typography textAlign="center" variant="h5" component="h2" sx={{width: argumentos.valores[3]}}>
                    {argumentos.cuatro}
                </Typography>
                {contratacion()}
            </Box>
        </Card>
    );
  }
