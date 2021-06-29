import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { listarAgenda, read } from '../user/apiUser';
import { isAuthenticated } from '../auth';
import { getMyProjects, getPublicaciones } from './apiCore';
import Card from './Card';
import makeToast from '../Toaster/Toaster';
import { InputGroup, FormControl, Button, ListGroup, Accordion } from 'react-bootstrap';
import { addComentario, addRespuesta, deleteComentario, deleteRespuesta, likePerfil } from '../user/apiUser';
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Grid } from '@material-ui/core';
import ShowAvatarProfile from './showAvatarProfile';
import { Typography, GridList, GridListTile, GridListTileBar, Modal, IconButton } from '@material-ui/core';
import { Camera, ColorLens, Email, QuestionAnswer } from '@material-ui/icons';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import CardProject from './cardProjects';
import CardMyProject from './cardMyProjects';
import { Today } from '@material-ui/icons';
import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/Info';
import ShowImage from './showImage';

const Profile = ({ match }) => {

    //OBTENER DATOS DEL TOKEN
    const { dataUser, accessToken } = isAuthenticated();
    // SETEA LA CANTIDAD DE LIKES QUE TIENE EL USUARIO
    const [likes, setLikes] = useState(0);
    //CONSTANTES A UTILIZAR
    const [user, setUser] = useState("");
    const [publicaciones, setPublicaciones] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const [error, setError] = useState(false);
    const [errorProyecto, setErrorProyecto] = useState(false);
    const [values, setValues] = useState({
        comentario: "",
        respuesta: ""
    });
    const { comentario, respuesta } = values;
    const [proyectos, setProyectos] = useState([])
    const [modal, setModal]= useState(false)
    //FUNCIONALIDADES

    //HANDLE CHANGE
    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value});
    }

    //AÑADIR COMENTARIO
    const clickComentario = () => {
        //Request to API 
        addComentario(dataUser.id, user._id , accessToken, {comentario: values.comentario}).then(data => {
            if(data.error) {
                makeToast("error", data.error);
            }else {
                makeToast("success", "El comentario se ha agregado correctamente.");
                setValues({
                    comentario: "",
                    respuesta: ""
                });
                init(user._id);     
            }
        });
    };

    //AÑADIR RESPUESTA
    const clickRespuesta = (idC) => {
        //Request to API 
        addRespuesta(dataUser.id, user._id , accessToken, {id: idC, respuesta: values.respuesta}).then(data => {
            if(data.error) {
                makeToast("error", data.error);
            }else {
                makeToast("success", "La respuesta se ha agregado correctamente.");
                setValues({
                    comentario: "",
                    respuesta: ""
                });
                init(user._id);            
            }
        });
    };

    //ELIMINAR COMENTARIO
    const eliminarComentario = ( idCreador, idComentario) => {
        deleteComentario( dataUser.id, user._id, accessToken, {idUser:idCreador, idComentario:idComentario}).then(data =>{
            if(data.error){
                makeToast("error", data.error);
            }else{
                makeToast("success", "El comentario se ha eliminado correctamente")
                init(user._id);
            }
    })}

    //ELIMINAR RESPUESTA
    const eliminarRespuesta = ( idCreador, idComentario, idRespuesta) => {
        deleteRespuesta( dataUser.id, user._id, accessToken, {idUser:idCreador, idComentario:idComentario, idRespuesta:idRespuesta}).then(data =>{
            if(data.error){
                makeToast("error", data.error);
            }else{
                makeToast("success", "La respuesta se ha eliminado correctamente")
                init(user._id);
            }
    })}

    //CARGAR PUBLICACIONES
    const loadPublicaciones = (userId) => {
        getPublicaciones(userId, accessToken).then(data => {
            if(data.error){
                setError(true);
            } else {
                setPublicaciones(data.data);
            }
        })
    }

    const loadProyectos = (userId) => {
        getMyProjects(userId, accessToken).then(data => {
            if(data.error){
                setErrorProyecto(true)
            } else {
                setProyectos(data.data);
            }
        })
    }
    // MENSAJE DE ERROR SI NO TIENE PUBLICACIONES
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
            <Link to={`/profile/publication/create/${dataUser.id}`}>
                <p>Crear mi primera publicacion ahora.</p>
            </Link>
        </div>
    )
    const showErrorProyecto = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {errorProyecto}
            <Link to={`/profile/project/create/${dataUser.id}`}>
                <p>Crear mi primera publicacion ahora.</p>
            </Link>
        </div>
    )

    //BUSCAR AL USUARIO DEL PERFIL POR ID, SETEAR DATOS, COMENTARIOS Y PUBLICACIONES.
    const init = (userId) => {
        read(userId, accessToken).then(data => {
            if(data.error){
                makeToast("error", data.error)                
            } else {
                setUser(data.user);
                setComentarios(data.user.comentarios);
                //ACTUALIZA LA CANTIDAD DE LIKES QUEE TIENE EL USUARIO
                setLikes(data.user.likes.length)
                loadPublicaciones(userId); 
                loadProyectos(userId)     
            }
        })  
    };
    
    const likeHandler = () =>{

        likePerfil(dataUser.id, accessToken, user._id).then(data => {
            if(data.error){
                makeToast('error', data.error)
            } else if (data.mensaje === "like") {
                setLikes(likes +1)
            } else{
                setLikes(likes -1)
            }
        }) 
    }
    const HandleChange = (event, newValue) => {
        setValue(newValue);
      };
    
      const handleChangeIndex = (index) => {
        setValue(index);
      };
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box p={3}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      
      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
      };
      
      function a11yProps(index) {
        return {
          id: `full-width-tab-${index}`,
          'aria-controls': `full-width-tabpanel-${index}`,
        };
      }
      
      const useStyles = makeStyles((theme) => ({
        root: {
          backgroundColor: theme.palette.background.paper,
          width: '50%',
        },
          icon: {
            color: 'rgba(255, 255, 255, 0.54)',
          },
        root2: {
            maxWidth: 150,
        },
        media: {
            height: 140,
        },
        modal: {
            position: 'absolute',
            width: '80%',
            backgroundColor: 'white',
            padding: '16px 32px 24px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            overflow:'scroll',
            display:'block',
            maxHeight: 400,
        },
    }));
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    
    const abrirCerrarModal = () =>{
        setModal(!modal)
    }
    //Variable setea lo que se mostrara en el modal (Menu flotante)
    const body=(
        <Grid container spacing={3} className={classes.modal}
        justify="center"
        alignItems="center">
            <Grid xs={12} align="center">
                <Typography variant="h5">Comentarios</Typography>
            </Grid>
            <Grid item xs={12}>
            
        {/*COMENTARIOS*/}
        {/*INPUT PARA EL COMENTARIO*/}
        <div>
            <h4>Deja tu comentario</h4>
            <InputGroup className="mb-3">    
                <FormControl
                        placeholder="Inserte un comentario"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={comentario}
                        onChange={handleChange('comentario')}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-primary" onClick={clickComentario}>Comentar</Button>
                    </InputGroup.Append>
                </InputGroup>      
        </div>

        {/*COMENTARIOS*/}
        <h3>Comentarios</h3>
        {
            comentarios.map((comentario) => (
                <ListGroup>
                    <ListGroup.Item>
                
                        {/*CREADOR DEL COMENTARIO Y COMENTARIO*/}
                        <h4>{comentario.usuario.userName}</h4>
                        <p>{comentario.comentario}</p>

                        {/*BOTON DESPLEGABLE DE RESPONDER*/}
                        <Accordion>

                            {/*LINK DE RESPONDER*/}
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Responder
                            </Accordion.Toggle>

                            {/*INPUT DESPLEGABLE DE RESPONDER*/}
                            <Accordion.Collapse eventKey="0">
                                <div>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="Inserte un comentario"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            value={respuesta}
                                            onChange={handleChange("respuesta")}
                                        />
                                        <InputGroup.Append>
                                            <Button variant="outline-primary" onClick={() => (clickRespuesta(comentario._id))}>Responder</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>
                            </Accordion.Collapse>
                        

                        {/* VALIDACION DE ELIMINAR COMENTARIO (SOLO CREADOR COMENTARIO O DUEÑO DEL PERFIL) */}
                        {
                            comentario && ((comentario.usuario._id === dataUser.id) || (user._id === dataUser.id)) && 
                            
                            //BOTON DESPLEGABLE DE ELIMINAR
                            <div>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                Eliminar
                            </Accordion.Toggle>    
                            <Accordion.Collapse eventKey="1">
                                <button className="btn btn-outline-warning mt-2 mb-2" onClick={() => {
                                    eliminarComentario( comentario.usuario._id, comentario._id )
                                }}>
                                    Eliminar comentario
                                </button>
                            </Accordion.Collapse>
                            </div>
                            
                        }                                
                        </Accordion>
                        {/* RESPUESTAS DE LOS COMENTARIOS*/}
                        {
                            comentario.respuesta.map((respuesta) => (
                                <ListGroup>
                                    <ListGroup.Item>

                                        {/*CREADOR DE LA RESPUESTA Y LA RESPUESTA*/}
                                        <h4>{respuesta.usuario.userName}</h4>
                                        <p>{respuesta.respuesta}</p>

                                        {/* VALIDACION DE ELIMINAR RESPUESTA (SOLO CREADOR COMENTARIO O DUEÑO DEL PERFIL) */}
                                        {
                                            respuesta && ((respuesta.usuario._id === dataUser.id) || (user._id === dataUser.id)) && 
                                            
                                            //BOTON DESPLEGABLE DE ELIMINAR
                                            <Accordion> 
                                                <div>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                    Eliminar
                                                </Accordion.Toggle>    
                                                <Accordion.Collapse eventKey="1">
                                                    <button className="btn btn-outline-warning mt-2 mb-2" onClick={() => eliminarRespuesta( respuesta.usuario._id, comentario._id, respuesta._id )}>
                                                        Eliminar respuesta
                                                    </button>
                                                </Accordion.Collapse>
                                                </div>
                                            </Accordion>
                                        } 
                                    </ListGroup.Item>
                                </ListGroup>
                            ))
                        }
                    </ListGroup.Item>
                </ListGroup>
            ))} 
            </Grid>
        </Grid>
        
    )
        
    // const mostrarComentarios = () => {
        
    // }  
    useEffect (() => {
        init(match.params.userId);
        
    }, []); 
    
    return (
        <Layout title="Home Page" description="Aplicacion Inkapp para tatuadores." className="container-fluid"> 
        <Grid container spacing={3} justify="center" alignContent="center" alignItems="center" style={{marginTop: 10}}>
        <Grid item xs={12}> 
        <div align="center">
            <ShowAvatarProfile image={user} url="perfil"/>
        </div>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="h5" component="h2" align="center">{user.userName}
            {/* BOTON DE LIKES SI USUARIO INGRESA UN LIKE SE SUMA, SI REPITE EL LIKE SE RESTA */}
                <IconButton aria-label="add to favorites" onClick={likeHandler}>
                    <FavoriteIcon />
                    {likes}
                </IconButton>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" align="center">{
                user.tipo === 1 ? ('Tatuador') : ('Cliente')
                }
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" align="center">{user.edad} años</Typography>
            <Typography variant="body2" color="textSecondary" component="p" align="center"><Email fontSize="small"/> {user.email}</Typography>
            {/* <Typography variant="body2" color="textSecondary" component="p" align="center"> {user.region.nombre}</Typography> */}
            <Grid item xs={12} alignItems="center"> 
            {/* EVALUA QUE EL USUARIO SEA UN TATUADOR PARA QUE APAREZCA EL BOTÓN DE VER AGENDA */}
            {
                
                ((user.tipo === 1) && (match.params.userId !== dataUser.id))? (
                    <div align="center">
                    <Link to={`/profile/agenda/${user._id}`}> 
                        <Button color="primary" fontSize="small"><Today/> Ver agenda</Button> 
                    </Link>
                    </div>
                ) : (
                <p></p>
                )
            }
            </Grid> 
        </Grid>
        <div className={classes.root}>
        <AppBar position="static" color="default">
            <Tabs
            value={value}
            onChange={HandleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            >
                
            <Tab icon={<ColorLens/>} label="Publicaciones" {...a11yProps(0)} />
            <Tab icon={<Camera/>} label="Proyectos" {...a11yProps(1)} />
            <Tab icon={<QuestionAnswer/>} label="Comentarios"  onClick={() => abrirCerrarModal()} /> 
            {/* <Tab icon={<QuestionAnswer/>}label="Comentarios" {...a11yProps(2)} /> */}
            </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
            <TabPanel value={value} index={0} dir={theme.direction}>
                <Grid container spacing={0.5} justify="center" alignContent="center" direction="row">
                    <GridList cellHeight="200" cols={3} style={{width: 800, height: 600}}>
                    
                        {publicaciones.map((publicacion) => (
                        <GridListTile key={publicacion._id} cols={1}>
                            <Link to={`/profile/publication/view/${publicacion._id}`}> 
                                <ShowImage image={publicacion} url="publicacion"></ShowImage>
                            </Link>
                        </GridListTile>
                        ))}
                    </GridList>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
            <Grid spacing={1} container justify="center" alignContent="center">
                { proyectos.map((proyectos, i) => (
                    dataUser.id === match.params.userId ? (
                        <CardMyProject key={i} project={proyectos}/>
                    ) : (
                        <CardProject key={i} project={proyectos}/>
                    )
                ))}
                
            </Grid>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
            
            </TabPanel>
        </SwipeableViews>
        </div>
        <Grid item xs={12} align="center" >
            <Modal
            open={modal}
            onClose={abrirCerrarModal}
            >
                {body}
            </Modal>
        </Grid>
        </Grid>
        </Layout>
    );
};

export default Profile;
