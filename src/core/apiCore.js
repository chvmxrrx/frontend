import { API } from "../config";


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
        return err
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
        return err
    });
};