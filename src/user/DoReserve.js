import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {  isAuthenticated } from '../auth/index';
import { Redirect } from 'react-router-dom';
import { createOffer } from './apiUser';
import makeToast from '../Toaster/Toaster';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const DoReserve = (props) => {
    const [selectedDate, handleDateChange] = useState(new Date());
    const [values, setValues] = useState({
        descripcion: "",
        valor: "",
        loading: false,
        error: "",
        redirectToReferrer: false,
        succes: false,
        formData: ""
    });
    
    const { 
        descripcion,
        valor,
        loading, 
        error,
        redirectToReferrer,
        formData 
    } = values;

    const { dataUser, accessToken } = isAuthenticated();
    const [id,setId] = useState('')
    

    useEffect(() => {
        setValues({...values, formData: new FormData()})
        setId(props.match.params.projectId)
    }, []);
    
    const HandleChange = name => event => {
        const value = 
            name === "img" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }


    const clickSubmit = event => {

        event.preventDefault();
        setValues({...values, error: '', loading:true })
        createOffer(dataUser.id, accessToken, id ,{valor}, {descripcion})
        .then(data => {
            if(data.error) {
                 makeToast('error', data.error)
                 setValues({...values, error: data.error});
            }else{
                makeToast('success', data.mensaje)
                setValues({
                    ...values, 
                    redirectToReferrer: true
                });
            }
        })
    }

    const redirectUser = () =>{
        if(redirectToReferrer) {
            return <Redirect to="/user/dashboard" />
        }
    }

    const showError = () =>{
        if(error) {
            return <h4 className="text-danger">{error}</h4>
        }
    };

    const createOfferForm = () => (
        <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Agenda
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField id="state" name="state" label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField id="state" name="state" label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
        // <form className="mb-3" onSubmit={clickSubmit}>

        //     <div className="form-group">
        //             <label className="text-muted">Describe tu oferta</label>
        //             <textarea 
        //                 placeholder="Ej. me gusto mucho tu idea, me manejo con ese estilo de tatuajes ;)"
        //                 onChange={HandleChange('descripcion')} 
        //                 type="text" 
        //                 className="form-control" 
        //                 value={descripcion}
        //             />
        //     </div>
        //     <div className="form-group">
        //         <label className="text-muted">Valor de tu oferta</label>
        //         <input 
        //             placeholder="Ej. 200000"
        //             onChange={HandleChange('valor')} 
        //             type="text" 
        //             className="form-control" 
        //             value={valor}
        //         />
        //     </div>
            
            
        //     <div className="form-group">
        //         <label className="text-muted">Tu Oferta estará en espera</label>
        //     </div>
            

        //     <button onClick={clickSubmit} className="btn btn-primary">Publicar oferta</button>
        // </form>
    );

    return (
        <Layout
            title="Ingreso de oferta"
            description="Publica tu oferta!"
            className="container col-md-8 offset-md-2"
        >
            {showError()}
            {createOfferForm()}
            {redirectUser()}
            
        </Layout>
    );

};

export default DoReserve;