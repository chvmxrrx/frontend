import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import {Link} from 'react-router-dom';
import { getEstado, updateEstado } from './apiAdmin';
import makeToast from '../Toaster/Toaster';

const UpdateEstado = ({ match }) => {

    const [values, setValues] = useState({
        nombre: "",
        error: "",
        succes: false
    })

    const { nombre, error, succes } = values;

    //Desestructurar informacion desde el sesion storage
    const { accessToken, dataUser } = isAuthenticated();

    const init = (estadoId) => {
        getEstado(estadoId, dataUser.id, accessToken).then(data=> {
            if(data.error){
                setValues({...values, error: true })
            } else {
                setValues({nombre: data.nombre})
            }
        })
    }

    useEffect(() =>{
        init(match.params.estadoId);
    }, []);

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value, error: false, succes: false})
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        updateEstado(match.params.estadoId, dataUser.id, accessToken, {nombre}).then(data => {
            if(data.error){
                showError(data.error)
            }else {
                setValues({...values, succes: true})
            }
        })
    };

    const showSucces = () =>{
        if(succes) {
            return makeToast("success", `${nombre} se ha actualizado con éxito.`)
        }
    };

    const showError = () =>{
        if(error) {
            return makeToast("error", "Se ha producido un error al modificar.")
        }
    };

    const goBack = () =>(
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Volver al dashboard</Link>
        </div>
    );     
    

    const UpdateEstadoForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Nombre</label>
                <input type="text" className="form-control" onChange={handleChange('nombre')} value={nombre} autoFocus required/>
                <button className="btn btn-outline-primary">Modificar region</button>
            </div>
        </form>
    )

    return (
        <Layout title="Modificar estado" description={ 'Modificar un estado de la base de datos.'} >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSucces()}
                    {showError()}
                    {UpdateEstadoForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )

}

export default UpdateEstado;