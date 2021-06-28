import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { getMyOffersReserve } from '../core/apiCore';
import { isAuthenticated } from '../auth';
import Card from '../core/cardMyReserveOffers';
import { Link, Redirect } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
const MyReserveOffers = () => {

    const [offers, setOffers] = useState([])
    const {dataUser, accessToken} = isAuthenticated()
    const [error, setError] = useState(false)

    const loadOffers = () => {
        getMyOffersReserve(dataUser.id, accessToken).then( data => {
            if(data.error){
                setError(data.error)
            } else {
                setOffers(data.data)
            }
        })
    }
    useEffect(() =>{
        loadOffers()
        
    },[])

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
            <Link to={`/profile/project/projects/list`}>
                <p>No haz realizado ninguna oferta. Ver proyectos de Inkapp</p>
            </Link>
        </div>
    )
   return ( 
   <Layout title="Mis ofertas" description="Estas viendo las ofertas que haz realizado">
       
       <Grid container spacing={3} direction="row"
            justify="center"
            alignItems="center">
            <Grid item xs={12}> 
                <Typography variant="h5" component="h2" align="center">Ofertas de reservas</Typography>
            </Grid> 
                     { offers.map((offer, id) => (
                        <Card key={id} offer={offer}/>
                    ))}
            <Grid item xs={12} align="center"> 
            {showError()}
                <Link to={`/user/dashboard`}>
                    <Button variant="contained" color="primary">
                        <ArrowBack>
                        </ArrowBack>
                        Volver
                    </Button>
                </Link>
            </Grid>
        </Grid>
       
      
    </Layout>
    )

};

export default MyReserveOffers;