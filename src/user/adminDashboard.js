import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import {Link} from 'react-router-dom';

const AdminDashboard = () => {

    const {dataUser: { user, nombre, email}} = isAuthenticated();

    const AdminLinks = () => {
        return(
            <div className="card mb-5">
                <h3 className="card-header">User links</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/profile/update">Editar perfil</Link>

                        <Link className="nav-link" to="/create/region">Crear region</Link>
                        <Link className="nav-link" to="/manage/region">Administrar regiones</Link>

                        <Link className="nav-link" to="/create/estado">Crear estado</Link>
                        <Link className="nav-link" to="/manage/estado">Administrar Estados</Link>

                        <Link className="nav-link" to="/create/estiloTatuaje">Crear estilo de tatuaje</Link>
                        <Link className="nav-link" to="/manage/estiloTatuaje">Administrar estilos de tatuaje</Link>
                    </li>
                </ul>
            </div>
        );
    };

    const AdminInfo= () => {
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
        <Layout title="Admin Dashboard" description={ `${user} dashboard`} className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {AdminLinks()}
                </div>
                <div className="col-3">
                    {AdminInfo()}
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard;