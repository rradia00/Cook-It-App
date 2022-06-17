import * as React from 'react';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTable } from 'react-table';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Pie from '../components/pie';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                www.grupoInnova6d.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function useColumns() {
    const columns = useMemo(
      () => [
        {
          Header: "Ingrediente",
          accessor: "nombre"
        },
        {
          Header: "Cantidad",
          accessor: "cantidad"
        },
        {
          Header: "Creado",
          accessor: "fCre"
        },
        {
          Header: "última Compra",
          accessor: "fAct"
        }
      ],
      []
    );
   
    return columns;
}

/*var ingredientes=[
    {
        nombre: "Manzanas",
        cantidad: "2",
        fCre: "13-junio-1313",
        fAct: "42-mayo-2015"
    },
    {
        nombre: "Peruchos",
        cantidad: "80",
        fCre: "13-junio-1213",
        fAct: "8-mayo-2001"
    }
    
];*/






const theme = createTheme();

export default function ListadoIngredientes() {

    const navigate = useNavigate();
    const cocinero = sessionStorage.getItem('usuario');
    const [admin, setAdmin]=useState([]);
    const [ingredientes, setIngredientes]=useState([]);
    
   useEffect(() => {
        localizaIngredientes();
        if(sessionStorage.getItem("admin") === "true"){
            setAdmin(true);
        }else{
            setAdmin(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function useRows() {
        const rows = useMemo(
            ()=>
                //ingredientes,
                []
            );
       
        return rows;
    }
    
    async function cargarIngredientes(){  
        axios.get(`http://localhost:3053/ingredientes`, {
        }).then((response) => {
            alert(response);
            setIngredientes(response);
        });
    }

    const columns = useColumns();
    const data = useRows();
    const table = useTable({ columns, data });
    
    

    async function localizaIngredientes(){
        await cargarIngredientes();
    }

    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
      } = table;
     

    var url = `http://localhost:3053/`;


    function handleSubmit(){
        sessionStorage.removeItem("mesa");
        navigate(`/${cocinero}/cocinero`);
    }

    

   

    function salir(){
        navigate('/'+cocinero+'/admin/menuIngredientes');
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Container maxWidth="md">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="left"
                            color="text.primary"
                            gutterBottom
                        >
                            Listado de Ingredientes
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <Container sx={{ py: 8 }} maxWidth="md">
                                <table {...getTableProps()}>
                                    <thead>
                                        {
                                        headerGroups.map(headerGroup => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                            {
                                                headerGroup.headers.map((column) => (
                                                <th {...column.getHeaderProps()}>
                                                    {column.render("Header")}
                                                </th>
                                                ))
                                            }
                                            </tr>
                                        ))
                                        }
                                    </thead>
                                    <tbody {...getTableBodyProps()}>
                                        {
                                            rows.map(row => {
                                                // Llamamos a la función que prepara la fila previo renderizado
                                                prepareRow(row);
                                                return (
                                                // Añadimos las propiedades a la fila
                                                <tr {...row.getRowProps()}>
                                                    {
                                                    // Recorremos cada celda de la fila
                                                    row.cells.map((cell) => {
                                                        // Añadimos las propiedades a cada celda de la fila
                                                        return (
                                                        <td {...cell.getCellProps()}>
                                                            {
                                                            // Pintamos el contenido de la celda
                                                            //cell.render("Cell")
                                                            }
                                                        </td>
                                                        );
                                                    })
                                                    }
                                                </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>

                            </Container>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => {
                                    salir();
                                }}
                            >
                                Salir
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </main>
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Todos los derechos reservados
                </Typography>
                <Copyright />
            </Box>
            <Pie></Pie>
        </ThemeProvider>
    );
}
