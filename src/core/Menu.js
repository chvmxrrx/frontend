import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { singout, isAuthenticated } from './../auth/index';
import { Navbar, Nav, NavDropdown, ToggleButton } from 'react-bootstrap';
import logo from '../assets/images/InkappLogo.jpeg';
import { ExitToApp, List, Star } from '@material-ui/icons';
import makeToast from '../Toaster/Toaster';

const Menu = ({ history }) => (


    <div>
        <Navbar expand="lg" style={{ backgroundColor: 'black', color: 'white' }} variant="dark">
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src={logo}
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    style={{ marginLeft: 10 }}
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


                    {isAuthenticated() && (
                        <Fragment>
                            <Nav.Link href="/chatroomsmenu">Publicaciones</Nav.Link>
                            <Nav.Link href="/profile/project/projects/list">Proyectos</Nav.Link>
                            {
                                isAuthenticated().dataUser.membresia === true || isAuthenticated().dataUser.tipo === 0 ? (
                                    <Nav.Link href="/chatroomsmenu">Chatrooms</Nav.Link>
                                ) : (
                                    <Nav.Link onClick={makeToast('error', 'Debes adquirir una membresía')}>Chatrooms</Nav.Link>
                                )
                            }
                        </Fragment>
                    )}
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                {isAuthenticated() && (
                    <div>

                        <Nav >
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
                            <NavDropdown title="Mi cuenta" >
                                <NavDropdown.Item href={`/profile/${isAuthenticated().dataUser.id}`}>Mi Perfil</NavDropdown.Item>
                                <NavDropdown.Item href={`/myaccount/manage/${isAuthenticated().dataUser.id}`}>Editar mi cuenta</NavDropdown.Item>
                                {
                                    (isAuthenticated().dataUser.membresia === true) ? (
                                        <NavDropdown.Item> <Star style={{ color: 'orange' }} />Miembro VIP</NavDropdown.Item>
                                    ) : (
                                        isAuthenticated().dataUser.tipo === 1 && isAuthenticated().dataUser.tipo === 1 ? (
                                            <NavDropdown.Item href={`/profile/pagos/${isAuthenticated().dataUser.id}`}>Hacerme vip</NavDropdown.Item>
                                        ) : null
                                    )
                                }

                            </NavDropdown>

                            {
                                (isAuthenticated().dataUser.tipo === 1 || isAuthenticated().dataUser.tipo === 2) && (
                                    <NavDropdown title={<List />} id="collasible-nav-dropdown">
                                        <NavDropdown.Item href={`/profile/publication/create/${isAuthenticated().dataUser.id}`}>Crear Publicación</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        {isAuthenticated().dataUser.membresia === true || isAuthenticated().dataUser.tipo === 0 ? (
                                            <NavDropdown.Item href={`/profile/project/create/${isAuthenticated().dataUser.id}`}>Crear proyecto</NavDropdown.Item>
                                        ) : (
                                            <NavDropdown.Item onClick={() => makeToast('error', 'Debes adquirir una membresía')}>Crear proyecto</NavDropdown.Item>
                                        )}

                                        <NavDropdown.Item href={`/profile/myprojects/${isAuthenticated().dataUser.id}`}>Mis Proyectos</NavDropdown.Item>
                                        <NavDropdown.Item href={`/profile/offers/myoffers/${isAuthenticated().dataUser.id}`}>Mis Ofertas</NavDropdown.Item>
                                        <NavDropdown.Item href={`/profile/project/projects/list`}>Proyectos Inkapp</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href={`/profile/reserve/myoffers/${isAuthenticated().dataUser.id}`}>Ofertas de reservas</NavDropdown.Item>
                                        {
                                            (isAuthenticated().dataUser.tipo === 1) ? (
                                                isAuthenticated().dataUser.membresia === true ? (
                                                    <NavDropdown.Item href={`/profile/do-reserve/${isAuthenticated().dataUser.id}`}>
                                                        Administrar agenda
                                                    </NavDropdown.Item>
                                                ) : (
                                                    <NavDropdown.Item onClick={() => makeToast('error', 'Debes adquirir una membresía')}>
                                                        Administrar agenda
                                                    </NavDropdown.Item>
                                                )

                                            ) : null

                                        }
                                    </NavDropdown>
                                )
                            }


                            <Nav.Link onClick={() =>
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
