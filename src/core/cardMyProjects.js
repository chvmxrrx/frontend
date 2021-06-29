import React from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './showImage'
import { deleteProject } from '../user/apiUser'
import { isAuthenticated } from '../auth'
import Swal from 'sweetalert2'
import moment from 'moment'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Button, makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { Badge } from 'react-bootstrap'

const CardMyProject = ({ project }) => {
    const {dataUser, accessToken} = isAuthenticated()
    const useStyles = makeStyles({
        root: {
          minWidth: 275,
        },
        title: {
          fontSize: 14,
        },
        pos: {
          marginTop: 12,
          marginBottom: 12,
        },
      });
    const classes = makeStyles()
    const clickSubmit = event => {
        
            event.preventDefault()
            Swal.fire({
                title: `¿Estas seguro?`,
                text: `No podrás recuperar tu proyecto: ${project.nombre}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!'
              }).then((result) => {
                if (result.isConfirmed) {
                    deleteProject(dataUser.id, accessToken, project._id).then((data)=> {
                        if(data.error){
                            Swal.fire(
                                'Error!',
                                data.error,
                                'error'
                              )
                        }else {
                            window.location.reload()
                        }
                    })
                }
              })
        }
    return ( 
        <Grid item xs={3}>
            <Card>
                <Typography gutterBottom variant="h5" component="h2" align="center">
                    {project.nombre}
                </Typography>
                <CardMedia />
                <ShowImage image={project} url="proyecto" />
                <CardContent>
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
                    <Link to={`/profile/project/update/${project._id}`}>
                        <Button variant="outlined" color="primary">
                            Modificar proyecto
                        </Button>
                    </Link>
                    <Button variant="outlined" color="secondary" onClick={clickSubmit}>
                        Eliminar proyecto
                    </Button>
                    <Link to={`/profile/project/offers/${project._id}`}>
                            <Button variant="outlined" color="dafault">
                                Ver ofertas
                            </Button>
                    </Link>
                    </Grid>
                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                        <AccessTimeIcon color="action" fontSize="small"/> {moment(project.createdAt).fromNow()}
                    </Typography>
                </CardContent>
        
            </Card>
        </Grid>
        
        )
}
export default CardMyProject