import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { getMyProjects } from '../core/apiCore';
import { isAuthenticated } from '../auth';
import Card from '../core/cardMyProjects';

const MisProyectos = () => {

    const [projects, setProjects] = useState([])
    const {dataUser, accessToken} = isAuthenticated()
    const [error, setError] = useState(false)

    const loadProjects = () => {
        getMyProjects(dataUser.id, accessToken).then( data => {
            if(data.error){
                setError(data.error)
            } else {
                setProjects(data.data)
            }
        })
    }
    useEffect(() =>{
        loadProjects()
        
    },[])

   return ( 
   <Layout title="Mis proyectos" description="Estas viendo tus proyectos!">
       <h2 className="mb4">Proyectos de {dataUser.nombre}</h2>
       <div className="row">
            { projects.map((project, id) => (
            <Card key={id} project={project}/>
            ))}
        </div>
      
    </Layout>
    )

};

export default MisProyectos;