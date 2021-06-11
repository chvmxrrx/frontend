import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from './../auth/index';
import { Link } from 'react-router-dom';
import { getEstilosTatuajes, deleteEstiloTatuaje } from './apiAdmin'

const ManageEstilo = () => {

    const [estilos, setEstilos] = useState([]);

    const { dataUser, accessToken } = isAuthenticated();

    const loadEstilos = () => {
        getEstilosTatuajes(dataUser.id, accessToken).then(data => {
            if(data.error) {
                console.log(data.error);
            }else{
                setEstilos(data.data);
            }
        })
    }

    const destroyEstilo = idR => {
        deleteEstiloTatuaje(idR, dataUser.id, accessToken).then(data => {
            if(data.error){
                console.log(data.eror);
            }else{
                loadEstilos();
            }
        })
    }

    useEffect(() =>{
        loadEstilos();
    }, [])

    return (
        <Layout
            title="Administrar Estilos de tatuaje"
            description="CRUD de Estilos de tatuaje."
            className="container flui"
        >
        <div className="row">
            <div className="col-12">
                <ul className="list-group">
                   {estilos.map((data, i) => (
                       <li key={i} className="list-grop-item d-flex justify-content-between align-items-center">
                            <strong>{data.nombre}</strong>
                            <Link to={`/manage/region/update/${data._id}`}>
                                <span className="text-muted">modificar</span>
                            </Link>
                            <span onClick={() => destroyEstilo(data._id)} className="text-muted">Eliminar</span>
                       </li>
                   ))} 
                </ul>
            </div>
        </div>
        </Layout>
    );
}

export default ManageEstilo;