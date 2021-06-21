import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { getPublicacion } from './apiCore';
import { isAuthenticated } from '../auth';
import CardPublicacionPage from './CardPublicacion';
import makeToast from '../Toaster/Toaster';

const PublicacionPage = props => {

    const [publicacion, setPublicacion] = useState({});
    const {accessToken, dataUser} = isAuthenticated();

    const loadPublicacion = publicacionId => {
        getPublicacion(publicacionId, dataUser.id, accessToken).then(data => {
            if(data.error) {
                makeToast('error', data.error)
            }else{
                setPublicacion(data);
            }
        })
    }

    useEffect(() => {
        const publicacionId = props.match.params.publicacionId
        loadPublicacion(publicacionId)
    }, [])

    return (
        <Layout 
            title={`Publicación`} 
            description={""} 
            className="container-fluid"
        >
            <div className="row">
                {
                    publicacion &&
                    publicacion.descripcion &&
                    <CardPublicacionPage publicacion={publicacion}/>
                }
            </div>                       
        </Layout>
    );
}

export default PublicacionPage;