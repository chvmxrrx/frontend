import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Swal from 'sweetalert2'
import moment from 'moment'
import { deleteOffer } from './apiCore'
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const Card = ({ offer }) => {
    
    const {dataUser, accessToken} = isAuthenticated()
    const [redirectToReferrer, setRedirectToReferrer] = useState(false)

    const redirectUser = () =>{
        if(redirectToReferrer) {
            return <Redirect to={`/profile/offers/myoffers/${dataUser.id}`} />
        }
    }
    const clickSubmit = event => {
        
            event.preventDefault()
            Swal.fire({
                title: '¿Estas seguro?',
                text: "No podrás revertir este cambio",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminala!'
              }).then((result) => {
                if (result.isConfirmed) {
                    deleteOffer(offer._id, dataUser.id, accessToken).then((data) =>{
                        if(data.error) {
                            Swal.fire(
                                'Error!',
                                data.error,
                                'error'
                              )
                        } else {
                            setRedirectToReferrer(true)
                            Swal.fire(
                                'Eliminada!',
                                data.mensaje,
                                'success'
                              )
                         }   
                    })
                  
                }
              })
        
    }
    
    return ( 
        
        <div className="col-4 mb-3">
            
            <div className="card">
                <div className="card-header"><AccessTimeIcon color="action" fontSize="small"/> {moment(offer.createdAt).fromNow()}</div>
                <div className="card-body">
            
                    <p>Descripción: {offer.descripcion}</p>
                    <p>valor: {offer.valor}</p>
                    <p>Estado: {offer.estado.nombre}</p>
                    <div align="center">
                        <button className="btn btn-outline-primary mt-2 mb-2" onClick={clickSubmit}>
                            Eliminar 
                        </button>
                    </div>
                </div>
            </div>
            {redirectUser()}
        </div>
        
        )
}
export default Card