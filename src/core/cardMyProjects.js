import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage'
import { deleteProject } from '../user/apiUser'
import { isAuthenticated } from '../auth'
import Swal from 'sweetalert2'
import moment from 'moment'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
const Card = ({ project }) => {
    const {dataUser, accessToken} = isAuthenticated()

    const clickSubmit = event => {
        
            event.preventDefault()
            Swal.fire({
                title: `¿Estas seguro?`,
                text: `No podrás recuperar tu proyecto: ${project.nombre}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!'
              }).then((result) => {
                if (result.isConfirmed) {
                    deleteProject(dataUser.id, accessToken, project._id).then((data)=> {
                        if(data.error){
                            Swal.fire(
                                'Error!',
                                data.error,
                                'error'
                              )
                        }else {
                            Swal.fire(
                                'Eliminado!',
                                data.mensaje,
                                'success'
                              )
                              window.location.reload()
                        }
                    })
                }
              })
        
    }

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
                    <p>Estilo de tatuaje: {project.estiloTatuaje.nombre}</p>
                    <p>Estado: {project.estado.nombre}</p>
                    <p><AccessTimeIcon color="action" fontSize="small"/> {moment(project.createdAt).fromNow()}</p>
                    <Link to={`/profile/project/update/${project._id}`}>
                        <button className="btn btn-outline-primary mt-2 mb-2">
                            Modificar proyecto
                        </button>
                    </Link>
                    
                        <button className="btn btn-outline-warning mt-2 mb-2" onClick={clickSubmit}>
                            Eliminar proyecto
                        </button>
                    
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