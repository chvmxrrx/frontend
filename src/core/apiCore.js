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
        console.log(err.error);
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
        return err.json()
    });
};