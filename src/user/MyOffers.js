import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { getMyOffers } from '../core/apiCore';
import { isAuthenticated } from '../auth';
import Card from '../core/cardMyOffers';
import { Link } from 'react-router-dom';

const MisOfertas = () => {

    const [offers, setOffers] = useState([])
    const {dataUser, accessToken} = isAuthenticated()
    const [error, setError] = useState(false)

    const loadOffers = () => {
        getMyOffers(dataUser.id, accessToken).then( data => {
            if(data.error){
                setError(data.error)
            } else {
                setOffers(data.data)
            }
        })
    }
    useEffect(() =>{
        loadOffers()
        
    },[])

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
            <Link to={`/profile/project/projects/list`}>
                <p>Ver proyectos de Inkapp</p>
            </Link>
        </div>
    )

   return ( 
   <Layout title="Mis ofertas" description="Estas viendo las ofertas que haz realizado">
       <h2 className="mb4" align="center">Ofertas de {dataUser.user}</h2>
       <div className="row">
            { offers.map((offer, id) => (
                <Card key={id} offer={offer}/>
            ))}
        </div>
      {showError()}
    </Layout>
    )

};

export default MisOfertas;