import React from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './showImage'
import moment from 'moment'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { isAuthenticated } from '../auth';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import ShowAvatar from './showAvatar';
const CardProject = ({ project }) => {
    const {dataUser} = isAuthenticated()
    const useStyles = makeStyles({
        root: {
          maxWidth: 345,
        },
      });
    const classes = useStyles();
    return ( 
        
        <Grid item xs={3}>
            <Card className={classes.root}>
            <CardHeader
                    avatar={
                        <Link to={`/profile/${project.creador._id}`}>
                            <ShowAvatar image={project.creador} url="perfil"/>
                        </Link>
                    }
                    title={ 
                        project.creador.userName  
                    }
                    subheader={
                        moment(project.createdAt).fromNow()
                    }
                />
                <CardMedia/>
                <CardMedia />
                <ShowImage image={project} url="proyecto" />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2" align="center">
                            {project.nombre}
                        </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                        {project.descripcion}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                        Tamaño: {project.tamaño}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                        Parte seleccionada: {project.parteCuerpo.nombre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                        Estilo: {project.estiloTatuaje.nombre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                        {project.estado.nombre}
                    </Typography>
                    <Grid item xs={12} align="center">
                    <Button size="small" color="primary">
                        {
                            (project.estado.nombre === "Terminado" || project.creador._id === dataUser.id)  ? (
                                <div></div>
                            ) : (
                                <Link to={`/profile/project/doOffer/${project._id}`}>
                                    <button className="btn btn-outline-warning mt-2 mb-2">
                                        Realizar oferta
                                    </button>
                                </Link>
                            )
                        }    
                    </Button>
                    </Grid>
                </CardContent>
        
            </Card>
        </Grid>
        )
}

export default CardProject