import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { getMyOffers } from '../core/apiCore';
import { isAuthenticated } from '../auth';
import Card from '../core/cardMyOffers';

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

   return ( 
   <Layout title="Mis ofertas" description="Estas viendo las ofertas que haz realizado">
       <h2 className="mb4" align="center">Ofertas de {dataUser.nombre}</h2>
       <div className="row">
            { offers.map((offer, id) => (
            <Card key={id} offer={offer}/>
            ))}
        </div>
      
    </Layout>
    )

};

export default MisOfertas;