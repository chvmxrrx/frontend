import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { read } from '../user/apiUser';
import { isAuthenticated } from '../auth';
import { getPublicaciones } from './apiCore';
import Card from './Card';
import makeToast from '../Toaster/Toaster';
import { InputGroup, FormControl, Button, ListGroup, Accordion } from 'react-bootstrap';
import { addComentario, addRespuesta, deleteComentario, deleteRespuesta } from '../user/apiUser';

const Profile = ({ match }) => {

    //OBTENER DATOS DEL TOKEN
    const { dataUser, accessToken } = isAuthenticated();

    //CONSTANTES A UTILIZAR
    const [user, setUser] = useState("");
    const [publicaciones, setPublicaciones] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const [error, setError] = useState(false);
    const [values, setValues] = useState({
        comentario: "",
        respuesta: ""
    });
    const { comentario, respuesta } = values;

    //FUNCIONALIDADES

    //HANDLE CHANGE
    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value});
    }

    //AÑADIR COMENTARIO
    const clickComentario = () => {
        //Request to API 
        addComentario(dataUser.id, user._id , accessToken, {comentario: values.comentario}).then(data => {
            if(data.error) {
                makeToast("error", data.error);
            }else {
                makeToast("success", "El comentario se ha agregado correctamente.");
                setValues({
                    comentario: "",
                    respuesta: ""
                });
                init(user._id);     
            }
        });
    };

    //AÑADIR RESPUESTA
    const clickRespuesta = (idC) => {
        //Request to API 
        addRespuesta(dataUser.id, user._id , accessToken, {id: idC, respuesta: values.respuesta}).then(data => {
            if(data.error) {
                makeToast("error", data.error);
            }else {
                makeToast("success", "La respuesta se ha agregado correctamente.");
                setValues({
                    comentario: "",
                    respuesta: ""
                });
                init(user._id);            
            }
        });
    };

    //ELIMINAR COMENTARIO
    const eliminarComentario = ( idCreador, idComentario) => {
        deleteComentario( dataUser.id, user._id, accessToken, {idUser:idCreador, idComentario:idComentario}).then(data =>{
            if(data.error){
                makeToast("error", data.error);
            }else{
                makeToast("success", "El comentario se ha eliminado correctamente")
                init(user._id);
            }
    })}

    //ELIMINAR RESPUESTA
    const eliminarRespuesta = ( idCreador, idComentario, idRespuesta) => {
        deleteRespuesta( dataUser.id, user._id, accessToken, {idUser:idCreador, idComentario:idComentario, idRespuesta:idRespuesta}).then(data =>{
            if(data.error){
                makeToast("error", data.error);
            }else{
                makeToast("success", "La respuesta se ha eliminado correctamente")
                init(user._id);
            }
    })}

    //CARGAR PUBLICACIONES
    const loadPublicaciones = (userId) => {
        getPublicaciones(userId, accessToken).then(data => {
            if(data.error){
                setError(true);
            } else {
                setPublicaciones(data.data);
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

    //BUSCAR AL USUARIO DEL PERFIL POR ID, SETEAR DATOS, COMENTARIOS Y PUBLICACIONES.
    const init = (userId) => {
        read(userId, accessToken).then(data => {
            if(data.error){
                makeToast("error", data.error)                
            } else {
                setUser(data.user);
                setComentarios(data.user.comentarios);
                loadPublicaciones(userId);
            }
        })
    };

    useEffect (() => {
        init(match.params.userId);
    }, []); 

    return (
        <Layout title="Home Page" description="Aplicacion Inkapp para tatuadores." className="container-fluid">

            {/*MENSAJE DE ERROR AL NO TENER PUBLICACIONES*/}
            {showError()}

            {/*TITULO*/}
            {
                dataUser.id ===   match.params.userId ? (
                    <h2 className="mb-4">Mis publicaciones</h2>
                ) : (
                    <h2 className="mb-4">{`Publicaciones de ${user.userName}`}</h2>
                )
            }

            {/*CARD PUBLICACIONES*/}
            <div className="row">
                { publicaciones.map((publicacion, i) => (
                    <div className="col-4 mb-3">
                        <Card key={i} publicacion={publicacion} showVerPublicacionButton={true} showDeletePublicacionButton={false}/>
                    </div>
                ))}
            </div>

            {/*COMENTARIOS*/}
            {/*INPUT PARA EL COMENTARIO*/}
            <div>
                <h4>Deja tu comentario</h4>
                <InputGroup className="mb-3">    
                    <FormControl
                            placeholder="Inserte un comentario"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={comentario}
                            onChange={handleChange('comentario')}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-primary" onClick={clickComentario}>Comentar</Button>
                        </InputGroup.Append>
                    </InputGroup>      
            </div>

            {/*COMENTARIOS*/}
            <h3>Comentarios</h3>
            {
                comentarios.map((comentario) => (
                        <ListGroup>
                            <ListGroup.Item>

                                {/*CREADOR DEL COMENTARIO Y COMENTARIO*/}
                                <h4>{comentario.usuario.userName}</h4>
                                <p>{comentario.comentario}</p>

                                {/*BOTON DESPLEGABLE DE RESPONDER*/}
                                <Accordion>

                                    {/*LINK DE RESPONDER*/}
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Responder
                                    </Accordion.Toggle>

                                    {/*INPUT DESPLEGABLE DE RESPONDER*/}
                                    <Accordion.Collapse eventKey="0">
                                        <div>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    placeholder="Inserte un comentario"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                    value={respuesta}
                                                    onChange={handleChange("respuesta")}
                                                />
                                                <InputGroup.Append>
                                                    <Button variant="outline-primary" onClick={() => (clickRespuesta(comentario._id))}>Responder</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </div>
                                    </Accordion.Collapse>
                                

                                {/* VALIDACION DE ELIMINAR COMENTARIO (SOLO CREADOR COMENTARIO O DUEÑO DEL PERFIL) */}
                                {
                                    comentario && ((comentario.usuario._id === dataUser.id) || (user._id === dataUser.id)) && 
                                    
                                    //BOTON DESPLEGABLE DE ELIMINAR
                                    <div>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        Eliminar
                                    </Accordion.Toggle>    
                                    <Accordion.Collapse eventKey="1">
                                        <button className="btn btn-outline-warning mt-2 mb-2" onClick={() => {
                                            eliminarComentario( comentario.usuario._id, comentario._id )
                                        }}>
                                            Eliminar comentario
                                        </button>
                                    </Accordion.Collapse>
                                    </div>
                                    
                                }                                
                                </Accordion>
                                {/* RESPUESTAS DE LOS COMENTARIOS*/}
                                {
                                    comentario.respuesta.map((respuesta) => (
                                        <ListGroup>
                                            <ListGroup.Item>

                                                {/*CREADOR DE LA RESPUESTA Y LA RESPUESTA*/}
                                                <h4>{respuesta.usuario.userName}</h4>
                                                <p>{respuesta.respuesta}</p>

                                                {/* VALIDACION DE ELIMINAR RESPUESTA (SOLO CREADOR COMENTARIO O DUEÑO DEL PERFIL) */}
                                                {
                                                    respuesta && ((respuesta.usuario._id === dataUser.id) || (user._id === dataUser.id)) && 
                                                    
                                                    //BOTON DESPLEGABLE DE ELIMINAR
                                                    <Accordion> 
                                                        <div>
                                                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                            Eliminar
                                                        </Accordion.Toggle>    
                                                        <Accordion.Collapse eventKey="1">
                                                            <button className="btn btn-outline-warning mt-2 mb-2" onClick={() => eliminarRespuesta( respuesta.usuario._id, comentario._id, respuesta._id )}>
                                                                Eliminar respuesta
                                                            </button>
                                                        </Accordion.Collapse>
                                                        </div>
                                                    </Accordion>
                                                } 


                                            </ListGroup.Item>
                                        </ListGroup>
                                    ))
                                }
                            </ListGroup.Item>
                        </ListGroup>
                                    ))
                                }         
        </Layout>
    );
};

export default Profile;
