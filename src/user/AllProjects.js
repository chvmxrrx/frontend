import React, {useState, useEffect} from 'react';
import { getProjects} from '../core/apiCore';
import { isAuthenticated } from '../auth';
import CardProject from '../core/cardProjects';
import Layout from '../core/Layout';
import Container from '@material-ui/core/Container';
import { LinearProgress } from '@material-ui/core';
import { Grid, makeStyles, Typography} from '@material-ui/core';
import CardSkeletonProyectos from '../core/CardSkeletonProyectos';

const AllProjects = () => {
    const [projects, setProjects] = useState([])
    const {dataUser, accessToken} = isAuthenticated()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const loadProjects = () => {
        getProjects(dataUser.id, accessToken).then( data => {
            if(data.error){
                setError(data.error)
                setTimeout( function () { setLoading(true) } , 2000) 
            } else {
                setProjects(data.data)
                setTimeout( function () { setLoading(true) } , 2000) 
            }
        })
    }
    useEffect(() =>{
        loadProjects()
    },[])

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )
    const useStyles = makeStyles((theme) => ({
        cardGrid: {
          paddingTop: theme.spacing(8),
          paddingBottom: theme.spacing(8)
        },
        root: {
            width: '100%',
            '& > * + *': {
              marginTop: theme.spacing(2),
            },
          },
      }));
    const classes = useStyles()
    return (
        <Layout title="Proyectos" description="Estas viendo los proyectos de inkapp">
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={3}>
                    <Grid item xs={12}> 
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Proyectos
                        </Typography>
                    </Grid>
                    { projects && loading ? (
                            projects.map((project, id) => (
                                <Grid item key={project._id} xs={12} md={4}>
                                    <CardProject key={id} project={project}/>
                                </Grid>
                            ))
                        ) : (
                            !error ? (
                                projects.map(() => 
                                <CardSkeletonProyectos/>
                                
                            ) ) : (
                                <div className={classes.root}>
                                    <LinearProgress color="secondary"/>
                                </div>
                            )
                        )
                    } 
                
                </Grid>
            </Container>
            {
                projects.length === 0 && loading ? showError() : null 
            }
        </Layout>
    );
};

export default AllProjects;