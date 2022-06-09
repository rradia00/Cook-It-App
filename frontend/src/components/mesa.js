import * as React from 'react';

import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import m from '../fotos/Mesa.png';
import styles from './card.module.css';

export default function Mesa(argumentos) {
    function verComanda(color){
        var tomarComanda = true;
        if(color==="darkred") tomarComanda=false;
        return (
            (tomarComanda) ? 
                <Button sx={{color: 'white', width: '50'}} 
                    onClick={() => {
                        argumentos.comanda(argumentos.mesa, 1);
                    }} 
                    variant="contained">Tomar comanda
                </Button>  
            :   
                <Button sx={{color: 'white', width: '50'}} 
                    onClick={() => {
                        argumentos.comanda(argumentos.mesa, 2);
                    }} 
                    variant="contained">Ver comanda
                </Button>
        );
    }

    return (        
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: argumentos.color}}
        >
            <CardContent sx={{ flexGrow: 1 }}> 
                <img src={m} alt="Mesa"  className={styles.foto}/>
                <Typography className={styles.NMesa}>Mesa: {argumentos.mesa} </Typography>
                {/*<Typography className={styles.NMesa}>Comensales: {argumentos.comensales} </Typography>*/}
            </CardContent>
            <CardActions className={styles.botones}>
                {verComanda(argumentos.color)}
                <Button sx={{color: 'white', width: '50'}} variant="contained" onClick={() => {
                        argumentos.comanda(argumentos.mesa, 3);
                    }} >Mesa libre</Button>
            </CardActions>
        </Card>
    );
  }



