import React from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { isAuthenticated } from '../auth';

const Card = ({ project }) => {
    const {dataUser} = isAuthenticated()
    return ( 
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-header">{project.nombre}</div>
                <div className="card-body">
                <ShowImage image={project} url="proyecto" />
                    <p>Creador: {project.creador.nombre}</p>
                    <p>Descripción: {project.descripcion}</p>
                    <p>Tamaño: {project.tamaño}</p>
                    <p>Parte seleccionada: {project.parteCuerpo.nombre}</p>
                    <p>Estilo: {project.estiloTatuaje.nombre}</p>
                    <p>Estado: {project.estado.nombre}</p>
                    <p><AccessTimeIcon color="action" fontSize="small"/> {moment(project.createdAt).fromNow()} </p>
                    <div align="center">
                        {
                            (project.estado.nombre === "Terminado" || project.creador._id === dataUser.id)  ? (
                                <div></div>
                            ) : (
                                <Link to={`/profile/project/doOffert/${project._id}`}>
                                    <button className="btn btn-outline-warning mt-2 mb-2">
                                        Realizar oferta
                                    </button>
                                </Link>
                            )
                        }    
                    </div>
                </div>
            </div>
        </div>
        )
}

export default Card