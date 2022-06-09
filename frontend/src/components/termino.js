import * as React from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Termino(argumentos){
    //alert("*"+argumentos.titulo);
    return(
        <Container>
            <Typography variant="h5" color="inherit" sx={{width: 700}} bold="true">
                {argumentos.titulo}
            </Typography>
            <Typography>
                {argumentos.item}
            </Typography>
        </Container>
    );
}
