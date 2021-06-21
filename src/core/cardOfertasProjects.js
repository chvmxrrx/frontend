import React from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './showImage'
import moment from 'moment'
const Card = ({project}) => {

    
    return ( 
        
            <div className="card" align="center">
                <div className="card-header">{project.nombre}</div>
                <div className="card-body">
                <ShowImage image={project} url="proyecto" />
                    <h2> Parte seleccionada: {project.parteCuerpo.nombre}</h2>
                    <h2> Tamaño: {project.tamaño}</h2>
                    <h2> Estilo: {project.estiloTatuaje.nombre}</h2>
                    <h2> Estado: {project.estado.nombre}</h2>
                    <p>{moment(project.createdAt).fromNow()}</p>
                    <h1>Ofertas </h1>
                    {project.oferta.map((data, i) => (
                            <div>
                                {data.estado.nombre === 'En espera' && project.estado.nombre === 'En espera' ? (
                                    <div>
                                        <div>
                                            <h2>Username: 
                                                <Link to={`/`}>
                                                    <button className="btn btn-outline-primary mt-2 mb-2">
                                                        {data.ofertante.userName} 
                                                    </button>
                                                </Link>
                                            </h2>
                                            <h2>Descripcion: {data.descripcion} </h2>
                                            <h2>Valor: ${data.valor}</h2>
                                            <h2>{moment(data.createdAt).fromNow()}</h2>
                                        </div>
                                        <div>
                                            <Link to={`/profile/project/doOffert/${project._id}/${data._id}/${'aceptar'}`}>
                                                <button className="btn btn-outline-primary mt-2 mb-2">
                                                    Aceptar oferta
                                                </button>
                                            </Link>
                                            <Link to={`/profile/project/doOffert/${project._id}/${data._id}/${'rechazar'}`}>
                                                <button className="btn btn-outline-warning mt-2 mb-2">
                                                    Rechazar oferta
                                                </button>
                                            </Link>
                                        </div>  
                                    </div>
                                    
                                ) : (
                                    <div>

                                    </div>
                                )}
                                {data.estado.nombre === 'Aceptado' && project.estado.nombre === 'Terminado' ? (
                                    <div>
                                        <div>
                                            <h2>Tienes una oferta aceptada, comunicate con: {data.ofertante.userName} </h2>
                                            <h2>Descripción: {data.descripcion} </h2>
                                            <h2>Valor: ${data.valor}</h2>
                                            <h2>Estado: {data.estado.nombre}</h2>
                                            <p>{moment(data.createdAt).fromNow()}</p>
                                        </div>
                                        <div>
                                            <Link to={`/`}>
                                                <button className="btn btn-outline-primary mt-2 mb-2">
                                                    {data.ofertante.userName}
                                                </button>
                                            </Link>
            
                                        </div>  
                                    </div>
                                    
                                ) : (
                                    <div>

                                    </div>
                                )}
                            </div>
                    )) }
                </div>
            </div>
       
        )
}

export default Card