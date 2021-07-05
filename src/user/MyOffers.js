import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { getMyOffers } from '../core/apiCore';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { Grid, LinearProgress, Typography, makeStyles } from '@material-ui/core';
import CardOffer from '../core/cardMyOffers';
const MisOfertas = () => {

    const [offers, setOffers] = useState([])
    const {dataUser, accessToken} = isAuthenticated()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const loadOffers = () => {
        getMyOffers(dataUser.id, accessToken).then( data => {
            if(data.error){
                setError(data.error)
                setTimeout( function () {setLoading(true)} , 2000) 
            } else {
                setOffers(data.data)
                setTimeout( function () {setLoading(true)} , 2000) 
            }
        })
    }
    useEffect(() =>{
        loadOffers()
    },[])
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
              marginTop: theme.spacing(2),
            },
          }
      }));

    const classes = useStyles()  
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
            <Link to={`/profile/project/projects/list`}>
                <p>Ver proyectos de Inkapp</p>
            </Link>
        </div>
    )

   return ( 
   <Layout title="Mis ofertas" description="Estas viendo las ofertas que haz realizado">
       <Grid container spacing= {3}  justify="center" direction="row" alignItem="center">
            <Grid item xs={12}> 
                <Typography variant="h5" component="h2" align="center">Ofertas que haz enviado</Typography>
            </Grid>
                { 
                offers && loading ? (
                    offers.map((offer, id) => (
                        <CardOffer key={id} offer={offer}/>
                    ))
                ) : (
                    <div className={classes.root}>
                         <LinearProgress color="primary"/>
                    </div>
                   
                )
                }
        </Grid>
        {
            loading && offers.length === 0 ? (showError()) : null 
        }
    </Layout>
    )

};

export default MisOfertas;