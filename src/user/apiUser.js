import { API } from '../config';

export const read = (id, accessToken) => {
    return fetch(`${API}/perfil/buscar/${id}`, {
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
};

export const update = (id, accessToken, user) => {
    return fetch(`${API}/perfil/modificar/${id}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`
        },
        body: user
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err
    });
};

export const updateUser = (user, next) => {
    if(typeof window !== 'undefined') {
        if(sessionStorage.getItem("jwt")) {
            let auth = JSON.parse(sessionStorage.getItem("jwt"));
            auth.dataUser = user;
            sessionStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }
};

export const createPublication = (id, accessToken, publication) => {
    return fetch(`${API}/publicacion/crear/${id}`, {
        method: "POST",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`
        },
        body: publication
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err
    });

};

export const search = (user) => {
    return fetch(`${API}/perfil/buscar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({user: user})
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err;
    });
};


export const createProject = (id, accessToken, project) => {
    return fetch(`${API}/proyecto/crear/${id}`, {
        method: "POST",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`
        },
        body: project
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err
    });
    
};

export const readProject = (id, accessToken, project) => {
        
    return fetch(`${API}/proyecto/buscar/${project}/${id}`, {
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
};

export const updateProject = (id, accessToken, projectId, project) => {
    return fetch(`${API}/proyecto/modificar/${projectId}/${id}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`
        },
        body: project
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err
    });
};

export const resOferta = (idUser, accessToken, projectId, offerId, response) => {
    return fetch(`${API}/oferta/respuesta/${projectId}/${offerId}/${idUser}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({respuesta: response})
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        return err
    });
};


export const createOffer = (idUser, accessToken, projectId, valor, descripcion) => {
    
    return fetch(`${API}/oferta/crear/${projectId}/${idUser}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({valor: valor.valor,
        descripcion: descripcion.descripcion
    })
    })
    .then( response => {
        
        return response.json(); 
    })
    .catch( err => {
        
        return err
    });
    
};

export const deleteProject = (idUser, accessToken, projectId) => {
    
    return fetch(`${API}/proyecto/eliminar/${projectId}/${idUser}`, {
        
        method: "DELETE",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`,
            "Content-Type": "application/json"
        }
        
    })
    .then( response => {
        
        return response.json(); 
    })
    .catch( err => {
        
        return err
    });
    
}

export const likePublicacion = (idUser, accessToken, publicacionId) => {
    
    return fetch(`${API}/publicacion/like/${idUser}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ idPublicacion: publicacionId  })
    })
    .then( response => {
        
        return response.json(); 
    })
    .catch( err => {
        
        return err
    });
    
};

export const likePerfil = (idUser, accessToken, perfilId) => {
    
    return fetch(`${API}/perfil/like/${idUser}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            Authorization: `${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ idUser: perfilId  })
    })
    .then( response => {
        
        return response.json(); 
    })
    .catch( err => {
        
        return err
    });
    
};