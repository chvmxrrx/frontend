import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from './../auth/index';
import { Link } from 'react-router-dom';
import { getEstilosTatuajes, deleteEstiloTatuaje } from './apiAdmin'
import makeToast from '../Toaster/Toaster';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { Typography } from '@material-ui/core';

const ManageEstilo = () => {

    const [estilos, setEstilos] = useState([]);

    const { dataUser, accessToken } = isAuthenticated();

    const loadEstilos = () => {
        getEstilosTatuajes(dataUser.id, accessToken).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setEstilos(data.data);
            }
        })
    }

    const destroyEstilo = idR => {
        deleteEstiloTatuaje(idR, dataUser.id, accessToken).then(data => {
            if (data.error) {
                console.log(data.eror);
            } else {
                makeToast("success", "El estilo se ha borrado con éxito")
                loadEstilos();
            }
        })
    }

    useEffect(() => {
        loadEstilos();
    }, [])

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
        celda: {
            fontWeight: "bold",
        },
    });

    const classes = useStyles();

    return (
        <Layout
            title="Administrar Estilos de tatuaje"
            description="CRUD de Estilos de tatuaje."
            className="container flui"
        >

            <Typography variant="h5" component="h2" align="center">
                Administrar Estilos de tatuaje
            </Typography>
            <Link to={`/create/estiloTatuaje`}>
                <AddIcon style={{ marginLeft: "7%", cursor: "pointer" }} />
                Agregar un Estilo de tatuaje
            </Link>

            <TableContainer component={Paper}>

                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow >
                            <TableCell className={classes.celda} align="left">Nombre</TableCell>
                            <TableCell className={classes.celda} align="left">Modificar</TableCell>
                            <TableCell className={classes.celda} align="left">Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {estilos.map((estilo) => (
                            <TableRow key={estilo.nombre}>
                                <TableCell component="th" scope="row">
                                    {estilo.nombre}
                                </TableCell>
                                <TableCell align="left" >
                                    <Link to={`/manage/estiloTatuaje/update/${estilo._id}`}>
                                        <EditIcon style={{ marginLeft: "7%", cursor: "pointer" }} />
                                    </Link>


                                </TableCell>
                                <TableCell align="left">
                                    <Link onClick={() => destroyEstilo(estilo._id)}>
                                        <DeleteIcon style={{ marginLeft: "7%", cursor: "pointer" }} />
                                    </Link>



                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Layout>
    );
}

export default ManageEstilo;