import React from 'react'
import { API } from '../config'

const ShowImage = ({image, url}) => (
    <div className = "product-img">
        <img
            src={`${API}/${url}/imagen/${image._id}`}
            alt={image.name}
            className="mb-3"
            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "cover", objectPosition: "center center" }}
        />
    </div>
)

export default ShowImage 