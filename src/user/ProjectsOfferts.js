import{ React, useState, useEffect }from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { readProject } from './apiUser'
import CardProject from '../core/cardOfertasProjects';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
const ProjectsOffers = (props) => {

    const {dataUser, accessToken} = isAuthenticated()
    const [project, setProject] = useState([])
    const [error, setError] = useState({})
        
    const loadProject = projectId => {
        
        readProject(dataUser.id, accessToken, projectId ).then(data => {
            if(data.error){
                setError(data.error)
            } else{
                setProject(data)
            }

        })
    }
    
    useEffect(() => {
        
        const projectId = props.match.params.projectId 
        loadProject(projectId)
        
    }, [])

    return ( 
        <Layout title={project.nombre} 
        description="Estas viendo las ofertas de tu proyecto!" 
        className="containter-fluid">
            
            <Grid container spacing={3} direction="row" justify="center">
            <Grid item xs={12}> 
                <Typography variant="h5" component="h2" align="center">Ofertas del proyecto: {project.nombre}</Typography>
            </Grid>
                    {project && project.tamaño && <CardProject project={ project } />}
            </Grid> 
            
        </Layout>
    )  
};

export default ProjectsOffers;