import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import {Link} from 'react-router-dom';
import { getRegion, updateRegion } from './apiAdmin';

const UpdateRegion = ({match}) => {

    const [values, setValues] = useState({
        nombre: "",
        error: "",
        succes: false
    })

    const { nombre, error, succes } = values;

    //Desestructurar informacion desde el sesion storage
    const { accessToken, dataUser } = isAuthenticated();

    const init = _id => {
        getRegion(_id, dataUser.id, accessToken).then(() => data=> {
            if(data.error){
                setValues({...values, error: true })
            } else {
                setValues({...values, nombre: data.nombre })
            }
        })
    }

    useEffect(() =>{
        init(match.params.regionId);
    }, []);

    const handleChange = (e) => {
        //
    }

    const clickSubmit = (e) => {
        //
    };

    const showSucces = () =>{
        if(succes) {
            return <h4 className="text-succes">{nombre} se ha actualizado con éxito.</h4>
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
    

    const UpdateRegionForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Nombre</label>
                <input type="text" className="form-control" onChange={handleChange} value={nombre} autoFocus required/>
                <button className="btn btn-outline-primary">Modificar region</button>
            </div>
        </form>
    )

    return (
        <Layout title="Modificar region" description={ 'Modificar una region de la base de datos.'} >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSucces()}
                    {showError()}
                    {UpdateRegionForm()}
                    {goBack()}
                    {JSON.stringify(values)}
                </div>
            </div>
        </Layout>
    )

}

export default UpdateRegion;