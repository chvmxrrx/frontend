import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import {Link} from 'react-router-dom';
import { getParte, updateParte } from './apiAdmin';
import makeToast from '../Toaster/Toaster';

const UpdateParte = ({ match }) => {

    const [values, setValues] = useState({
        nombre: "",
        succes: false
    })

    const { nombre, succes } = values;

    //Desestructurar informacion desde el sesion storage
    const { accessToken, dataUser } = isAuthenticated();

    const init = (parteId) => {
        getParte(parteId, dataUser.id, accessToken).then(data=> {
            if(data.error){
                makeToast('error', data.error)
            } else {
                setValues({nombre: data.nombre})
            }
        })
    }

    useEffect(() =>{
        init(match.params.parteId);
    }, []);

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        updateParte(match.params.parteId, dataUser.id, accessToken, {nombre}).then(data => {
            if(data.error){
                makeToast('error', data.error)
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


    const goBack = () =>(
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Volver al dashboard</Link>
        </div>
    );     
    

    const UpdateParteForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Nombre</label>
                <input type="text" className="form-control" onChange={handleChange('nombre')} value={nombre} autoFocus required/>
                <button className="btn btn-outline-primary">Modificar parte del cuerpo</button>
            </div>
        </form>
    )

    return (
        <Layout title="Modificar parte del cuerpo" description={ 'Modificar una parte del cuerpo de la base de datos.'} >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSucces()}
                    {UpdateParteForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )

}

export default UpdateParte;