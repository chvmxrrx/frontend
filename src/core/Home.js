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
}));

const Home = () => {
    const classes = useStyles();

    const [publicaciones, setPublicaciones] = useState([]);

    const loadAllPublicaciones = () => {
        getAllPublicaciones().then(data => {
            if (data.error) {
                makeToast("warning", data.error)
            } else {
                setPublicaciones(data.data);
            }
        })
    }

    useEffect(() => {
        loadAllPublicaciones();
    }, []);

    return (
        <Layout title="Home Page" description="Aplicacion Inkapp para tatuadores." className="container-fluid" jumbotron="false" slide="true">
            <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                {publicaciones.map((publicacion, i) => (
                    <CardHome key={i} publicacion={publicacion} />
                ))}
            </Grid>
            </Container>
        </Layout>
    );
}
export default Home;
