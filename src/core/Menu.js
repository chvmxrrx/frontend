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
                                <NavDropdown.Item href={`/profile/edit/${isAuthenticated().dataUser.id}`}>Editar mi cuenta</NavDropdown.Item>
                                <NavDropdown.Item onClick={() =>
                                singout(() => {
                                    history.push('/');
                                })}>Cerrar Sesión
                                </NavDropdown.Item>
                            </NavDropdown>
                            
                            <NavDropdown title={<List/>} >
                                <NavDropdown.Item href={`/profile/publication/create/${isAuthenticated().dataUser.id}`}>Crear Publicación</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={`/profile/project/create/${isAuthenticated().dataUser.id}`}>Crear proyecto</NavDropdown.Item>
                                <NavDropdown.Item href="/profile/myprojects/id">Mis Proyectos</NavDropdown.Item>
                                <NavDropdown.Item href="/profile/offers/myoffers/id">Mis Ofertas</NavDropdown.Item>
                                <NavDropdown.Item href={`/profile/project/projects/list`}>Proyectos Inkapp</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/profile/offers/myoffers/id">Ofertas de reservas</NavDropdown.Item>
                                {
                                    ( isAuthenticated().dataUser.tipo === 1) ? 
                                    <NavDropdown.Item href={`/profile/do-reserve/${isAuthenticated().dataUser.id}`}>Administrar agenda</NavDropdown.Item>
                                      : <p></p>
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
