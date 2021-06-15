import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Swal from 'sweetalert2'
import moment from 'moment'

const Card = ({ offer }) => {
    const {dataUser, accessToken} = isAuthenticated()
    const [redirectToReferrer, setRedirectToReferrer] = useState(false)

    // const redirectUser = () =>{
    //     if(redirectToReferrer) {
    //         return <Redirect to={`/profile/myprojects/${dataUser.id}`} />
    //     }
    // }
    const clickSubmit = event => {
        
            event.preventDefault()
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }
              })
        
    }

    return ( 
        
        <div className="col-4 mb-3">
            {/* {redirectUser()} */}
            <div className="card">
                <div className="card-header">{moment(offer.createdAt).fromNow()}</div>
                <div className="card-body">
            
                    <p>Descripción: {offer.descripcion}</p>
                    <p>valor: {offer.valor}</p>
                    <p>Estado: {offer.estado.nombre}</p>
                    {/* <Link to='/'>
                        <button className="btn btn-outline-primary mt-2 mb-2">
                            Eliminar
                        </button>
                    </Link> */}
                    <div align="center">
                        <button className="btn btn-outline-primary mt-2 mb-2" onClick={clickSubmit}>
                            Eliminar 
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        )
}
export default Card