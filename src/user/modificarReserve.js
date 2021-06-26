import React, {useEffect, useState} from 'react';
import { Typography, Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, DateTimePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { isAuthenticated } from '../auth';
import makeToast from '../Toaster/Toaster';
import { buscarFecha, modificarAgenda } from './apiUser';
import Layout from '../core/Layout';
import SaveIcon from '@material-ui/icons/Save';
import moment from 'moment';
import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { AccessTime, ArrowBack } from '@material-ui/icons';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
const ModificarReserve = ({match}) => {

    const [selectedDate, handleDateChange] = useState()
    const { dataUser, accessToken } = isAuthenticated();
    const [fechaInicio, setFechaInicio] = useState()
    const [fechaFin, setFechaFin] = useState()
    const [redirectToReferrer, setRedirectToReferrer] = useState(false)
    const modificarHora = idHora => event => {
        
        event.preventDefault()
        if(!selectedDate){
          makeToast('error', 'Debe seleccionar una fecha antes de modificar')
        } else {
          modificarAgenda(dataUser.id, accessToken, idHora, selectedDate).then(data =>{
            if(data.error){
              makeToast('error', data.error)
            }else {
              makeToast('success', data.mensaje)
              setRedirectToReferrer(true)
            }
          })
        }
      }
    const redirectUser = () =>{
        if(redirectToReferrer) {
            return <Redirect to={`/profile/do-reserve/${dataUser.id}`}/>
        }
    }
    const rellenarFecha = () => {
        buscarFecha(dataUser.id, accessToken, match.params.idFecha).then(data => {
            if(data.error){
                makeToast('error', data.error)
            }else{
              
                setFechaInicio(data.fecha)
                setFechaFin(data.fechaFin)
            }
        })
    }

    useEffect(()=>{
        rellenarFecha()

    }, [])
    const createOfferForm = () => (
        <React.Fragment>
      <Typography variant="h4" gutterBottom align="center">
        Estas modificando tu agenda
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={6} align="center">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              variant="static"
              margin="normal"
              id="date-picker"
              label="Hora de atención"
              minDate={Date.now()}
              maxDate="12/31/2025"
              value={selectedDate} 
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
        </MuiPickersUtilsProvider>
        </Grid >
        <Grid item xs={6} >
        <Typography variant="h6" gutterBottom align="center">
            La fecha que estás modificando es:
        </Typography>
        <List>
          <ListItem>
              <ListItemAvatar>
                <AccessTime />
              </ListItemAvatar>
            <ListItemText primary="Inicio" secondary={moment(fechaInicio).format('MMMM Do YYYY, h:mm a')} />
            <ListItemText primary="Termino" secondary={moment(fechaFin).locale('es').format('MMMM Do YYYY, h:mm a')} />
          </ListItem> 
        <Typography variant="body2" gutterBottom align="center">
            (Selecciona una fecha del calendario y luego presiona botón modificar)
        </Typography>      
        </List> 
        </Grid>
  
        <Grid item xs={6} align="center">
            <Link className="btn btn-primary" to={`/profile/do-reserve/${dataUser.id}`}><ArrowBack />Volver</Link>
        </Grid>
        <Grid item xs={6} align="center">
          <button  className="btn btn-primary" onClick={modificarHora(match.params.idFecha)}><SaveIcon />Modificar Hora</button>
        </Grid>
      </Grid>
      
    </React.Fragment>
        
    );

    return (
        <Layout
            title="Agenda"
            description="Modificando agenda"
            className="container col-md-8 offset-md-2"
        >
            
            {createOfferForm()}
            {redirectUser()}
            
        </Layout>
    );

};

export default ModificarReserve;