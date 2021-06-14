import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import { getProjects } from './apiCore';
import { isAuthenticated } from '../auth';
import Card from './card';

const Home = () => {

    const [projects, setProjects] = useState([])
    const {dataUser, accessToken} = isAuthenticated()
    const [error, setError] = useState(false)

    const loadProjects = () => {
        getProjects(dataUser.id, accessToken).then( data => {
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
   <Layout title="Home Page" description="Aplicacion Inkapp para tatuadores.">
       <h2 className="mb4">Proyectos inkapp!</h2>
       <div className="row">
            { projects.map((project, id) => (
            <Card key={id} project={project}/>
            ))}
        </div>
      
    </Layout>
    )

};

export default Home;
