import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from './../auth/index';
import { Link } from 'react-router-dom';
import { getRegiones, deleteRegion } from './apiAdmin'
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

const ManageRegion = () => {

    const [regiones, setRegiones] = useState([]);

    const { dataUser, accessToken } = isAuthenticated();

    const loadRegiones = () => {
        getRegiones().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setRegiones(data.data);
            }
        })
    }

    const destroyRegion = idR => {
        deleteRegion(idR, dataUser.id, accessToken).then(data => {
            if (data.error) {
                console.log(data.eror);
            } else {
                makeToast("success", "La region se ha borrado con éxito")
                loadRegiones();
            }
        })
    }

    useEffect(() => {
        loadRegiones();
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
            title="Administrar regiones"
            description="CRUD de regiones."
            className="container flui"
        >
            <Typography variant="h5" component="h2" align="center">
                Administrar Regiones
            </Typography>
            <Link to={`/create/region`}>
                <AddIcon style={{ marginLeft: "7%", cursor:"pointer" }} />
                Agregar una Region
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
                        {regiones.map((region) => (
                            <TableRow key={region.nombre}>
                                <TableCell component="th" scope="row">
                                    {region.nombre}
                                </TableCell>
                                <TableCell align="left" >
                                <Link to={`/manage/region/update/${region._id}`}>
                                    <EditIcon style={{ marginLeft: "7%", cursor:"pointer" }} />
                                </Link>
                                    
                                    
                                </TableCell>
                                <TableCell align="left">
                                <Link onClick={() => destroyRegion(region._id)}>
                                    <DeleteIcon style={{ marginLeft: "7%", cursor:"pointer" }} />
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

export default ManageRegion;