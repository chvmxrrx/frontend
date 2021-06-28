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
import { Favorite } from '@material-ui/icons';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Button } from '@material-ui/core';
import ShowImage from './showImage';
import { API } from '../config'


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    avatar: {
        backgroundColor: red[500]
    }
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
        <Grid item xs={12}>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            U
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={publicacion.creador.userName}
                    subheader={publicacion.createdAt}
                />
                <CardMedia/>
                <ShowImage image={publicacion} url="publicacion"/>
                <CardContent>
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
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default CardHome;