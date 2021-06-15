import React from 'react';
import { API } from '../config';

const ShowImage = ({image, url}) => (
    <div className="product-img">
        <img 
            src={`${API}/${url}/imagen/${image._id}`} 
            alt={image.nombre} 
            style={{ maxWidth: "100%", maxHeight:"100%", objectFit:"cover", objectPosition:"center center"}} 
            className="mb-3"
        />
    </div>
)
export default ShowImage;
