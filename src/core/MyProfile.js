import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import { getPublicaciones } from './apiCore';
import { isAuthenticated } from '../auth';
import Card from './Card';

const MyProfile = () => {

    const [publicaciones, setPublicaciones] = useState([]);
    const [error, setError] = useState(false);
    const { dataUser, accessToken } = isAuthenticated();

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
            <Link to={`/profile/publication/create/${dataUser.id}`}>
                <p>Crear mi primera publicacion ahora.</p>
            </Link>
        </div>
    )

    const loadPublicaciones = () => {
        getPublicaciones(dataUser.id, accessToken).then(data => {
            if(data.error){
                setError(data.error);                
            } else {
                setPublicaciones(data.data);
            }
        })
    }

    useEffect(() => {
        loadPublicaciones();
    }, []);

    return (
        <Layout title="Home Page" description="Aplicacion Inkapp para tatuadores." className="container-fluid">
            <h2 className="mb-4">Mis Publicaciones</h2>
            <div className="row">
                { publicaciones.map((publicacion, i) => (
                    <div className="col-4 mb-3">
                        <Card key={i} publicacion={publicacion} showVerPublicacionButton={true} showDeletePublicacionButton={false}/>
                    </div>
                ))}
                {showError()}
            </div>
                        
        </Layout>
    );
};

export default MyProfile;
