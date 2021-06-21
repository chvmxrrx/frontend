import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import { getPublicaciones } from './apiCore';
import { isAuthenticated } from '../auth';
import Card from './Card';
import { Favorite } from '@material-ui/icons';
import makeToast from '../Toaster/Toaster';
import { likePerfil } from '../user/apiUser';
const MyProfile = () => {

    const [publicaciones, setPublicaciones] = useState([]);
    const [error, setError] = useState(false);
    const { dataUser, accessToken } = isAuthenticated();

    const [likes, setLikes] = useState(dataUser.likes.length);

    const likeHandler = () =>{

        likePerfil(dataUser.id, accessToken, dataUser.id).then(data => {
            if(data.error){
                makeToast('error', data.error)
            } else if (data.mensaje === "like") {
                setLikes(likes +1)
            } else{
                setLikes(likes -1)
            }
        }) 
    }

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
            <p><Favorite onClick={likeHandler} color="secondary" />{likes}</p>
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
