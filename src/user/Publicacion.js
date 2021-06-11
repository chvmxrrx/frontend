import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { authenticate, isAuthenticated } from './../auth/index';
import { Redirect } from 'react-router-dom';
import { createPublication } from './apiUser';
import { getEstilosTatuajes } from '../admin/apiAdmin';

const Publicacion = () => {

    const [values, setValues] = useState({
        nombre: "",
        descripcion: "",
        img: "",
        EstilosTatuaje: [],
        estiloTatuaje: "",
        etiquetado: "",
        loading: false,
        error: "",
        redirectToReferrer: false,
        succes: false,
        formData: ""
    });

    const { 
        nombre,
        descripcion,
        img,
        EstilosTatuaje,
        estiloTatuaje,
        etiquetado,
        loading, 
        error,
        redirectToReferrer,
        formData 
    } = values;

    const { dataUser, accessToken } = isAuthenticated();

    //Cargar estilos y setear formData
    const init = () => {
        getEstilosTatuajes(dataUser.id, accessToken).then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else {
                setValues({...values, EstilosTatuaje: data.data, formData: new FormData()}) 
            }
        })
    }

    useEffect(() => {
        init()
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
        console.log(formData);
        createPublication(dataUser.id, accessToken, formData)
        .then(data => {
            if(data.error) {
                 setValues({...values, error: data.error});
            }else{
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

    const createPublicationForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            
            <h5>Foto</h5>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input 
                        onChange={HandleChange('img')}
                        type="file" 
                        name="img" 
                        accept="image/*" 
                    />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Titulo</label>
                <input 
                    onChange={HandleChange('nombre')} 
                    type="text" 
                    className="form-control" 
                    value={nombre}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Descripción</label>
                <textarea 
                    onChange={HandleChange('descripcion')} 
                    type="text" 
                    className="form-control" 
                    value={descripcion}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">¿Que estilo es el tatuaje?</label>
                <select 
                    onChange={HandleChange('estiloTatuaje')}
                    className="form-control"
                    required
                >
                    <option >Seleccione un estilo de tatuaje...</option>
                    {EstilosTatuaje.map((data, i) => (
                            <option key={i} value={data._id}>{data.nombre}</option>
                        )) 
                    }
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Etiquetar a un usuario (opcional)</label>
                <input 
                    onChange={HandleChange('etiquetado')} 
                    type="text" 
                    className="form-control" 
                    value={etiquetado}
                />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">Subir publicación!</button>
        </form>
    );

    return (
        <Layout
            title="Registro"
            description="Formulario de registro de Inkapp, aplicacion para tatuadores."
            className="container col-md-8 offset-md-2"
        >
            {showError()}
            {createPublicationForm()}
            {redirectUser()}
        </Layout>
    );

};

export default Publicacion;