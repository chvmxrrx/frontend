import React, {useState, useEffect} from 'react';
import { getProjects } from '../core/apiCore';
import { isAuthenticated } from '../auth';
import CardProject from '../core/cardProjects';
import Layout from '../core/Layout';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
const AllProjects = () => {
    const [projects, setProjects] = useState([])
    const {dataUser, accessToken} = isAuthenticated()
    const [error, setError] = useState(false)

    const loadProjects = () => {
        getProjects(dataUser.id, accessToken).then( data => {
            if(data.error){
                setError(data.error)
            } else {
                setProjects(data.data)
            }
        })
    }
    useEffect(() =>{
        loadProjects()
    },[])

    return (
        <Layout title="Proyectos" description="Estas viendo los proyectos de inkapp">
            <Grid container spacing={3}>
                <Grid item xs={12}> 
                    <Typography variant="h5" component="h2" align="center">Proyectos</Typography>
                </Grid>
            
                { projects.map((project, id) => (
                    <CardProject key={id} project={project}/>
                ))}
            
            </Grid>
        </Layout>
    );
};

export default AllProjects;