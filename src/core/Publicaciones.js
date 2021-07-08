import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { getPublicacionesFiltrado } from './apiCore';
import { getEstilosTatuajes } from '../admin/apiAdmin';
import CardHome from './Card';
import { isAuthenticated } from '../auth';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import makeToast from '../Toaster/Toaster';
import { Alert } from 'react-bootstrap';
import { LinearProgress } from '@material-ui/core';

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
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(8),
    },
    filter: {
        backgroundColor: "red",
        position: "relative",
        left: "0"
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
}));

const Publicaciones = () => {
    const classes = useStyles();

    const { dataUser, accessToken } = isAuthenticated();

    const [publicaciones, setPublicaciones] = useState([]);
    const [estilos, setEstilos] = useState([]);
    const [loading, setLoading] = useState(false)

    const [checked, setChecked] = useState([]);
    const [myFilters, setMyFilters] = useState({
        filters: { estiloTatuaje: [] }
    });
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilteredResult] = useState([]);
    const [filteredResultsSize, setFilteredResultSize] = useState([]);


    const handleTogle = estilo => () => {
        const currentCategoryId = checked.indexOf(estilo);
        const newCheckedCategoryId = [...checked]

        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(estilo)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        //console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilter(newCheckedCategoryId, "estiloTatuaje")
    }

    const handleFilter = (filters, filterBy) => {
        //console.log(filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    }

    const loadFilteredResults = newFilter => {
        getPublicacionesFiltrado(skip, limit, newFilter).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setFilteredResult(data.data);
                setFilteredResultSize(data.size);
                setLoading(true)
            }
        })
    }

    const init = () => {
        getEstilosTatuajes(dataUser.id, accessToken).then(data => {
            if (data.error) {
                makeToast("error", data.error)
            } else {
                setEstilos(data.data);
                setLoading(true)
            }
        })
    }

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);



    return (
        <Layout title="Explorar publicaciones" description="Encuentra publicaciones de distintos usuarios de Inkapp." className="container-fluid" jumbotron="true" >
            <Container className={classes.cardGrid} maxWidth="100%">
                <Grid container>
                    <Grid item xs={2}>
                        <h4>Estilos de tatuaje</h4>
                        <ul>
                            {
                                estilos.map((data, i) => (
                                    <li key={i} className="list-unstyled">
                                        <input type="checkbox" onChange={handleTogle(data._id)} value={checked.indexOf(data._id === -1)} className="form-check-input" />
                                        <label className="form-check-label">{data.nombre}</label>
                                    </li>
                                ))
                            }
                        </ul>
                    </Grid>
                    <Grid item xs={10}>
                        <Grid container spacing={4}>
                            {
                                filteredResults && loading ? (
                                    filteredResultsSize === 0 ? (
                                        <Grid item xs={12}>
                                            <Alert variant={"warning"}>
                                                Aun no hay publicaciones de este estilo.
                                            </Alert>
                                        </Grid>

                                    ) : (
                                        filteredResults.map((publicacion, i) => (
                                            <Grid item key={i} xs={12} md={4}>
                                                <CardHome key={i} publicacion={publicacion} />
                                            </Grid>
                                        ))
                                    )
                                ) : (
                                    <div className={classes.root}>
                                        <Grid item xs={12}>
                                            <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
                                                Cargando publicaciones...
                                            </Typography>
                                        </Grid>
                                        <LinearProgress color="secondary" />
                                    </div>
                                )


                            }
                        </Grid>

                    </Grid>

                </Grid>
            </Container>
        </Layout >
    );
}
export default Publicaciones;
