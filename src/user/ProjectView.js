import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
const ProjectView = () => {
    
    const {accessToken, dataUser} = isAuthenticated()
    return ( 
        <Layout title="Mis proyectos" description="Estas viendo tus proyectos!" className="containter-fluid">
            <p>product page</p>
         </Layout>
         )
     
};

export default ProjectView;