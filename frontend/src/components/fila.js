import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export default function Fila(argumentos) {
    var espacios = " ֎ ";
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
                        {espacios} {argumentos.uno}
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
            </Box>
        </Card>
    );
  }
