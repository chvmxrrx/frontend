import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { getMyProjects } from '../core/apiCore';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import CardMyProject from '../core/cardMyProjects';
import { Grid, makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { LinearProgress } from '@material-ui/core';
import ShowAvatar from '../core/showAvatar';
import makeToast from '../Toaster/Toaster';
import CardSkeletonProyectos from '../core/CardSkeletonProyectos';
const MisProyectos = () => {

    const [projects, setProjects] = useState([])
    const {dataUser, accessToken} = isAuthenticated()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const loadProjects = () => {
        getMyProjects(dataUser.id, accessToken).then( data => {
            if(data.error){
                setError(data.error)
                setTimeout(function () { setLoading(true) } , 2000 ) 
            } else {
                setProjects(data.data)
                setTimeout(function () { setLoading(true) } , 2000 ) 
            }
        })
    }
    useEffect(() =>{
        loadProjects()
        
    },[])
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
        text: {
            textDecoration: 'none',
            color: 'black'
        }
      }));
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
            {
                dataUser.membresia === false ? (
                    <Link onClick={() => makeToast('error', 'Debes adquirir una membresía')}>
                        <p>Crear un nuevo proyecto</p>
                    </Link>
                ) 
                : (
                    <Link to={`/profile/project/create/${dataUser.id}`}>
                        <p>Crear un nuevo proyecto</p>
                    </Link>
                )    
            }
            
        </div>
    )
    const classes = useStyles()
   return ( 
   <Layout title="Mis proyectos" description="Estas viendo tus proyectos!">
       <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Proyectos de <Link to={`/profile/${dataUser.id}`} className={classes.text}>{dataUser.user}</Link>
                    </Typography>
                </Grid>
                    { projects && loading ? (
                            projects.map((project, id) => (
                                <Grid item key={project._id} xs={12} md={4}>
                                    <CardMyProject key={id} project={project}/>
                                </Grid>
                            ))
                        ) : (
                            projects.map(() => 
                                <CardSkeletonProyectos/>
                            )   
                        )
                    } 
            
        </Grid>
      </Container>
      {
        loading && projects.length === 0 ? showError() : null
      }
    </Layout>
    )

};

export default MisProyectos;