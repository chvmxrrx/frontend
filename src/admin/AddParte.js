import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import {Link} from 'react-router-dom';
import { createParte } from './apiAdmin';
import makeToast from '../Toaster/Toaster';

const AddParte = () => {
    const [nombre, setNombre] = useState('');


    //Desestructurar informacion desde el sesion storage
    const { accessToken, dataUser } = isAuthenticated();

    const handleChange = (e) => {
        
        setNombre(e.target.value);
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        //Request to API 
        createParte( dataUser.id, accessToken, {nombre}).then(data => {
            if(data.error) {
                makeToast('error', data.error)
            }else {
                makeToast('success', `Se ha creado: ${data.data.nombre} con éxito!`)
            }
        });
    };

    const goBack = () =>(
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Volver al dashboard</Link>
        </div>
    );     
    

    const newParteCuerpoForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Nombre</label>
                <input type="text" className="form-control" onChange={handleChange} value={nombre} autoFocus required/>
                <button className="btn btn-outline-primary">Crear parte del cuerpo</button>
            </div>
        </form>
    )

    return (
        <Layout title="Crear parte del cuerpo" description={ 'Agregar una parte del cuerpo a la base de datos.'} >
            <div className="row">
                <div className="col-md-8 offset-md-2">
            
                    {newParteCuerpoForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )

}

export default AddParte;