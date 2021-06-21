import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from './../auth/index';
import { Link } from 'react-router-dom';
import { getPartes, deleteParte } from './apiAdmin'
import makeToast from '../Toaster/Toaster';

const ManageParte = () => {

    const [partes, setPartes] = useState([]);

    const { dataUser, accessToken } = isAuthenticated();

    const loadPartes = () => {
        getPartes().then(data => {
            if(data.error) {
                makeToast('error', data.error)
            }else{
                setPartes(data.data);
            }
        })
    }

    const destroyParte = idR => {
        deleteParte(idR, dataUser.id, accessToken).then(data => {
            if(data.error){
                makeToast('error', data.error)
            }else{
                makeToast("success", data.mensaje)
                loadPartes();
            }
        })
    }

    useEffect(() =>{
        loadPartes();
    }, [])

    return (
        <Layout
            title="Administrar partes del cuerpo"
            description="CRUD de partes del cuerpo."
            className="container flui"
        >
        <div className="row">
            <div className="col-12">
                <ul className="list-group">
                   {partes.map((data, i) => (
                       <li key={i} className="list-grop-item d-flex justify-content-between align-items-center">
                            <strong>{data.nombre}</strong>
                            <Link to={`/manage/parte/update/${data._id}`}>
                                <span className="text-muted">modificar</span>
                            </Link>
                            <span onClick={() => destroyParte(data._id)} className="text-muted" style={{cursor: "pointer"}}>Eliminar</span>
                       </li>
                   ))} 
                </ul>
            </div>
        </div>
        </Layout>
    );
}

export default ManageParte;