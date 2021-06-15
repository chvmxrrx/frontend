import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from './../auth/index';
import { Link } from 'react-router-dom';
import { getEstados, deleteEstado } from './apiAdmin'
import makeToast from '../Toaster/Toaster';

const ManageEstado = () => {

    const [estados, setEstados] = useState([]);

    const { dataUser, accessToken } = isAuthenticated();

    const loadEstados = () => {
        getEstados(dataUser.id, accessToken).then(data => {
            if(data.error) {
                console.log(data.error);
            }else{
                makeToast("success", "El estado se ha borrado con éxito")
                setEstados(data.data);
            }
        })
    }

    const destroyEstado = idE => {
        deleteEstado(idE, dataUser.id, accessToken).then(data => {
            if(data.error){
                console.log(data.eror);
            }else{
                loadEstados();
            }
        })
    }

    useEffect(() =>{
        loadEstados();
    }, [])

    return (
        <Layout
            title="Administrar Estados"
            description="CRUD de estados."
            className="container fluid"
        >
        <div className="row">
            <div className="col-12">
                <ul className="list-group">
                   {estados.map((data, i) => (
                       <li key={i} className="list-grop-item d-flex justify-content-between align-items-center">
                            <strong>{data.nombre}</strong>
                            <Link to={`/manage/estado/update/${data._id}`}>
                                <span className="text-muted">Modificar</span>
                            </Link>
                            <span onClick={() => destroyEstado(data._id)} className="text-muted" style={{cursor: "pointer"}}>Eliminar</span>
                       </li>
                   ))} 
                </ul>
            </div>
        </div>
        </Layout>
    );
}

export default ManageEstado;