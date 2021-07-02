import React, {Fragment} from 'react';
import { withRouter } from 'react-router-dom';
import { singout, isAuthenticated } from './../auth/index';
import { Navbar, Nav, NavDropdown, ToggleButton } from 'react-bootstrap';
import logo from '../assets/images/InkappLogo.jpeg';
import { ExitToApp, List } from '@material-ui/icons';

<style>
.dropdown-toggle::after 
    display:none
</style>
const Menu = ({ history }) => (
    
    
    <div>
        <Navbar expand="lg" style={{backgroundColor:'black', color: 'white'}}  variant="dark">
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src={logo}
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    style={{marginLeft: 10}}
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Página principal</Nav.Link>
                    {!isAuthenticated() && (
                        <Fragment>
                            <Nav.Link href="/signin">Iniciar Sesión</Nav.Link>
                            <Nav.Link href="/signup">Registrarse</Nav.Link>
                        </Fragment>
                    )}
                    {isAuthenticated() && (isAuthenticated().dataUser.tipo === 1 || isAuthenticated().dataUser.tipo === 2) && (
                        <Fragment>
                            <Nav.Link href="/chatroomsmenu">Explorar publicaciones</Nav.Link>
                            <Nav.Link href="/profile/project/projects/list">Proyectos Inkapp</Nav.Link>
                            <Nav.Link href="/chatroomsmenu">Chatrooms</Nav.Link>
                        </Fragment>
                    )}  
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                      {isAuthenticated() && (
                    <div>
                        
                        <Nav >
                        
                            <NavDropdown title="Mi cuenta" >
    
                                <NavDropdown.Item href={`/profile/${isAuthenticated().dataUser.id}`}>Mi Perfil</NavDropdown.Item>
                                <NavDropdown.Item href={`/myaccount/manage/${isAuthenticated().dataUser.id}`}>Editar mi cuenta</NavDropdown.Item>
                            </NavDropdown >

                            {
                                (isAuthenticated().dataUser.tipo === 0) && (
                                    <NavDropdown title="Administrar">
                                        <NavDropdown.Item href={`/manage/region`}>Administrar regiones</NavDropdown.Item>
                                        <NavDropdown.Item href={`/manage/estado`}>Administrar estados</NavDropdown.Item>
                                        <NavDropdown.Item href={`/manage/parte`}>Administrar partes del cuerpo</NavDropdown.Item>
                                        <NavDropdown.Item href={`/manage/estiloTatuaje`}>Administrar estilos de tatuaje</NavDropdown.Item>
                                    </NavDropdown>
                                )
                            }
                            
                            <NavDropdown title={<List/>} id="collasible-nav-dropdown">
                                <NavDropdown.Item href={`/profile/publication/create/${isAuthenticated().dataUser.id}`}>Crear Publicación</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={`/profile/project/create/${isAuthenticated().dataUser.id}`}>Crear proyecto</NavDropdown.Item>
                                <NavDropdown.Item href={`/profile/myprojects/${isAuthenticated().dataUser.id}`}>Mis Proyectos</NavDropdown.Item>
                                <NavDropdown.Item href={`/profile/offers/myoffers/${isAuthenticated().dataUser.id}`}>Mis Ofertas</NavDropdown.Item>
                                <NavDropdown.Item href={`/profile/project/projects/list`}>Proyectos Inkapp</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={`/profile/offers/myoffers/${isAuthenticated().dataUser.id}`}>Ofertas de reservas</NavDropdown.Item>
                                {
                                    ( isAuthenticated().dataUser.tipo === 1) && (
                                        <NavDropdown.Item href={`/profile/do-reserve/${isAuthenticated().dataUser.id}`}>Administrar agenda</NavDropdown.Item>
                                    ) 
                                }
                            </NavDropdown>
                            
                            <Nav.Link  onClick={() =>
                                singout(() => {
                                    history.push('/');
                                })}>
                            Cerrar sesión<ExitToApp />    
                            
                            </Nav.Link>
                        </Nav>
                    </div>
                )}  

                </Navbar.Collapse>
                
            
            
            
                
            
        </Navbar>
    </div>

);

export default withRouter(Menu);
