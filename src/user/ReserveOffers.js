import{ React, useState, useEffect }from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { readReserve } from './apiUser'
import Card from '../core/cardOfertasReserva';
import moment from 'moment';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Button, LinearProgress, makeStyles } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    }
}));

const ReserveOffers = (props) => {

    const {dataUser, accessToken} = isAuthenticated()
    const [loading, setLoading] = useState(false)
    const [reserva, setReserva] = useState([])
    const [error, setError] = useState({})
    const classes = useStyles()    
    const loadReserva = reservaId => {
        
        readReserve(dataUser.id, accessToken, reservaId ).then(data => {
            if(data.error){
                setError(data.error)
                setTimeout(() => {
                    setLoading(true)
                }, 2000);
            } else{
                setReserva(data.data)
                setTimeout(() => {
                    setLoading(true)
                }, 2000);
            }

        })
    }
    
    useEffect(() => {
        loadReserva(props.match.params.agendaId)
    }, [])

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    return ( 
                <Layout title={`Agendando hora`} 
                description={`Desde: ${moment(reserva.fecha).format('MMMM Do YYYY, h:mm a')} Hasta: ${moment(reserva.fechaFin).format('MMMM Do YYYY, h:mm a')}`} 
                className="containter-fluid">
                    <Grid container spacing={3} >
                        <Grid item xs={12}> 
                            <Typography variant="h5" component="h2" align="center">Ofertas</Typography>
                        </Grid>
                            {reserva.oferta && loading ? (
                                <Card reserva={ reserva } />
                            ) : ( 
                                <div className={classes.root}>
                                    <LinearProgress color="primary"/>
                                </div>
                            ) 
                            }
                        {
                            loading && !reserva.oferta ? showError() : null
                        }
                        <Grid item xs={12} align="center"> 
                            <Link to={`/profile/do-reserve/${dataUser.id}`}>
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

export default ReserveOffers;