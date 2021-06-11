import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import {Link, Redirect} from 'react-router-dom';
import { read, update, updateUser} from '../user/apiUser';

const Profile = ({match}) => {
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
        regiones: [],
        region: "",
        loading: false,
        error: false,
        redirectToReferrer: false,
        succes: false,
        formData: ""
    })

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
        regiones, 
        region, 
        loading, 
        error,
        redirectToReferrer,
        formData 
    } = values;

    const { accessToken, dataUser } = isAuthenticated()

    const init = (userId) =>{
        read(userId, accessToken ).then(data => {
            if(data.error) {
                setValues({...values, error: true, })
            } else{
                setValues({
                    ...values,
                    userName: data.user.userName,
                    nombre: data.user.nombre,
                    apellido: data.user.apellido,
                    sexo: data.user.sexo,
                    email: data.user.email,
                    tipo: data.user.tipo,
                    edad: data.user.edad,
                    region: data.user.region,
                    img: data.user.img
                })
            }
        })
    }

    useEffect (() => {
        init(match.params.userId)
    }, []); 

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    }

    const clickSubmit = e => {
        e.preventDefault()
        if(password === confirmPassword){
            update(match.params.userId, accessToken, { userName, nombre, apellido, sexo, email, password, tipo, edad, region } )
            .then( data => {
                if(data.error) {
                    console.log(data.error);
                } else{
                    updateUser(data, () => {
                        setValues({
                            ...values,
                            userName: data.userName,
                            nombre: data.nombre,
                            apellido: data.apellido,
                            sexo: data.sexo,
                            email: data.email,
                            tipo: data.tipo,
                            edad: data.edad,
                            region: data.region,
                            succes: true
                        })
                        console.log(values);
                    })
                }
            })
        }else{
            console.log("las constraseñas no coinciden");
        }
        
    }

    const redirectUser = (succes) => {
        if(succes) {
            return <Redirect to="/" />
        }
    }

    const profileUpdate = () => (
        <form>
            <div className="from-group">
                <label className="text-muted">Username</label>
                <input type="text" onChange={handleChange('userName')} className="form-control" value={userName}/>
            </div>
            <div className="from-group">
                <label className="text-muted">Nombre</label>
                <input type="text" onChange={handleChange('nombre')} className="form-control" value={nombre}/>
            </div>
            <div className="from-group">
                <label className="text-muted">Apellido</label>
                <input type="text" onChange={handleChange('apellido')} className="form-control" value={apellido}/>
            </div>
            <div className="from-group">
                <label className="text-muted">Sexo</label>
                <input type="text" onChange={handleChange('sexo')} className="form-control" value={sexo}/>
            </div>
            <div className="from-group">
                <label className="text-muted">Email</label>
                <input type="text" onChange={handleChange('email')} className="form-control" value={email}/>
            </div>
            
            <div className="form-group">
                <label className="text-muted">Contraseña</label>
                <input 
                    onChange={handleChange('password')} 
                    type="text" 
                    className="form-control" 
                    value={password}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Confirmar contraseña</label>
                <input 
                    onChange={handleChange('confirmPassword')} 
                    type="text" 
                    className="form-control" 
                    value={confirmPassword}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">¿Que tipo de usuario quieres ser?</label>
                <select 
                    onChange={handleChange("tipo")}
                    className="form-control"
                >
                    <option >Seleccione un tipo de usuario...</option>
                    <option value="1">Soy tatuador</option>
                    <option value="2">Soy cliente</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Edad</label>
                <input 
                    onChange={handleChange("edad")} 
                    type="number" 
                    className="form-control" 
                    value={edad}
                    min="18"
                    max="100"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Region</label>
                <select 
                    onChange={handleChange("tipo")}
                    className="form-control"
                >
                    <option >Seleccione una region...</option>
                    <option value="60b9637b9a6cf337c86f8ff1">Region Metropolitana</option>
                    <option value="60b9637b9a6cf337c86f8ff1">Metropolitana</option>
                </select>
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">Actualizar</button>
        </form>
    )

    return(
        <Layout title="Perfil" description="Actualiza tu perfil">
            {profileUpdate()}
        </Layout>
    )
}

export default Profile;