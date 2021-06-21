import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {  isAuthenticated } from './../auth/index';
import { Redirect } from 'react-router-dom';
import {  updateProject , readProject} from './apiUser';
import { getEstilosTatuajes, getPartes } from '../admin/apiAdmin';
import makeToast from '../Toaster/Toaster';

const UpdateProject = ({match}) => {
    const [PartesCuerpo, setPartesCuerpo ] = useState([])
    const [values, setValues] = useState({
        nombre: "",
        descripcion: "",
        tamaño: "",
        img: "",
        parteCuerpo: "",
        EstilosTatuaje: [],
        estiloTatuaje: "",
        loading: false,
        error: "",
        redirectToReferrer: false,
        succes: false,
        formData: ""
    });

    const { 
        nombre,
        descripcion,
        tamaño,
        img,
        parteCuerpo,
        EstilosTatuaje,
        estiloTatuaje,
        loading, 
        error,
        redirectToReferrer,
        formData 
    } = values;

    const { dataUser, accessToken } = isAuthenticated();

    const init = (projectId) => {
        readProject(dataUser.id, accessToken, projectId).then(data => {
            if(data.error){
                makeToast('error', data.error)
            } else {
                setValues({
                    ...values, 
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    tamaño: data.tamaño,
                    formData: new FormData()     
                }
                )
                initEstilos()
                initPartesCuerpo()
            }
        })
    }
    const initEstilos = () => {
        getEstilosTatuajes(dataUser.id, accessToken).then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else {
                setValues({ EstilosTatuaje: data.data, formData: new FormData()}) 
            }
        })
    }
    const initPartesCuerpo = () => {
        getPartes(dataUser.id, accessToken).then(data => {
            if(data.error){
                makeToast('error', data.error)
                setValues({...values, error: data.error})
            }else {
                setPartesCuerpo(data.data) 
            }
        })
    }

    useEffect(() => {

      init(match.params.projectId)
    }, []);

    const HandleChange = name => event => {
        const value = 
            name === "img" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values , error: '', loading:true })
        updateProject(dataUser.id, accessToken, match.params.projectId,formData)
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
            if(!error){
                return <Redirect to={`/profile/myprojects/${dataUser.id}`} />
            }
        }
    }

    const createProjectForm = () => (
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
                    placeholder="Describe lo que deseas para tu proyecto!"
                    onChange={HandleChange('descripcion')} 
                    type="text" 
                    className="form-control" 
                    value={descripcion}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">¿Que tamaño deseas para tu tatuaje?</label>
                <input 
                    placeholder="Ej. 10 x 10"
                    onChange={HandleChange('tamaño')} 
                    type="text" 
                    className="form-control" 
                    value={tamaño}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">¿Que estilo de tatuaje deseas para tu proyecto?</label>
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
                <label className="text-muted">¿Que parte del cuerpo deseas para tu tatuaje?</label>
                <select 
                    onChange={HandleChange('parteCuerpo')}
                    className="form-control"
                    required
                >
                    <option >Seleccione un estilo de tatuaje...</option>
                    {PartesCuerpo.map((data, i) => (
                            <option key={i} value={data._id}>{data.nombre}</option>
                        )) 
                    }
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Tu proyecto estará en espera</label>
            </div>
            

            <button onClick={clickSubmit} className="btn btn-primary">modificar proyecto</button>
        </form>
    );

    return (
        <Layout
            title="Registro"
            description="Formulario de registro de Inkapp, aplicacion para tatuadores."
            className="container col-md-8 offset-md-2"
        >
            
            {createProjectForm()}
            {redirectUser()}
            
        </Layout>
    );

};

export default UpdateProject;