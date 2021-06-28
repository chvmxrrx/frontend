import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {  isAuthenticated } from './../auth/index';
import { Redirect } from 'react-router-dom';
import makeToast from '../Toaster/Toaster';
import { listarAgenda } from '../user/apiUser';
import CardAgenda from './CardAgenda';
import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
const AgendaTatuadores = ({match}) => {
   
    const { dataUser, accessToken } = isAuthenticated();
    const [horas, setHoras] = useState([]);
    const init = (userId) => {
        listarAgenda(dataUser.id, accessToken, userId).then(data => {
            if(data.error){
                makeToast('error', data.error)
            } else {
                setHoras(data.data)
            }
        })
}

    useEffect(() => {
      init(match.params.userId)
    }, []);

    
    const clickSubmit = event => {
        event.preventDefault();
    }


    return (
        <Layout
            title="Agenda"
            description="Estás revisando la agenda de un tatuador"
            className="container col-md-8 offset-md-2"
        >
            
            <Grid container spacing={3} direction="row" justify="center" alignContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h5" component="h2" align="center">
                        Agenda
                    </Typography>
                </Grid>
                     {horas.length > 0 ? (
                            horas.map((horas, i) => (
                                <CardAgenda key={i} horas={horas} />
                            ))
                        ) : (
                            <Grid item xs={12}>Lo sentimos, este usuario aún no crea su agenda.</Grid>
                        )}
                <Grid item xs={12} align="center">
                    <Link className="btn btn-primary" to={`/profile/${match.params.userId}`}><ArrowBack />Volver</Link>
                </Grid> 
            </Grid>

            
        </Layout>
    );

};

export default AgendaTatuadores;