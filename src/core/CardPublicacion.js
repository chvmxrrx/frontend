import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './showImage';
import { getEstiloTatuaje } from '../admin/apiAdmin';
import { isAuthenticated } from '../auth';
import moment from 'moment';
import { deletePublicacion } from './apiCore';

const CardPublicacionPage = ({ publicacion }) => {

    const [estilo, setEstilo] = useState('');
    const [redirect, setRedirect] = useState(false);

    const { accessToken, dataUser } = isAuthenticated();

    const init = () => {
        getEstiloTatuaje(publicacion.estiloTatuaje, dataUser.id, accessToken).then(data =>{
            if(data.error){
                console.log(data.error);
            }else{
                setEstilo(data);
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
            return <Redirect to="/" />
        }
        
    }

    useEffect(() => {
        init()
    }, []);

    return(
        <div className="card">
            <div className="card-header">{publicacion.nombre}</div>
            <div className="card-body">
                <ShowImage image={publicacion} url="publicacion"/>
                <p className="lead mt-2">{publicacion.descripcion.substring(0, 100)}</p>
                <p className="black-9">
                    {`Estilo del tatuaje: ${estilo.nombre}`}
                </p>
                <p className="black-8">
                    {moment(publicacion.updatedAt).fromNow()}
                </p>

                <button className="btn btn-outline-warning mt-2 mb-2" onClick={() => eliminarPublicacion(publicacion._id)}>
                    Eliminar publicacion
                </button>
            </div>
            {redirectTo()}
        </div>
        
    );
};

export default CardPublicacionPage;