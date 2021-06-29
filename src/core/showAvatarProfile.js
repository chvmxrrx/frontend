import React from 'react'
import { API } from '../config'
import { Avatar } from '@material-ui/core';
const ShowAvatarProfile = ({image, url}) => (
        <Avatar
            src={`${API}/${url}/imagen/${image._id}`}
            alt={image.userName}
            style={{  height: '200px', 
            width: '200px', 
            objectFit: "cover", 
            objectPosition: "center center", border: 'solid 1px',
            boxShadow: `6px 8px 47px -19px rgba(0,0,0,0.55)`}}
        />
)

export default ShowAvatarProfile;