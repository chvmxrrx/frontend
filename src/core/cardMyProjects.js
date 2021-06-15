import React from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './ShowImage'
const Card = ({ project }) => {
    return ( 
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-header">{project.nombre}</div>
                <div className="card-body">
                <ShowImage item={project} url="proyecto" />
                    <p>Creador: {project.creador.nombre}</p>
                    <p>Parte: {project.parteCuerpo}</p>
                    <p>Tamaño: {project.tamaño}</p>
                    <p>Estado: {project.estado.nombre}</p>
                    <Link to='/'>
                        <button className="btn btn-outline-primary mt-2 mb-2">
                            Modificar proyecto
                        </button>
                    </Link>
                    <Link to={`/profile/project/delete/${project.creador._id}`}>
                        <button className="btn btn-outline-warning mt-2 mb-2">
                            Eliminar proyecto
                        </button>
                    </Link>
                    <div>
                    <Link to={`/profile/project/offerts/${project._id}`}>
                        <button className="btn btn-outline-warning mt-2 mb-2">
                            Ver ofertas
                        </button>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
        )
}
export default Card