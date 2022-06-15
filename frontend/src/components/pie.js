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
                    marginLeft={5} 
                    width={200}
                    textAlign={'left'}
                >   <h3>
                    <Typography bold="true" variant="underline" color="white">
                            Desarrolladores
                    </Typography>
                    </h3>
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
                    marginTop={8}
                    marginLeft={10} 
                    width={300} 
                    textAlign={'right'}
                >   <h4>
                    <Link href="https://github.com/ULE-Informatica/aw-segunda-convocatoria-aw-segunda-convocatoria-2d.git">Nuestro github.</Link> 
                    </h4>   
                </Box>
                <Box
                     marginTop={8}
                    marginLeft={25} 
                    width={300} 
                    textAlign={'right'}
                >   <h4>
                    <Link onClick={()=>condiciones()}>Términos de uso y privacidad.</Link>
                    </h4>
                </Box>
            </Grid>
      </Container>
    );
 
}