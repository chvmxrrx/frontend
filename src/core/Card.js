import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import ShowImage from './showImage';
import moment from 'moment';
import { likePublicacion } from '../user/apiUser';
import { isAuthenticated } from '../auth';
import makeToast from '../Toaster/Toaster';
import { Favorite } from '@material-ui/icons';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Button } from '@material-ui/core';
const Card = ({ publicacion }) => {

    const {dataUser, accessToken} = isAuthenticated()
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
    return(
        <div className="card">
            <div className="card-header">
            {
                (!dataUser && !accessToken) ? (
                    <div>{publicacion.creador.userName}</div>
                ) : (
                    <p>
                        <Link to={`/profile/${publicacion.creador._id}`}>
                            <Button color="primary" size="medium">
                                {publicacion.creador.userName}
                            </Button>   
                        </Link>
                    </p>

                )
            }
            </div>
            <div className="card-body">
                <ShowImage image={publicacion} url="publicacion"/>
                <p className="lead mt-2">{publicacion.nombre} 
                    {
                        (!dataUser && !accessToken) ? (
                            <div></div>
                            ) 
                            : (
                                <p>
                                    <Favorite onClick={likeHandler} color="secondary"/> {likes}
                                </p>
                            )
                            
                    }   
                </p>
                <p className="lead mt-2">{publicacion.descripcion}</p>
                <p className="black-9">
                    Estilo del tatuaje: {publicacion.estiloTatuaje.nombre}
                </p>
                <p className="black-8">
                    <AccessTimeIcon color="action" fontSize="small"/> {moment(publicacion.updatedAt).fromNow()}
                </p>
                    <Link to={`/profile/publication/view/${publicacion._id}`} className="mr-2">
                        <button className="btn btn-outline-primary mt-2 mb-2">
                            Ver publicacion
                        </button>
                    </Link>
            </div>
        </div>
    );
};

export default Card;