import React, {Fragment} from 'react';
import { withRouter } from 'react-router-dom';
import { singout, isAuthenticated } from './../auth/index';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../assets/images/InkappLogo.jpeg';

const Menu = ({ history }) => (

    <div>
        <Navbar expand="lg" bg="dark" variant="dark">
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
                    <Nav.Link href="/">Home</Nav.Link>
                    {!isAuthenticated() && (
                        <Fragment>
                            <Nav.Link href="/signin">Iniciar Sesión</Nav.Link>
                            <Nav.Link href="/signup">Registrarse</Nav.Link>
                        </Fragment>
                    )}
                    {isAuthenticated() && (isAuthenticated().dataUser.tipo === 1 || isAuthenticated().dataUser.tipo === 2) && (
                        <Fragment>
                            <Nav.Link href="/user/dashboard">Dashboard</Nav.Link>
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
                                <NavDropdown.Item href={`/profile/publication/create/${isAuthenticated().dataUser.id}`}>Crear Publicación</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/profile/myprojects/id">Mis Proyectos</NavDropdown.Item>
                                <NavDropdown.Item href="/profile/offers/myoffers/id">Mis Ofertas</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">Editar mi cuenta</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link  onClick={() =>
                                singout(() => {
                                    history.push('/');
                                })}>
                                    Cerrar Sesión
                            </Nav.Link>
                        </Nav>
                    </div>
                )}  

                </Navbar.Collapse>
                
            
            
            
                
            
        </Navbar>
    </div>

);

export default withRouter(Menu);
