import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from './../auth/index';
import { Link } from 'react-router-dom';
import { getRegiones, deleteRegion } from './apiAdmin'
import makeToast from '../Toaster/Toaster';

const ManageRegion = () => {

    const [regiones, setRegiones] = useState([]);

    const { dataUser, accessToken } = isAuthenticated();

    const loadRegiones = () => {
        getRegiones().then(data => {
            if(data.error) {
                console.log(data.error);
            }else{
                setRegiones(data.data);
            }
        })
    }

    const destroyRegion = idR => {
        deleteRegion(idR, dataUser.id, accessToken).then(data => {
            if(data.error){
                console.log(data.eror);
            }else{
                makeToast("success", "La region se ha borrado con éxito")
                loadRegiones();
            }
        })
    }

    useEffect(() =>{
        loadRegiones();
    }, [])

    return (
        <Layout
            title="Administrar regiones"
            description="CRUD de regiones."
            className="container flui"
        >
        <div className="row">
            <div className="col-12">
                <ul className="list-group">
                   {regiones.map((data, i) => (
                       <li key={i} className="list-grop-item d-flex justify-content-between align-items-center">
                            <strong>{data.nombre}</strong>
                            <Link to={`/manage/region/update/${data._id}`}>
                                <span className="text-muted">modificar</span>
                            </Link>
                            <span onClick={() => destroyRegion(data._id)} className="text-muted" style={{cursor: "pointer"}}>Eliminar</span>
                       </li>
                   ))} 
                </ul>
            </div>
        </div>
        </Layout>
    );
}

export default ManageRegion;