import React from 'react';

import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Pie() {
    const navigate = useNavigate();
    const longitud = window.width;

    function condiciones(){
        navigate("/privacidad");
    }

    return(
        <Container sx={{ py: 3, bgcolor: 'darkgrey'}}>
            <Grid marginTop={2} container width={longitud} spacing={{ xs: 2, md: 3 }} direction="row" >
                <Box 
                    marginLeft={2} 
                    width={300} 
                    textAlign={'left'}
                >
                    <Link onClick={()=>condiciones()}>Nuestro github.</Link>    
                </Box>
                <Box 
                    width={300}
                    textAlign={'center'}
                >
                    <Typography bold="true" color="white">
                            Desarrolladores
                    </Typography>
                    <Typography color="white">
                            Rebeca Radio Armindo
                    </Typography >
                    <Typography color="white">
                            Sergio Abián de Baro
                    </Typography>
                    <Typography color="white">
                            Martín Proy Márquez
                    </Typography>
                    <Typography color="white">
                            Miguel Traseira López
                    </Typography>
                </Box>
                <Box 
                width={300}
                textAlign={'right'}
                >
                    <Link onClick={()=>condiciones()}>términos de uso y privacidad.</Link>
                </Box>
            </Grid>
      </Container>
    );
 
}