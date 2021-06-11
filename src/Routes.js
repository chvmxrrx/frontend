import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Singup from './user/Singup';
import Singin from './user/Singin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import UserDashboard from './user/userDashboard';
import AdminDashboard from './user/adminDashboard';
import AddRegion from './admin/AddRegion';
import AddEstado from './admin/AddEstado';
import AddEstiloTatuaje from './admin/AddEstiloTatuaje';
import Profile from './user/Profile';
import Publicacion from './user/Publicacion';
import ManageRegion from './admin/ManageRegion';
import UpdateRegion from './admin/updateRegion';
import ManageEstado from './admin/ManageEstado';
import ManageEstilo from './admin/ManageEstilo';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/singin" exact component={Singin}/>
                <Route path="/singup" exact component={Singup}/>

                <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />

                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />

                <AdminRoute path="/create/region" exact component={AddRegion} />
                <AdminRoute path="/manage/region" exact component={ManageRegion} />
                <AdminRoute path="/manage/region/update/:regionId" exact component={UpdateRegion} />

                <AdminRoute path="/create/estado" exact component={AddEstado} />
                <AdminRoute path="/manage/estado" exact component={ManageEstado} />

                <AdminRoute path="/create/estiloTatuaje" exact component={AddEstiloTatuaje} />
                <AdminRoute path="/manage/estiloTatuaje" exact component={ManageEstilo} />

                <PrivateRoute path="/profile/:userId" exact component={Profile} />
                <PrivateRoute path="/profile/publication/create/:userId" exact component={Publicacion} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;