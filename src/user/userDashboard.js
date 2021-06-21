import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import {Link} from 'react-router-dom';

const Dashboard = () => {

    const {dataUser: { id, user, nombre, email}} = isAuthenticated();

    const userLinks = () => {
        return(
            <div className="card mb-5">
                <h3 className="card-header">User links</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${id}`} >Mi Perfil</Link>  
                        <Link className="nav-link" to={`/profile/edit/${id}`} >Editar perfil</Link> 
                        <Link className="nav-link" to={`/profile/publication/create/${id}`} >Crear publicación</Link>
                        <Link className="nav-link" to={`/profile/project/create/${id}`} >Crear proyecto</Link>
                        <Link className="nav-link" to={`/profile/myprojects/${id}`}>Mis Proyectos</Link>
                        <Link className="nav-link" to={`/profile/project/projects/list`}>Proyectos</Link>
                        <Link className="nav-link" to={`/profile/offers/myoffers/${id}`}>Mis ofertas</Link>
                        <Link className="nav-link" to={`/profile/do-reserve/${id}`}>Crear agenda de atención</Link>

                    </li>
                </ul>
            </div>
        );
    };

    const userInfo= () => {
        return (
            <div className="card">
                <h4 className="card-header">User information</h4>
                <ul className="list-group">
                    <li className="list-group-item">{user}</li>
                    <li className="list-group-item">{nombre}</li>
                    <li className="list-group-item">{email}</li>
                </ul>
            </div>
        );
    };

    return (
        <Layout title="Dashboard" description={ `${user} dashboard`} className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-3">
                    {userInfo()}
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;