import React from 'react'
import { API } from '../config'

const ShowImage = ({item, url}) => (
    <div className = "product-img">
        <img
            src={`${API}/${url}/imagen/${item._id}`}
            alt={item.name}
            className="mb-3"
            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "cover", objectPosition: "center center" }}
        />
    </div>
)

export default ShowImage 