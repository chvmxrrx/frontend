import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { getMyProjects } from '../core/apiCore';
import { isAuthenticated } from '../auth';
import Card from '../core/cardMyProjects';
import { Link } from 'react-router-dom';
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

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
            <Link to={`/profile/project/create/${dataUser.id}`}>
                <p>Crear un nuevo proyecto</p>
            </Link>
        </div>
    )
    
   return ( 
   <Layout title="Mis proyectos" description="Estas viendo tus proyectos!">
       <h2 className="mb4">Proyectos de {dataUser.nombre}</h2>
       <div className="row">
            { projects.map((project, id) => (
            <Card key={id} project={project}/>
            ))}
        </div>
      {showError()}
    </Layout>
    )

};

export default MisProyectos;