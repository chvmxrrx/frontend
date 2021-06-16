import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import { getEstiloTatuaje } from '../admin/apiAdmin';
import { isAuthenticated } from '../auth';
import moment from 'moment';
import { deletePublicacion } from './apiCore';
import makeToast from '../Toaster/Toaster'; 

const CardPublicacionPage = ({ publicacion }) => {

    const [estilo, setEstilo] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [comentarios, setComentarios] = useState([]);

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
            makeToast("success","Publicacion eliminada correctamente.")
            return <Redirect to={`/myprofile/${dataUser.id}`} />
        }
        
    }

    useEffect(() => {
        console.log(publicacion);
        init()
        setComentarios(publicacion.comentarios)
        console.log(comentarios);
    }, []);

    return(
        <div>
            <div className="card">
            <div className="card-header">{publicacion.creador.userName}</div>
            <div className="card-body">
                <ShowImage image={publicacion} url="publicacion"/>
                <p className="lead mt-2">{publicacion.nombre}</p>
                <p className="lead mt-2">{publicacion.descripcion.substring(0, 100)}</p>
                
                <p className="black-9">
                    {`Estilo del tatuaje: ${estilo.nombre}`}
                </p>
                <p className="black-8">
                    {moment(publicacion.updatedAt).fromNow()}
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