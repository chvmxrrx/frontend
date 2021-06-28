import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { getAllPublicaciones } from './apiCore';
import CardHome from './Card';
import { isAuthenticated } from '../auth';

const Home = () => {

    const [publicaciones, setPublicaciones] = useState([]);
    const [error, setError] = useState(false);

    const loadAllPublicaciones = () => {
        getAllPublicaciones().then(data => {
            if(data.error){
                setError(data.error);                
            } else {
                setPublicaciones(data.data);
            }
        })
    }

    useEffect(() => {
        loadAllPublicaciones();
    }, []);

    return (
        <Layout title="Home Page" description="Aplicacion Inkapp para tatuadores." className="container-fluid">
            <h2 className="mb-4">Explorar publicaciones...</h2>
            <div className="row">
                { publicaciones.map((publicacion, i) => (
                    <div className="col-4 mb-3">
                        <CardHome key={i} publicacion={publicacion} />
                    </div>
                ))}
            </div>
            
        </Layout>
    );
}
export default Home;
