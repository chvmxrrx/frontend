import React from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
const Card = ({ project }) => {
    return ( 
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-header">{project.nombre}</div>
                <div className="card-body">
                <ShowImage image={project} url="proyecto" />
                    <p>Creador: {project.creador.nombre}</p>
                    <p>Parte: {project.parteCuerpo}</p>
                    <p>Tamaño: {project.tamaño}</p>
                    <p>Estado: {project.estado.nombre}</p>
                    <p>Estilo: {project.estiloTatuaje.nombre}</p>
                    <p>{moment(project.createdAt).fromNow()}</p>
                    <Link to={`/profile/project/${project._id}`}>
                        <button className="btn btn-outline-primary mt-2 mb-2">
                            Ver proyecto
                        </button>
                    </Link>
                    <Link to={`/profile/project/doOffert/${project._id}`}>
                        <button className="btn btn-outline-warning mt-2 mb-2">
                            Realizar oferta
                        </button>
                    </Link>
                </div>
            </div>
        </div>
        )
}

export default Card