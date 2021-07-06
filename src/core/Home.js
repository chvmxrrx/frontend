import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { getAllPublicaciones } from './apiCore';
import CardHome from './Card';
import { isAuthenticated } from '../auth';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import makeToast from '../Toaster/Toaster';
import { LinearProgress } from '@material-ui/core';
import CardSkeleton from './CardSkeleton';
const useStyles = makeStyles((theme) => ({
    image: {
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: "100%",
        height: "30%",
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    },
}));

const Home = () => {
    const classes = useStyles();

    const [publicaciones, setPublicaciones] = useState([]);
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const loadAllPublicaciones = () => {
        getAllPublicaciones().then(data => {
            if (data.error) {
                makeToast("warning", data.error)
                setError(data.error)
                setTimeout( function () {setLoading(true)}, 2000) 
            } else {
                setPublicaciones(data.data);
                setTimeout( function () {setLoading(true)}, 2000) 
            }
        })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )
    useEffect(() => {
        loadAllPublicaciones();
    }, []);

    return (
        <Layout title="Home Page" description="Aplicacion Inkapp para tatuadores." className="container-fluid" jumbotron="false" slide="true">
            <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                {
                    loading && publicaciones ? (
                        publicaciones.map((publicacion, i) => (
                            <CardHome key={i} publicacion={publicacion} />
                        ))
                    ) : (        
                        publicaciones.map(() => 
                            <CardSkeleton/>
                        )                       
                    )
                }
                
            </Grid>
            </Container>
            {
                loading && publicaciones.length === 0 ? showError() : null 
            }
        </Layout>
    );
}
export default Home;
