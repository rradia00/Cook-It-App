import * as React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Mesa(argumentos) {

    function proceso(){
        var entregar = false;
       
        if(argumentos.estado==="yellow") entregar=true;
        return (
            (entregar) ? 
                <Container sx={{display: 'flex', flexDirection: 'colum'}}>
                    <Typography
                        component="h1"
                        variant="h6"
                        align="left"
                        color="black"
                        width="100"
                    >
                        {argumentos.nombrePlato}
                    </Typography>
                    <Grid container justifyContent="flex-end"> 
                        <Button sx={{color: 'black', width: '100', margin:"normal"}} 
                            onClick={() => {
                                argumentos.servido(argumentos.posicion, argumentos.tipo);

                            }} 
                            variant="outlined">Servido
                        </Button>
                    </Grid>
                </Container>
            :   
            <Container sx={{display: 'flex', flexDirection: 'colum'}}>
                <Typography
                    component="h1"
                    variant="h6"
                    align="left"
                    color="white"
                    width="100"
                >
                    {argumentos.nombrePlato}
                </Typography>
            </Container>
        );
    }

    return (      
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: argumentos.estado}}
        >
            <CardContent sx={{ flexGrow: 1, color: 'white'}}>   
                {proceso()}
            </CardContent>
        </Card>
    );
  }



