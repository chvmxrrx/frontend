import { API } from '../config';

//FUNCION CREAR REGION
export const createRegion = (id, accesToken, region) => {
    return fetch(`${API}/region/crear/${id}`, {
        method: "POST",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accesToken}`
        },
        body: JSON.stringify(region)
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        console.log(JSON.parse(err));
    });
};

//FUNCION CREAR ESTADO
export const createEstado = (id, accesToken, estado) => {
    return fetch(`${API}/estado/crear/${id}`, {
        method: "POST",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accesToken}`
        },
        body: JSON.stringify(estado)
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        console.log(err);
    });
};

//FUNCION CREAR ESTILO DE TATUAJE
export const createEstiloTatuaje = (id, accesToken, estilo) => {
    return fetch(`${API}/tiposTatuajes/crear/${id}`, {
        method: "POST",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accesToken}`
        },
        body: JSON.stringify(estilo)
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        console.log(err);
    });
};

//OBTENER LISTADO REGIONES
export const getRegiones = () => {
    return fetch(`${API}/region/listado`, {
        method: "GET"
    })
    .then( response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
};

//OBTENER LISTADO ESTADOS
export const getEstados = (id, accesToken) => {
    return fetch(`${API}/estado/listado/${id}`, {
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

//OBTENER LISTADO ESTILOS DE TATUAJE
export const getEstilosTatuajes = (id, accesToken) => {
    return fetch(`${API}/tipoTatuajes/listado/${id}`, {
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

//OBTENER/BUSCAR REGION
export const getRegion = (idR, idU, accesToken) => {
    return fetch(`${API}/region/buscar/${idR}/${idU}`, {
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

//OBTENER/BUSCAR ESTADO
export const getEstado = (idU, idE, accesToken) => {
    return fetch(`${API}/estado/buscar/${idE}/${idU}`, {
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

//OBTENER/BUSCAR ESTILO DE TATUAJE
export const getEstiloTatuaje = (idU, idET, accesToken) => {
    return fetch(`${API}/tipoTatuajes/buscar/${idET}/${idU}`, {
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


//ACTUALIZAR REGION
export const updateRegion = (idU, idR, accessToken, region) => {
    return fetch(`${API}/region/modificar/${idR}/${idU}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify(region)
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        console.log(err);
    });
};

//ACTUALIZAR ESTADO
export const updateEstado = (idU, idE, accessToken, estado) => {
    return fetch(`${API}/estado/modificar/${idE}/${idU}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify(estado)
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        console.log(err);
    });
};

//ACTUALIZAR ESTILO DE TATUAJE
export const updateEstiloTatuaje = (idU, idET, accessToken, estilo) => {
    return fetch(`${API}/tipoTatuajes/modificar/${idET}/${idU}`, {
        method: "PUT",
        headers: {
            Accept: 'aplication/json',
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify(estilo)
    })
    .then( response => {
        return response.json(); 
    })
    .catch( err => {
        console.log(err);
    });
};

//ELIMINAR REGION
export const deleteRegion = (idR, idU, accessToken) => {
    return fetch(`${API}/region/eliminar/${idR}/${idU}`, {
        method: "DELETE",
        headers: {
            Accept: 'aplication/json',
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

//ELIMINAR ESTADO
export const deleteEstado = (idE, idU, accessToken) => {
    return fetch(`${API}/estado/eliminar/${idE}/${idU}`, {
        method: "DELETE",
        headers: {
            Accept: 'aplication/json',
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

//ELIMINAR ESTILO DE TATUAJE
export const deleteEstiloTatuaje = (idET, idU, accessToken) => {
    return fetch(`${API}/tipoTatuajes/eliminar/${idET}/${idU}`, {
        method: "DELETE",
        headers: {
            Accept: 'aplication/json',
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