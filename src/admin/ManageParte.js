import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from './../auth/index';
import { Link } from 'react-router-dom';
import { getPartes, deleteParte } from './apiAdmin'
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

const ManageParte = () => {

    const [partes, setPartes] = useState([]);

    const { dataUser, accessToken } = isAuthenticated();

    const loadPartes = () => {
        getPartes().then(data => {
            if(data.error) {
                makeToast('error', data.error)
            }else{
                setPartes(data.data);
            }
        })
    }

    const destroyParte = idR => {
        deleteParte(idR, dataUser.id, accessToken).then(data => {
            if(data.error){
                makeToast('error', data.error)
            }else{
                makeToast("success", data.mensaje)
                loadPartes();
            }
        })
    }

    useEffect(() =>{
        loadPartes();
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
            title="Administrar partes del cuerpo"
            description="CRUD de partes del cuerpo."
            className="container flui"
        >
        

        <Typography variant="h5" component="h2" align="center">
                Administrar Partes del cuerpo
            </Typography>
            <Link to={`/create/parte`}>
                <AddIcon style={{ marginLeft: "7%", cursor:"pointer" }} />
                Agregar una Parte del cuerpo
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
                        {partes.map((parte) => (
                            <TableRow key={parte.nombre}>
                                <TableCell component="th" scope="row">
                                    {parte.nombre}
                                </TableCell>
                                <TableCell align="left" >
                                <Link to={`/manage/parte/update/${parte._id}`}>
                                    <EditIcon style={{ marginLeft: "7%", cursor:"pointer" }} />
                                </Link>
                                    
                                    
                                </TableCell>
                                <TableCell align="left">
                                <Link onClick={() => destroyParte(parte._id)}>
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

export default ManageParte;