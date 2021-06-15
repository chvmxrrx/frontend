import{ React, useState, useEffect }from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { readProject } from './apiUser'
import Card from '../core/cardOfertasProjects';
const ProjectsOffers = (props) => {

    const {dataUser, accessToken} = isAuthenticated()
    const [project, setProject] = useState([])
    const [error, setError] = useState({})
        
    const loadProject = projectId => {
        
        readProject(dataUser.id, accessToken, projectId ).then(data => {
            if(data.error){
                setError(data.error)
            } else{
                setProject(data)
            }

        })
    }
    
    useEffect(() => {
        
        const projectId = props.match.params.projectId 
        loadProject(projectId)
        
    }, [])

    return ( 
                <Layout title={project.nombre} 
                description="Estas viendo las ofertas de tu proyecto!" 
                className="containter-fluid">
                    
                    <div className="row">
                        
                    {project && project.tamaño && <Card project={ project } />}
                    
                    </div>
                </Layout>
    )
         
    
    
    
};

export default ProjectsOffers;