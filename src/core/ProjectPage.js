import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { getProyecto } from './apiCore';
import { isAuthenticated } from '../auth';
import CardProyectoPage from './cardProyecto';
import makeToast from '../Toaster/Toaster';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import CardSkeleton from './CardSkeleton';
import CircularProgress from '@material-ui/core/CircularProgress';

const ProjectPage = props => {

    const [proyecto, setProyecto] = useState({});
    const {accessToken, dataUser} = isAuthenticated();
    const [loading, setLoading] = useState(false);

    const loadProyecto = proyectoId => {
        getProyecto(proyectoId, dataUser.id, accessToken).then(data => {
            if(data.error) {
                makeToast('error', data.error)
            }else{
                setProyecto(data);
                setLoading(true)
            }
        })
    }

    useEffect(() => {
        const proyectoId = props.match.params.proyectoId
        loadProyecto(proyectoId)
    }, [])

    return (
        <Layout 
            title={`Proyecto`} 
            description={""} 
            className="container-fluid"
        >
            <Grid container justify="center" style={{marginTop: '5%'}}>
                {
                    (proyecto && loading) ? (
                        <CardProyectoPage project={proyecto}/>
                    ) : (
                        <CardSkeleton/>
                    )
                }
            </Grid>
            
        </Layout>
    );
}

export default ProjectPage;