import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { getAllPublicaciones } from './apiCore';
import CardHome from './Card';
import { isAuthenticated } from '../auth';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
}));

const Home = () => {
    const classes = useStyles();

    const [publicaciones, setPublicaciones] = useState([]);
    const [error, setError] = useState(false);

    const loadAllPublicaciones = () => {
        getAllPublicaciones().then(data => {
            if (data.error) {
                setError(data.error);
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
            <Grid container spacing={3} justify="center">
                <Grid item xs={12}>
                    <Typography variant="h5" component="h2" align="center">Publicaciones</Typography>
                </Grid>
                {publicaciones.map((publicacion, i) => (
                    <CardHome key={i} publicacion={publicacion} />
                ))}
            </Grid>

        </Layout>
    );
}
export default Home;
