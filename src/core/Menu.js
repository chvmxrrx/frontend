import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { singout, isAuthenticated } from './../auth/index';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#FF9900" }
    } else {
        return { color: "#FFFFFF" }
    }
};

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav items">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    Home
                </Link>
            </li>

            {isAuthenticated() && isAuthenticated().dataUser.tipo === 0 && (
                <li className="nav items">
                <Link
                    className="nav-link"
                    style={isActive(history, "/admin/dashboard")}
                    to="/admin/dashboard"
                >
                    Dashboard
                </Link>
            </li>
            )}

            {isAuthenticated() && isAuthenticated().dataUser.tipo === 1 && (
                <li className="nav items">
                <Link
                    className="nav-link"
                    style={isActive(history, "/user/dashboard")}
                    to="/user/dashboard"
                >
                    Dashboard
                </Link>
            </li>
            )}
            
            {isAuthenticated() && isAuthenticated().dataUser.tipo === 2 && (
                <li className="nav items">
                <Link
                    className="nav-link"
                    style={isActive(history, "/user/dashboard")}
                    to="/user/dashboard"
                >
                    Dashboard
                </Link>
            </li>
            )}

            


            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav items">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/singin")}
                            to="/singin"
                        >
                            Iniciar Sesion
                        </Link>
                    </li>

                    <li className="nav items">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/singup")}
                            to="/singup"
                        >
                            Registrarse
                        </Link>
                    </li>

                </Fragment>
            )}

            {isAuthenticated() && (
                <li className="nav items">
                <span
                    className="nav-link"
                    style={{ cursor: 'pointer', color: '#ffffff' }}
                    onClick={() =>
                        singout(() => {
                            history.push('/');
                        })}
                >
                    Cerrar sesión
                </span>
            </li>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);
