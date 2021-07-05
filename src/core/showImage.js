import React from 'react'
import { API } from '../config'

const ShowImage = ({image, url}) => (
    <div className = "product-img">
        <img
            src={`${API}/${url}/imagen/${image._id}`}
            alt={image.name}
            className="mb-3"
            style={{ width:"300px", height:"300px", objectFit: "cover", objectPosition: "center center" }}
        />
    </div>
)

export default ShowImage 