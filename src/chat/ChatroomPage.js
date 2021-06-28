import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { withRouter } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Layout from '../core/Layout'
import { Button } from '@material-ui/core';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '73vh',
    backgroundColor: '#bee77b'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});
const useStylesTittle = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    root: {
        ...theme.typography.button,
        backgroundColor: "black",
        padding: theme.spacing(1),
        color:'white',
        textAlign: 'center'
      },
    
  }));
const ChatroomPage = ({match, socket}) => {
    const classes = useStyles();
    const chatroomId = match.params.id
    const [msg, setMsg] = useState('')
    const [messages, setMessages] = React.useState([])
    const messageRef = React.useRef()
    const [userId, setUserId] = React.useState('');
    const {accessToken, dataUser} = isAuthenticated()
    const clase = useStylesTittle()
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
      <div>
        <Grid container style={{marginTop: 10}}>
            <Grid item xs={12} >
            <Typography className={clase.root}>{"CHATROOMS DE INKAPP"}</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={12}>
                <List className={classes.messageArea}>
                    {messages.map((mensaje,i) => (
                    <ListItem key={i}>
                        <Grid container>
                        {dataUser.id === mensaje.userId ? (
                        <Grid item xs={12}>
                                <ListItemText align="right" style={{color: "blue" }} primary={`${mensaje.name}: ${mensaje.message} `}></ListItemText>
                        </Grid>
                        ) : (
                        <Grid item xs={12}>
                            <ListItemText align="left" style={{color: "green" }} primary={`${mensaje.name}: ${mensaje.message} `}></ListItemText>
                        </Grid>) 
                        
                        }
                         
                        </Grid>
                    </ListItem> 
                
                    ))}
                    
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11} align="center">
                        <input type="text" name="message" placeholder="Di algo!" ref={messageRef}></input>
                    </Grid>
                    <Grid xs={1} align="right">
                    <Button className="join" onClick={sendMessage}><Fab color="primary" aria-label="add"><SendIcon /></Fab></Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
      </Layout>
  );
}
export default withRouter(ChatroomPage)