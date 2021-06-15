import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './showImage';
import { getEstiloTatuaje } from '../admin/apiAdmin';
import { isAuthenticated } from '../auth';
import moment from 'moment';
import { deletePublicacion } from './apiCore';

const Card = ({ publicacion }) => {

    const [estilo, setEstilo] = useState('');

    const init = () => {
        getEstiloTatuaje(publicacion.estiloTatuaje._id).then(data =>{
            if(data.error){
                console.log(data.error);
            }else{
                setEstilo(data);
            }
        })
    }

    useEffect(() => {
        init()
    }, []);

    return(
        <div className="card">
            <div className="card-header">{publicacion.creador.userName}</div>
            <div className="card-body">
                <ShowImage image={publicacion} url="publicacion"/>
                <p className="lead mt-2">{publicacion.nombre}</p>
                <p className="lead mt-2">{publicacion.descripcion}</p>
                <p className="black-9">
                    {`Estilo del tatuaje: ${estilo.nombre}`}
                </p>
                <p className="black-8">
                    {moment(publicacion.updatedAt).fromNow()}
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