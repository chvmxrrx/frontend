import React, { useState } from 'react';
import Layout from '../core/Layout';
import { Redirect } from 'react-router-dom';
import { singin, authenticate, isAuthenticated } from './../auth/index';
import { API } from '../config';
import makeToast from '../Toaster/Toaster';

const Singin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, error, loading, redirectToReferrer } = values;
    const { dataUser } = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false, loading: true});
        singin({ email, password }).then(data => {
            console.log(data);
            if(data.error) {
                makeToast('error' , data.error)
                setValues({...values, error: data.error, loading: false});
            }else {
                authenticate (data, () => {
                    setValues({
                        ...values, 
                        redirectToReferrer: true
                    });
                });
            }
        }

        )
    };

    const showEror = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>  
    );

    const showLoading = () => 
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () =>{
        if(redirectToReferrer) {
            if(dataUser && dataUser.tipo === 0){
                return <Redirect to="/admin/dashboard" />
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()) {
            return <Redirect to={`${API}/`} />
        }
    }

    const singinForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                    onChange={handleChange('email')} 
                    type="text" 
                    className="form-control" 
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Contraseña</label>
                <input 
                    onChange={handleChange('password')} 
                    type="password" 
                    className="form-control" 
                    value={password}
                />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">Iniciar sesion!</button>
        </form>
    );

    return(
        <Layout title="Iniciar sesion" description="Iniciar sesion en Inkapp, aplicacion para tatuadores." className="container">
            {showLoading()}
            {showEror()}
            {singinForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Singin;
