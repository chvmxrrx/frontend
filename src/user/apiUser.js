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
        console.log(err);
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
        console.log(err);
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
        console.log(err);
    });
    
};