import React, {useState, useEffect} from 'react';
import { getProjects } from '../core/apiCore';
import { isAuthenticated } from '../auth';
import Card from '../core/cardProjects';
import Layout from '../core/Layout';

const AllProjects = () => {
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
        <Layout title="Proyectos" description="Estas viendo los proyectos de inkapp">
       <h2 className="mb4" align="center">Proyectos</h2>
       <div className="row">
            { projects.map((project, id) => (
                <Card key={id} project={project}/>
            ))}
        </div>
      
    </Layout>
    );
};

export default AllProjects;