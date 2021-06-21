import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import ShowImage from './showImage';
import { isAuthenticated } from '../auth';
import moment from 'moment';
import makeToast from '../Toaster/Toaster'; 
import { likePublicacion } from '../user/apiUser';
import { Favorite } from '@material-ui/icons';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { deletePublicacion, addComentario, getPublicacion, addRespuesta, deleteComentario, deleteRespuesta } from './apiCore';
import { InputGroup, FormControl, ListGroup, Accordion } from 'react-bootstrap';
import { Button } from '@material-ui/core';

const CardPublicacionPage = ({ publicacion }) => {

    const { accessToken, dataUser } = isAuthenticated();
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(false);
    const [succes, setSucces] = useState(false);
    const [comentario, setComentario] = useState('');
    const [respuesta, setRespuesta] = useState('');
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

    const eliminarComentario = (idPublicacion, idCreador, idComentario) => {
        deleteComentario(idPublicacion, dataUser.id, accessToken, {idUser:idCreador, idComentario:idComentario}).then(data =>{
            if(data.error){
                console.log(data.error);
            }else{
                makeToast("success", "El comentario se ha eliminado correctamente")
                loadComentarios();
            }
    })}

    const eliminarRespuesta = (idPublicacion, idCreador, idComentario, idRespuesta) => {
        deleteRespuesta(idPublicacion, dataUser.id, accessToken, {idUser:idCreador, idComentario:idComentario, idRespuesta:idRespuesta}).then(data =>{
            if(data.error){
                console.log(data.error);
            }else{
                makeToast("success", "La respuesta se ha eliminado correctamente")
                loadComentarios();
            }
    })}

    const redirectTo = () => {
        if(redirect){
            makeToast("success","Publicacion eliminada correctamente.")
            return <Redirect to={`/profile/${dataUser.id}`} />
        }
        
    }

    const handleChange = (e) => {
        setError('');
        setSucces(false);
        setComentario(e.target.value);
    }

    const handleChange2 = (e) => {
        setError('');
        setSucces(false);
        setRespuesta(e.target.value);
    }

    const clickSubmit = () => {
        setError('');
        setSucces(false);
        //Request to API 
        addComentario(publicacion._id, dataUser.id, accessToken, {comentario}).then(data => {
            if(data.error) {
                setError(data.error);
            }else {
                setError('');
                setSucces(true);
                loadComentarios();            }
        });
    };

    const clickSubmit2 = (idC) => {
        setError('');
        setSucces(false);
        //Request to API 
        addRespuesta(publicacion._id, dataUser.id, accessToken, {id: idC, respuesta: respuesta}).then(data => {
            if(data.error) {
                setError(data.error);
            }else {
                setError('');
                setSucces(true);
                loadComentarios();            
            }
        });
    };


    const showSucces = () =>{
        if(succes) {
            return makeToast("success", "El comentario se ha agregado correctamente")
        }
    };

    const showError = () =>{
        if(error) {
            return makeToast("error", "No se ha podido agregar el comentario")
        }
    };

    const loadComentarios = () => {
        getPublicacion(publicacion._id, dataUser.id, accessToken).then(data => {
            if(data.error){
                setError(data.error);                
            } else {
                setComentarios(data.comentarios)
            }
        })
    };

    useEffect(() => {
        setComentarios(publicacion.comentarios)
        loadComentarios();
    }, []);

    return(
        <div>
            <div className="card">
            <div className="card-header">
                <Link to={`/`}>
                    <Button color="primary" size="medium">
                        {publicacion.creador.userName}
                    </Button>    
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

            <div className="card-footer">
                <h4>Comentarios</h4>
                <InputGroup className="mb-3">    
                    <FormControl
                            placeholder="Inserte un comentario"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={comentario}
                            onChange={handleChange}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-primary" onClick={clickSubmit}>Comentar</Button>
                        </InputGroup.Append>
                    </InputGroup>
                                
            </div>

            { 
                comentarios.map((comentario) => (
                    
                    <div className="card-footer">
                        <div className="row">
                            <h4>{comentario.usuario.userName}</h4>
                        </div>
                        <p>{comentario.comentario}</p>
                            <Accordion>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Responder
                                </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <div>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="Inserte un comentario"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            value={respuesta}
                                            onChange={handleChange2}
                                        />
                                        <InputGroup.Append>
                                            <Button variant="outline-primary" onClick={() => (clickSubmit2(comentario._id))}>Comentar</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>
                            </Accordion.Collapse>
                            {
                                comentario && ((comentario.usuario._id === dataUser.id) || (publicacion.creador._id === dataUser.id)) && 
                                    <div>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                            Eliminar
                                        </Accordion.Toggle>    
                                        <Accordion.Collapse eventKey="1">
                                            <button className="btn btn-outline-warning mt-2 mb-2" onClick={() => eliminarComentario(publicacion._id, comentario.usuario._id, comentario._id)}>
                                                Eliminar comentario
                                            </button>
                                        </Accordion.Collapse>
                                    </div>
                            }                                
                            </Accordion>
                            {comentario.respuesta.map((respuesta) => (
                                <ListGroup>
                                <ListGroup.Item>
                                    <h4>{respuesta.usuario.userName}</h4>
                                    <p>{respuesta.respuesta}</p>
                                    {
                                        respuesta && ((respuesta.usuario._id === dataUser.id) || (publicacion.creador._id === dataUser.id)) && 
                                            <div>
                                                <Accordion>
                                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                        Eliminar
                                                    </Accordion.Toggle>    
                                                    <Accordion.Collapse eventKey="1">
                                                        <button className="btn btn-outline-warning mt-2 mb-2" onClick={() => eliminarRespuesta(publicacion._id, respuesta.usuario._id, comentario._id, respuesta._id)}>
                                                            Eliminar respuesta
                                                        </button>
                                                    </Accordion.Collapse>
                                                </Accordion>
                                            </div>
                                    }         
                                </ListGroup.Item>
                                </ListGroup>


                            
                            ))} 
                        
                    </div>        
                ))
            }

        </div>
            {showError()}
            {showSucces()}
            {redirectTo()}
        </div>
        
        
    );
};

export default CardPublicacionPage;