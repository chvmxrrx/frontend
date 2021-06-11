import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import {Link} from 'react-router-dom';
import { createRegion } from './apiAdmin';

const AddRegion = () => {
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState(false);
    const [succes, setSucces] = useState(false);

    //Desestructurar informacion desde el sesion storage
    const { accessToken, dataUser } = isAuthenticated();

    const handleChange = (e) => {
        setError('');
        setSucces(false);
        setNombre(e.target.value);
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSucces(false);
        console.log(dataUser.id, accessToken, {nombre});
        //Request to API 
        createRegion( dataUser.id, accessToken, {nombre}).then(data => {
            if(data.error) {
                setError(data.error);
            }else {
                setError('');
                setSucces(true);
            }
        });
    };

    const showSucces = () =>{
        if(succes) {
            return <h4 className="text-succes">{nombre} se ha creado con éxito.</h4>
        }
    };

    const showError = () =>{
        if(error) {
            return <h4 className="text-danger">La región ingresada ya existe.</h4>
        }
    };

    const goBack = () =>(
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Volver al dashboard</Link>
        </div>
    );     
    

    const newRegionForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Nombre</label>
                <input type="text" className="form-control" onChange={handleChange} value={nombre} autoFocus required/>
                <button className="btn btn-outline-primary">Crear region</button>
            </div>
        </form>
    )

    return (
        <Layout title="Crear region" description={ 'Agregar una region a la base de datos.'} >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSucces()}
                    {showError()}
                    {newRegionForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )

}

export default AddRegion;