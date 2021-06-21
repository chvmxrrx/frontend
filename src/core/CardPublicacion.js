import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import { getEstiloTatuaje } from '../admin/apiAdmin';
import { isAuthenticated } from '../auth';
import moment from 'moment';
import { deletePublicacion } from './apiCore';
import makeToast from '../Toaster/Toaster'; 
import { likePublicacion } from '../user/apiUser';
import { Favorite } from '@material-ui/icons';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const CardPublicacionPage = ({ publicacion }) => {
const { accessToken, dataUser } = isAuthenticated();
    const [redirect, setRedirect] = useState(false);
    const [comentarios, setComentarios] = useState([]);
    
    const [likes, setLikes] = useState(publicacion.likes.length);
    const likeHandler = () =>{

        likePublicacion(dataUser.id, accessToken, publicacion._id).then(data => {
            if(data.error){
                makeToast('error', data.error)
            } else if (data.mensaje === "like") {
                setLikes(likes +1)
            } else{
                setLikes(likes -1)
            }
        }) 
    }

    const eliminarPublicacion = (idP) => {
        deletePublicacion(idP, dataUser.id, accessToken).then(data =>{
            if(data.error){
                console.log(data.error);
            }else{
                setRedirect(true);
            }
    })}

    const redirectTo = () => {
        if(redirect){
            makeToast("success","Publicacion eliminada correctamente.")
            return <Redirect to={`/myprofile/${dataUser.id}`} />
        }
        
    }

    useEffect(() => {
        setComentarios(publicacion.comentarios)
        
    }, []);

    return(
        <div>
            <div className="card">
            <div className="card-header">
                <Link to={`/`}>
                    <button className="btn btn-outline-primary mt-2 mb-2">
                        {publicacion.creador.userName}
                    </button>
                </Link>
            </div>
            <div className="card-body">
                <ShowImage image={publicacion} url="publicacion"/>
                <p className="lead mt-2">{publicacion.nombre} <Favorite onClick={likeHandler} color="secondary"/>{likes}</p>
                <p className="lead mt-2">{publicacion.descripcion.substring(0, 100)}</p>
                <p className="black-9">
                    Estilo del tatuaje: {publicacion.estiloTatuaje.nombre}
                </p>
                
                <p className="black-8">
                   <AccessTimeIcon color="action" fontSize="small"/> {moment(publicacion.updatedAt).fromNow()}
                </p>
                {isAuthenticated() && isAuthenticated().dataUser.id === publicacion.creador._id ? (
                    <button className="btn btn-outline-warning mt-2 mb-2" onClick={() => eliminarPublicacion(publicacion._id)}>
                        Eliminar publicacion
                    </button>
                ) : ( <div></div> )  
                }
                
            </div>
            <div>

            </div>
        </div>
            {redirectTo()}
        </div>
        
        
    );
};

export default CardPublicacionPage;