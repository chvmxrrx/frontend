import { API } from '../config';

//LISTADO MIS PUBLICACIONES
export const getPublicaciones = (idU, accesToken) => {
    return fetch(`${API}/publicacion/misPublicaciones/${idU}`, {
        method: "GET",
        headers: {
            Authorization: `${accesToken}`
        }
    })
    .then( response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
};

//LISTADO TODAS LAS PUBLICACIONES
export const getAllPublicaciones = () => {
    return fetch(`${API}/inicio/`, {
        method: "GET"
    })
    .then( response => {
        return response.json()
    })
    .catch(err => {
        return err
    })
};

//OBTENER/BUSCAR UNA PUBLICACION
export const getPublicacion = (idP, idU, accesToken) => {
    return fetch(`${API}/inicio/buscar/${idP}/${idU}`, {
        method: "GET",
        headers: {
            Authorization: `${accesToken}`
        }
    })
    .then( response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
};

//ELIMINAR PUBLICACION
export const deletePublicacion = (idP, idU, accessToken) => {
    return fetch(`${API}/publicacion/eliminar/${idP}/${idU}`, {
        method: "DELETE",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`
        }
    }).then( response => {
        return response.json(); 
    })
    .catch( err => {
        console.log(err);
    });
};


export const getProjects = (id, accessToken) => {
    
    return fetch(`${API}/proyecto/listado/${id}`, {
        method: "GET",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        }
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err
    });
}

export const getMyProjects = (id, accessToken) => {
    
    return fetch(`${API}/proyecto/misProyectos/${id}`, {
        method: "GET",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        }
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};

export const getMyOffers = (id, accessToken) => {
    
    return fetch(`${API}/oferta/misOfertas/${id}`, {
        method: "GET",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        }
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};

export const addComentario = (idP, idU, accessToken, comentario) => {
    return fetch(`${API}/publicacion/comentario/${idP}/${idU}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify(comentario)
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};

export const addRespuesta = (idP, idU, accessToken, respuesta) => {
    return fetch(`${API}/publicacion/comentario/respuesta/${idP}/${idU}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify(respuesta)
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};

export const deleteOffer = (idOffer, idUser, accessToken) => {
    return fetch(`${API}/oferta/eliminar/${idOffer}/${idUser}`, {
        method: "DELETE",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`
        }
    }).then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err
    });
};
export const deleteComentario = (idP, idU, accessToken, body) => {
    return fetch(`${API}/publicacion/comentario/eliminar/${idP}/${idU}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify(body)
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};

export const deleteRespuesta = (idP, idU, accessToken, body) => {
    return fetch(`${API}/publicacion/comentario/respuesta/eliminar/${idP}/${idU}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify(body)
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};

export const getMyOffersReserve = (id, accessToken) => {
    
    return fetch(`${API}/oferta-hora/misofertas/${id}`, {
        method: "GET",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        }
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};