import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {  isAuthenticated } from '../auth/index';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save';
import {List, ListItem, ListItemText, ListItemAvatar, Badge, Button} from '@material-ui/core';
import { createHora, deleteAgenda, readAgenda } from './apiUser';
import makeToast from '../Toaster/Toaster'
import moment from 'moment';
import { AccessTime, Edit, CalendarToday, Done} from '@material-ui/icons';
import { IconButton, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

const DoReserve = ({match}) => {
  moment.locale('es')
    const [selectedDate, handleDateChange] = useState()
    const [selectedTermino, handleTerminoChange] = useState()
    const [agenda, setAgenda] = useState([])
    const { dataUser, accessToken } = isAuthenticated();
    
    useEffect(() => {
        loadHoras()
    }, []);

    const clickSubmit = event => {
      event.preventDefault();
      
      if(selectedDate && selectedTermino){
        const fechaInicio = moment(selectedDate).format('MMMM Do YYYY, hh:mm a')
        const fechaTermino = moment(selectedDate)
        .set("hour", selectedTermino.getHours())
        .set("minute", selectedTermino.getMinutes())
        .set("seconds", selectedTermino.getSeconds())
        .format('MMMM Do YYYY, hh:mm a')
        agenda.length > 0 ? (
          agenda.map((data) => {
            if((fechaInicio >= moment(data.fecha).format('MMMM Do YYYY, hh:mm a') && fechaInicio <= moment(data.fechaFin).format('MMMM Do YYYY, hh:mm a')) 
            || (fechaTermino >= moment(data.fecha).format('MMMM Do YYYY, hh:mm a') && fechaTermino <= moment(data.fechaFin).format('MMMM Do YYYY, hh:mm a'))) {
              return console.log('hello');
            } else {
              return console.log('Hola');
            }
          } 
        )
        ) : (
          console.log(agenda.length)
        )
        
      } else {
        makeToast('error', 'Debe seleccionar horas y fechas correspondientes')
        // console.log(fechaInicio)
        // // console.log(fechaTermino);
        // console.log(moment(agenda[0].fecha).format('MMMM Do YYYY, hh:mm a'));
        // console.log(moment(agenda[0].fechaFin).format('MMMM Do YYYY, hh:mm a'));
        // console.log(moment(agenda[0].fecha).format('MMMM Do YYYY, hh:mm a') < fechaInicio);
        // console.log(moment(fechaInicio).isBetween(moment(agenda[0].fecha).format('MMMM Do YYYY, hh:mm a'),moment(agenda[0].fechaFin).format('MMMM Do YYYY, hh:mm a')));
      }
      
      // agenda.map((data, i) => (
      //   // console.log(moment(data.fecha).format('MMMM Do YYYY, hh:mm a'))
      //   console.log(moment(fechaInicio).isBetween(moment(data.fecha).format('MMMM Do YYYY, hh:mm a'), moment(data.fechaFinal).format('MMMM Do YYYY, h:mm a')))
      //   // console.log(moment(fechaInicio).isBetween(moment(data.fecha).format('MMMM Do YYYY, hh:mm a'), moment(data.fechaFin).format('MMMM Do YYYY, h:mm a')))
      
      //   ))
      // const dateTermino = moment(selectedDate)
      //   .set("hour", selectedTermino.getHours())
      //   .set("minute", selectedTermino.getMinutes())
      //   .set("seconds", selectedTermino.getSeconds())
    //     if(!selectedDate || !selectedTermino){
    //       makeToast('error', 'Debe seleccionar su horario')
    //   // } else if ( moment(selectedDate).format('MMMM Do YYYY, h:mm a') < moment(dateTermino).format('MMMM Do YYYY, h:mm a') ) {
    //   //     makeToast('error', 'Hora de termino debe ser superior a la de inicio')
    //   // 
    //     } else if (agenda.length > 0 && agenda){ 
    //       agenda.map((data, i) => (
            
    //         (moment(selectedDate).isBetween(moment(data.Fecha).format('MMMM Do YYYY, h:mm a'), moment(data.FechaFin).format('MMMM Do YYYY, h:mm a')) 
    //         || moment(dateTermino).isBetween(moment(data.Fecha).format('MMMM Do YYYY, h:mm a'), moment(data.FechaFin).format('MMMM Do YYYY, h:mm a')))
    //         ? (
    //           // makeToast('error', 'Fecha esta agendada')
              
    //           console.log(moment(selectedDate).isBetween(moment(data.Fecha).format('MMMM Do YYYY, h:mm a'), moment(data.FechaFin).format('MMMM Do YYYY, h:mm a')))
    //         ) : (
    //           console.log(moment(selectedDate).isBetween(moment(data.Fecha).format('MMMM Do YYYY, h:mm a'), moment(data.FechaFin).format('MMMM Do YYYY, h:mm a')))
    //           // createHora(dataUser.id, accessToken, selectedDate, dateTermino).then(data => {
    //           //   if(data.error){
    //           //     makeToast('error', data.error)
    //           //   } else {
    //           //     makeToast('success', data.mensaje)
    //           //     loadHoras()
    //           //   }
    //           // })
    //         )
    //       ))}
    //     }
    // //   } else {
    // //         createHora(dataUser.id, accessToken, selectedDate, dateTermino).then(data => {
    // //           if(data.error){
    // //             makeToast('error', data.error)
    // //           } else {
    // //             makeToast('success', data.mensaje)
    // //             loadHoras()
    // //           }
    // //         })
    // //       }
    // // }      
    }
    const loadHoras = () => {
        readAgenda(dataUser.id, accessToken).then(data => {
          if(data.error){
            makeToast('error', data.error)
          }else{
            setAgenda(data.data)
          }
        })
    }

    const deleteHora = idHora => event => {
      event.preventDefault()
      deleteAgenda(dataUser.id, accessToken, idHora).then(data =>{
        if(data.error){
          makeToast('error', data.error)
        }else {
          makeToast('success', data.mensaje)
          loadHoras()
        }
      })
    }
    

    const createOfferForm = () => (
        <React.Fragment>
      <Typography variant="h4" gutterBottom align="center">
        Calendario 
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          minDate={Date.now()}
          maxDate="12/31/2025"
          id="date-picker-inline"
          label="Seleccione día"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Seleccione hora de inicio"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Seleccione hora de termino"
          value={selectedTermino}
          onChange={handleTerminoChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </MuiPickersUtilsProvider>
        <Grid item xs={12} align="center">
         <button onClick={clickSubmit} className="btn btn-primary"><SaveIcon />Agendar hora</button>
        </Grid>
        <Typography variant="body2" align="center" style={{color: 'black'}}>
          *Puedes agendar hasta 5 horas como máximo*
        </Typography>
        </Grid >
        <Grid item xs={12} direction="row"
            justify="center"
            alignItems="center">
        <Typography variant="h6" gutterBottom align="center">
          Horas agendadas
        </Typography>
        <List>
        {agenda.map((data, i) => (
          <ListItem>
              <ListItemAvatar>
                <AccessTime />
              </ListItemAvatar>
            <ListItemText primary="Inicio" secondary={moment(data.fecha).format('MMMM Do YYYY, h:mm a')} variant="h1"/>
            <ListItemText primary="Termino" secondary={moment(data.fechaFin).format('MMMM Do YYYY, h:mm a')} variant="body2"/>
            <Link to={`/profile/agenda/offers/${data._id}`}>
                {
                  data.estado.nombre === 'Agendada' ? (
                    <Button>
                      <Done fontSize="small" style={{color: 'green'}}/> 
                    </Button>
                  ) : (
                    <Button>
                      <Badge color="secondary" badgeContent={data.oferta.length}>
                        <CalendarToday fontSize="small"/>
                      </Badge>
                    </Button>
                  )
                }
              
            </Link>
              <IconButton aria-label="delete" onClick={deleteHora(data._id)}>
                <DeleteIcon fontSize="small" color="error"/>
              </IconButton>
              <Link to={`/profile/agenda/modificar/${data._id}`}>
                <IconButton aria-label="delete">
                  <Edit fontSize="small" color="primary"/>
                </IconButton>
              </Link>
          </ListItem>       
            )) 
            } 
        </List> 
        </Grid>
        
      </Grid>
    </React.Fragment>
    );

    return (
        <Layout
          title="Mi agenda"
          description="Estás creando tu agenda." 
          className="container col-md-8 offset-md-2"
        >
            {createOfferForm()}
        </Layout>
    );

};

export default DoReserve;