import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { getAllPublicaciones } from './apiCore';
import CardHome from './Card';
import { isAuthenticated } from '../auth';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
const Home = () => {

    const [publicaciones, setPublicaciones] = useState([]);
    const [error, setError] = useState(false);

    const loadAllPublicaciones = () => {
        getAllPublicaciones().then(data => {
            if(data.error){
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
        <Layout title="Página principal" description="Aplicacion Inkapp para tatuadores." className="container-fluid">
            <Grid container spacing={3} justify="center">
            <Grid item xs={12}>
                <Typography variant="h6" component="h2" align="center">Publicaciones</Typography>
            </Grid>
                { publicaciones.map((publicacion, i) => (
                    <CardHome key={i} publicacion={publicacion} />
                ))}
            </Grid>
            
        </Layout>
    );
}
export default Home;
