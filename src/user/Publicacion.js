import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { authenticate, isAuthenticated } from './../auth/index';
import { Redirect } from 'react-router-dom';
import { createPublication, search } from './apiUser';
import { getEstilosTatuajes } from '../admin/apiAdmin';
import makeToast from '../Toaster/Toaster';

const Publicacion = () => {

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
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

    const handleChangeSearch = name => event => {
        const value = event.target.value;
        setUser(value);
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error: '', loading:true })
        createPublication(dataUser.id, accessToken, formData)
        .then(data => {
            if(data.error) {
                 makeToast("error", data.error);
            }else{
                makeToast("success", "La publicación se ha creado correctamente.")
                setValues({
                    ...values, 
                    redirectToReferrer: true
                });
            }
        })
    }

    const redirectUser = () =>{
        if(redirectToReferrer) {
            return <Redirect to={`/profile/${dataUser.id}`} />
        }
    }

    const labusqueda = () => {
        search(user).then(data =>{
            
            if(data.error){
                makeToast("error",data.error)
            }else{
                setUsers(data.users)
            }
        })
    }

    const searchUsers = event =>{
        event.preventDefault();
        labusqueda();
    }

    const rellenarCampo = (userId) =>{
        setValues({...values, etiquetado: userId})
    }

    const createPublicationForm = () => (
        <form className="mb-3" >
            
            <h5>Foto (*)</h5>
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
                <label className="text-muted">Titulo (*)</label>
                <input 
                    onChange={HandleChange('nombre')} 
                    type="text" 
                    className="form-control" 
                    value={nombre}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Descripción (*)</label>
                <textarea 
                    onChange={HandleChange('descripcion')} 
                    type="text" 
                    className="form-control" 
                    value={descripcion}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">¿Que estilo es el tatuaje/diseño? (*)</label>
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
                    onChange={handleChangeSearch('busqueda')} 
                    type="text" 
                    className="form-control" 
                    value={user}
                />
                <br/>

                {users && users.map((data, i) => ( 
                    <button key={i} value={data._id} onClick={(event) => {
                        event.preventDefault()
                        setUser(data.userName)
                        setValues({...values, etiquetado: data._id, busqueda: user})
                        console.log(values);
                    }}>
                        {data.userName}
                </button>
                ))}

                <button onClick={searchUsers} className="btn btn-secondary">Buscar usuario</button>
                
            </div>
            <br/>
            <div align="center">
                <button onClick={clickSubmit} className="btn btn-primary">Subir publicación!</button>
            </div>
            
        </form>
    );

    return (
        <Layout
            title="Publicación"
            description="Crear una nueva publicación."
            className="container col-md-8 offset-md-2"
        >
            {createPublicationForm()}
            {redirectUser()} 
        </Layout>
    );

};

export default Publicacion;