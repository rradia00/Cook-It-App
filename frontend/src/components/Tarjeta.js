import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';



export default function Tarjeta(argumentos){
    return(
    <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {argumentos.title}
          </Typography>
          <Typography>
            {argumentos.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
           size="small"
           onClick={() => {argumentos.borrar(argumentos.index)}}
           >
           Borrar
           </Button>
           <Button
           size="small"
           onClick={() => {argumentos.edit(argumentos.index)}}
           >
           Editar
           </Button>
        </CardActions>
    </Card>
);
}
