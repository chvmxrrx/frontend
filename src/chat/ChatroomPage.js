import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import '../styles/chatroom.css'
import Layout from '../core/Layout'

const ChatroomPage = ( { match, socket}) => {
    
    const chatroomId = match.params.id
    const [messages, setMessages] = React.useState([])
    const messageRef = React.useRef()
    const [userId, setUserId] = React.useState('');
    const {accessToken, dataUser} = isAuthenticated()
    
    const sendMessage = () =>{

            socket.emit('chatroomMessage', {
                chatroomId,
                message: messageRef.current.value
                
            })
            messageRef.current.value = ""

    }
    React.useEffect(() => {
        
        if(accessToken){
            const payload = JSON.parse(atob(accessToken.split('.')[1]))
            setUserId(payload.id)
        }
        if(socket) {
            socket.on('newMessage', (message) => {
                const newMessages = [...messages, message]
                setMessages(newMessages)
            })
        }
       
    },[messages])

    React.useEffect(() => {
        
        if(socket){
            socket.emit('joinRoom', {
                chatroomId
            })
        }
        return ()=>{
            //Component unmount
            if(socket){
                socket.emit('leaveRoom', {
                    chatroomId,
                })
            }
            
        }
        //eslint-disable-next-line
    }, [])
    return (
        
        <Layout
            title="Chatrooms de inkapp"
            description="Sietete libre de chatear con los demás usuarios"
            className="container col-md-8 offset-md-2"
        >
        <div className="chatroomPage">
            <div className="chatroomSection">
                <div className="cardHeader">Sala de chat</div>
                <div className="chatroomContent">
                    {messages.map((mensaje,i) => (
                        <div key={i} className="message">
                            <span className={dataUser.id === mensaje.userId ? "ownMessage" : "otherMessage"}>{mensaje.name + ': '}</span> 
                            {mensaje.message}
                        </div>
                    ))}  
                </div>
                <div className="chatroomActions">
                    <div>
                        <input type="text" name="message" placeholder="Di algo!" ref={messageRef}></input>
                    </div>
                    <div>
                        <button className="join" onClick={sendMessage}>Enviar</button>
                    </div>
                    <div><button className="join"><Link to="/chatroomsmenu">Volver</Link></button></div>
                </div>
            </div>
        </div>
        
        </Layout>
    )
}

export default withRouter(ChatroomPage) 