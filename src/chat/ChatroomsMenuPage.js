import React from 'react'
import makeToast from '../Toaster/Toaster'
import { io } from 'socket.io-client'
import { withRouter } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { API } from '../config' 
import Layout from '../core/Layout'

    const DashboardPage = (props) => {
    
    const [chatrooms, setChatrooms] = React.useState([])
    const [chatroomsId, setChatroomsId] = React.useState('')
    const [chatroomName, setChatroomName] = React.useState('')
    const {accessToken, dataUser} = isAuthenticated()
    const [socket, setSocket] = React.useState('') 
    
    const setupSocket = () =>{
        
        
        if(accessToken && !socket){
        const newSocket = io('http://localhost:8000', {

            query: {
                token: accessToken
            }
        })
        

        newSocket.on('disconnect', () => {
        setSocket(null)
        setTimeout(setupSocket, 3000)
        makeToast('error', 'Socket Disconnected!')
        })

        newSocket.on('connect', () => {

         
        setSocket(newSocket)
        
        makeToast('success', 'Socket Connected!')
        })
        
        }
    }
    
    const getChatrooms = ()=>{
        fetch(`${ API }/chatroom/${dataUser.id}`, {
            headers: {
                Authorization: `${accessToken}`
                
            }
        }).then(response => response.json())
        .then(data => {  
            
            setChatrooms(data) 
        } )
        .catch(err => {
        makeToast('error', err.data.error)
        
        setTimeout(getChatrooms, 3000)
    })
        
    }

    const crearChatroom = (chatroomName) => {
        const nombre = chatroomName

        if(!nombre){
            makeToast('error', 'Debe ingresar un nombre para crear sala')
        }else{
            fetch(`${ API }/chatroom/crear/${dataUser.id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: ` ${accessToken}`,
                    "Content-Type" : "application/json"
                },
                
                body: JSON.stringify({name: nombre})
            }).then(response => response.json())
            .then(data => {
                makeToast('success', data.mensaje)
                
                getChatrooms()
                
            }).catch(error => {
                makeToast('error' , error.error)

                
            })
    }
    }

    const eliminarSala = () => {
        const id = chatroomsId
        if(id === null) {
            makeToast('error', 'Debe seleccionar chatroom')
        } else {
            fetch(`${API}/chatroom/eliminar/${id}/${dataUser.id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    Authorization: ` ${accessToken}`,
                    "Content-Type" : "application/json"
                }
            }).then(response => {
                makeToast('success', 'Se ha eliminado sala con éxito')
                getChatrooms()
            }).catch(error => {
                makeToast('error', 'Ha ocurrido un error')
                console.log(error);
            })
        }
    }

    const clickSubmit = () => {
        crearChatroom(chatroomName)
    }

    React.useEffect(() => {
        
        getChatrooms()
        setChatroomsId(null)
        setupSocket()
        
    //eslint-disable-next-line
    }, [])
    const ingresarSala = () => {
        
        props.history.push("/chatroom/" + chatroomsId)
        props.setupSocket();
    }
    const handleChangeChatroom = name => event => {
        const value = event.target.value
        setChatroomName(value)   
    }

    const handleChange = name => event => {
        const value = event.target.value
        if(value === 'nulo'){
            setChatroomsId(null)
        }else{
            setChatroomsId(value)
        }
    }

    const mostrarMensajeError = () => {
        makeToast('error', 'Seleccione una sala')
    }


    const verificarId = () => {
        return chatroomsId!=null ? (
                <button className="join" onClick={ingresarSala}> Ingresar
                    
                </button>
            
        ) : (
            <button className="join" onClick={mostrarMensajeError}>Seleccionar sala</button>
        );
    };

    const verificarTipo = () => {
        if(dataUser.tipo === 0){
            return (
                <div className="card">
                    <div className="cardHeader">Chatrooms</div>
                        <div className="cardBody">
                            <div className="inputGroup">
                             <label className="chatroomName" align ="center">Chatroom</label>
                            <input 
                                type="text" 
                                name="chatroomName" 
                                id="chatroomName" 
                                placeholder="Ingresa nombre de la sala"
                                onChange={handleChangeChatroom('chatroomName')}
                             />
                            </div>
                
                            <button onClick={clickSubmit}>Crear nueva sala</button>
                                <div className="center" style={{paddingBottom: 5}}>
                                    <select className="chatrooms" onChange={handleChange('chatroom')}>
                                        <option value='nulo'>Seleccionar sala</option>
                                        {chatrooms.map((chatroom)=> (
                                        <option key={chatroom._id} className="chatroom" value={chatroom._id}>
                                            {chatroom.name}
                                        </option>
                                        ))}
                                    </select>
                                </div>

                            {verificarId()}    
                            <div style={{
                                padding: 5
                            }}></div>
                            <div className="center" >
                                <button className="join" onClick={eliminarSala}> Eliminar sala </button> 
                            </div>
                            
                        </div>
                </div>
            ) 
        }else {
            return (
                <div className="card">
                    <div className="cardHeader">Chatrooms</div>
                        <div className="cardBody">
                            <div className="inputGroup">
                             <label className="chatroomName">Chatrooms de Inkapp!</label>
                            </div>
                            <div className="center" style={{paddingBottom: 5}}>
                                <select className="chatrooms" align="center" onChange={handleChange('chatroom')}>
                                    <option value='nulo'>Seleccionar sala</option>
                                        {chatrooms.map((chatroom)=> (
                                            <option key={chatroom._id} className="chatroom" value={chatroom._id}>
                                                {chatroom.name}
                                            </option>
                                        ))}
                                </select>
                                </div>  
                                {verificarId()} 
                                             
                        </div>
                </div>
            )
        }
    }
        
    return (
        <Layout
            title="Chatrooms de inkapp"
            description="Sietete libre de chatear con los demás usuarios"
            className="container col-md-8 offset-md-2"
        >
           { verificarTipo() }
            
        </Layout>
        
    )
}
export default withRouter(DashboardPage)