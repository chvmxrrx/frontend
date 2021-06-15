import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { singup, authenticate } from './../auth/index';
import { getRegiones } from './../admin/apiAdmin';
import { Redirect } from 'react-router-dom';

const Singup = () => {

    const [values, setValues] = useState({
        userName: "",
        nombre: "",
        apellido: "",
        sexo: "",
        email: "",
        password: "",
        confirmPassword: "",
        tipo: "",
        img: "",
        edad: "",
        Regiones: [],
        region: "",
        loading: false,
        error: "",
        redirectToReferrer: false,
        succes: false,
        formData: ""
    });

    const { 
        userName, 
        nombre, 
        apellido, 
        sexo, 
        email, 
        password, 
        confirmPassword, 
        tipo, 
        edad,
        Regiones,
        region, 
        loading, 
        error,
        redirectToReferrer,
        formData 
    } = values;

    //Cargar regiones y setear formData
    const init = () => {
        getRegiones().then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else {
                setValues({...values, Regiones: data.data, formData: new FormData()}) 
            }
        })
    }

    useEffect(() => {
        init()
    }, []);

    const handleChange = name => event => {
        const value = 
            name === "img" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const clickSubmit = event => {
        event.preventDefault();
        if( password === confirmPassword ){
            setValues({...values, error: '', loading:true })
            console.log(formData);
            singup(formData)
            .then(data => {
                if(data.error) {
                    setValues({...values, error: data.error});
                }else{
                    authenticate (data, () => {
                        setValues({
                            ...values, 
                            redirectToReferrer: true
                        });
                    });
                }
            })
        }else{
            console.log("Contraseñas no coinciden");
        }
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const redirectUser = () =>{
        if(redirectToReferrer) {
            return <Redirect to="/user/dashboard" />
        }
    }

    const singupForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            
            <div className="form-group">
                <label className="text-muted">Username</label>
                <input
                    onChange={handleChange('userName')}
                    type="text"
                    className="form-control"
                    value={userName}
                    required
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Nombre</label>
                <input 
                    onChange={handleChange('nombre')} 
                    type="text" 
                    className="form-control" 
                    value={nombre}
                    required
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Apellido</label>
                <input 
                    onChange={handleChange('apellido')} 
                    type="text" 
                    className="form-control" 
                    value={apellido}
                    required
                />
            </div>
            
            <div className="form-group">
                <label className="text-muted">Sexo</label>
                <select 
                    onChange={handleChange("sexo")}
                    className="form-control"
                    required
                >
                    <option >Seleccione sexo...</option>
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                    onChange={handleChange('email')} 
                    type="email" 
                    className="form-control" 
                    value={email}
                    required
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Contraseña</label>
                <input 
                    onChange={handleChange('password')} 
                    type="password" 
                    className="form-control" 
                    value={password}
                    required
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Confirmar contraseña</label>
                <input 
                    onChange={handleChange('confirmPassword')} 
                    type="password" 
                    className="form-control" 
                    value={confirmPassword}
                    required
                />
            </div>

            <div className="form-group">
                <label className="text-muted">¿Que tipo de usuario quieres ser?</label>
                <select 
                    onChange={handleChange("tipo")}
                    className="form-control"
                    required
                >
                    <option >Seleccione un tipo de usuario...</option>
                    <option value="1">Soy tatuador</option>
                    <option value="2">Soy cliente</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Edad</label>
                <input 
                    onChange={handleChange('edad')} 
                    type="number" 
                    className="form-control" 
                    value={edad}
                    min="18"
                    max="100"
                    required
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Region</label>
                <select 
                    onChange={handleChange("region")}
                    className="form-control"
                    required
                >
                    <option >Seleccione una región...</option>
                    {Regiones.map((data, i) => (
                            <option key={i} value={data._id}>{data.nombre}</option>
                        )) 
                    }
                </select>

            </div>

            <h5>Foto de perfil</h5>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input 
                        onChange={handleChange('img')}
                        type="file" 
                        name="img" 
                        accept="image/*" 
                        required
                    />
                </label>
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">Registrarse!</button>
        </form>
    );

    return (
        <Layout
            title="Registro"
            description="Formulario de registro de Inkapp, aplicacion para tatuadores."
            className="container col-md-8 offset-md-2"
        >
            {showError()}
            {singupForm()}
            {redirectUser()}
        </Layout>
    );

};

export default Singup;


