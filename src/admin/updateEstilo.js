import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import {Link} from 'react-router-dom';
import { getEstiloTatuaje, updateEstiloTatuaje } from './apiAdmin';
import makeToast from '../Toaster/Toaster';

const UpdateEstilo = ({ match }) => {

    const [values, setValues] = useState({
        nombre: "",
        error: "",
        succes: false
    })

    const { nombre, error, succes } = values;

    //Desestructurar informacion desde el sesion storage
    const { accessToken, dataUser } = isAuthenticated();

    const init = (estiloId) => {
        getEstiloTatuaje(estiloId, dataUser.id, accessToken).then(data=> {
            if(data.error){
                setValues({...values, error: true })
            } else {
                setValues({nombre: data.nombre})
            }
        })
    }

    useEffect(() =>{
        init(match.params.estiloId);
    }, []);

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value, error: false, succes: false})
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        updateEstiloTatuaje(match.params.estiloId, dataUser.id, accessToken, {nombre}).then(data => {
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
    

    const UpdateEstiloForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Nombre</label>
                <input type="text" className="form-control" onChange={handleChange('nombre')} value={nombre} autoFocus required/>
                <button className="btn btn-outline-primary">Modificar estilo de tatuaje</button>
            </div>
        </form>
    )

    return (
        <Layout title="Modificar estilo de tatuaje" description={ 'Modificar un estilo de tatuajes de la base de datos.'} >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSucces()}
                    {showError()}
                    {UpdateEstiloForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )

}

export default UpdateEstilo;