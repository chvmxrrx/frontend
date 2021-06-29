import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { getMyProjects } from '../core/apiCore';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import CardMyProject from '../core/cardMyProjects';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
const MisProyectos = () => {

    const [projects, setProjects] = useState([])
    const {dataUser, accessToken} = isAuthenticated()
    const [error, setError] = useState(false)

    const loadProjects = () => {
        getMyProjects(dataUser.id, accessToken).then( data => {
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

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
            <Link to={`/profile/project/create/${dataUser.id}`}>
                <p>Crear un nuevo proyecto</p>
            </Link>
        </div>
    )
    
   return ( 
   <Layout title="Mis proyectos" description="Estas viendo tus proyectos!">
       <Grid container spacing={3} direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h5" component="h2" align="center">
                    Proyectos de {dataUser.user}
                </Typography>
            </Grid>
                { projects.map((project, id) => (
                    <CardMyProject key={id} project={project}/>
                ))}
      {showError()}
      </Grid>
    </Layout>
    )

};

export default MisProyectos;