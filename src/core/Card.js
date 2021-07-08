import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from '@material-ui/core/Grid';
import { likePublicacion } from '../user/apiUser';
import { isAuthenticated } from '../auth';
import makeToast from '../Toaster/Toaster';
import { Button } from '@material-ui/core';
import ShowImage from './showImage';
import { API } from '../config'
import moment from "moment";
import { Link } from "react-router-dom";
import ShowAvatar from "./showAvatar";


const useStyles = makeStyles((theme) => ({

      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardContent: {
        flexGrow: 1,
      },
}));

const CardHome = ({ publicacion }) => {
    const classes = useStyles();
    const { dataUser, accessToken } = isAuthenticated()
    const [likes, setLikes] = useState(publicacion.likes.length);
    const likeHandler = () => {
        likePublicacion(dataUser.id, accessToken, publicacion._id).then(data => {
            if (data.error) {
                makeToast('error', data.error)
            } else if (data.mensaje === "like") {
                setLikes(likes + 1)
            } else {
                setLikes(likes - 1)
            }
        })
    }

    return (
        <Grid item key={publicacion} xs={12} sm={6} md={4} className={classes.cardGrid}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <ShowAvatar image={publicacion.creador} url="perfil"/>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={ 
                    dataUser ? (
                        <Link to={`/profile/${publicacion.creador._id}`}>
                            {publicacion.creador.userName}
                        </Link>
                    ) : (
                        publicacion.creador.userName
                    )
                        
                    }
                    subheader={moment(publicacion.createdAt).fromNow()}
                />
                <ShowImage image={publicacion} url="publicacion"/>
                <CardContent className={classes.cardContent}>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {publicacion.nombre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {publicacion.descripcion}
                    </Typography>
                    <Typography variant="body3" color="textSecondary" component="p">
                        Estilo del tatuaje/diseño: {publicacion.estiloTatuaje.nombre}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                   { dataUser ? (
                        <Grid>  
                            <IconButton fontSize="small" aria-label="add to favorites" style={{color:'red'}} onClick={likeHandler}>
                                <FavoriteIcon /> 
                            </IconButton>
                            {likes}
                        </Grid> 
                    ) : (
                        <Grid>  
                            <IconButton fontSize="small" aria-label="add to favorites" style={{color:'red'}} onClick={()=> {makeToast('error', 'Necesitas logearte')}}>
                                <FavoriteIcon />
                            </IconButton>
                            {likes}
                        </Grid> 
                    )
                    }
                </CardActions>
            </Card>
        </Grid>
    );
}

export default CardHome;