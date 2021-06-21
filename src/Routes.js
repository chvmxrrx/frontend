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
import AddParte from './admin/AddParte';
import AddEstado from './admin/AddEstado';
import AddEstiloTatuaje from './admin/AddEstiloTatuaje';
import Profile from './user/Profile';
import createPublicacion from './user/Publicacion';
import ManageRegion from './admin/ManageRegion';
import ManageParte from './admin/ManageParte';
import ManageEstado from './admin/ManageEstado';
import ManageEstilo from './admin/ManageEstilo';
import UpdateRegion from './admin/updateRegion';
import UpdateParte from './admin/updateParte';
import UpdateEstilo from './admin/updateEstilo';
import UpdateEstado from './admin/updateEstado';
import PublicacionPage from './core/PublicacionPage';
import MyProfile from './core/MyProfile';
import ChatroomPage from './chat/ChatroomPage';
import ChatroomsMenuPage from './chat/ChatroomsMenuPage';
import Proyecto from './user/Proyecto'
import MisProyectos from './user/Misproyectos';
import ProjectsOffers from './user/ProjectsOfferts';
import DoOffer from './user/DoOffer'
import AllProjects from './user/AllProjects'
import MyOffers from './user/MyOffers'
import { io } from 'socket.io-client';
import { isAuthenticated } from './auth';
import RespuestaOferta from './user/RespuestaOferta';
import UpdateProject from './user/UpdateProject';
import DoReserve from './user/DoReserve';


const Routes = () => {

    const [socket, setSocket] = React.useState(null) 
  
    const setupSocket = () =>{
    
    const {accessToken} = isAuthenticated()
    if(accessToken && !socket){
      const newSocket = io('http://localhost:4000', {
        query: {
            token: accessToken
        }
    })

    newSocket.on('disconnect', () => {
      setSocket(null)
      setTimeout(setupSocket, 3000)
      
    })

    newSocket.on('connect', () => {
      
    })

    setSocket(newSocket)
    }
  }

  React.useEffect(() => {
    setupSocket()
    //eslint-disable-next-line
  }, [])
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/singin" exact component={Singin}/>
                <Route path="/singup" exact component={Singup}/>
                <Route path='/chatroomsmenu' 
                render={ () => <ChatroomsMenuPage setupSocket={setupSocket} exact/>} 
                />
                <Route path='/chatroom/:id'
                render = {() => <ChatroomPage socket={socket} exact/>}
                 /> 

                <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                <PrivateRoute path="/myprofile/:userId" exact component={MyProfile} />

                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/region" exact component={AddRegion} />
                <AdminRoute path="/manage/region" exact component={ManageRegion} />
                <AdminRoute path="/manage/region/update/:regionId" exact component={UpdateRegion} />
                <AdminRoute path="/create/parte" exact component={AddParte} />
                <AdminRoute path="/manage/parte" exact component={ManageParte} />
                <AdminRoute path="/manage/parte/update/:parteId" exact component={UpdateParte} />
                <AdminRoute path="/create/estado" exact component={AddEstado} />
                <AdminRoute path="/manage/estado" exact component={ManageEstado} />
                <AdminRoute path="/manage/estado/update/:estadoId" exact component={UpdateEstado} />
                <AdminRoute path="/create/estiloTatuaje" exact component={AddEstiloTatuaje} />
                <AdminRoute path="/manage/estiloTatuaje" exact component={ManageEstilo} />
                <AdminRoute path="/manage/estiloTatuaje/update/:estiloId" exact component={UpdateEstilo} />

                <PrivateRoute path="/profile/:userId" exact component={Profile} />
                <PrivateRoute path="/profile/publication/create/:userId" exact component={createPublicacion} />
                <PrivateRoute path="/profile/publication/view/:publicacionId" exact component={PublicacionPage} />
                <PrivateRoute path="/profile/project/create/:userId" exact component={Proyecto} />
                <PrivateRoute path="/profile/project/update/:projectId" exact component={UpdateProject} />
                <PrivateRoute path="/profile/myprojects/:userId" exact component={MisProyectos} />
                <PrivateRoute path="/profile/project/offerts/:projectId" exact component={ProjectsOffers} />
                <PrivateRoute path="/profile/project/projects/list" exact component={AllProjects} />
                <PrivateRoute path="/profile/project/doOffert/:projectId" exact component={DoOffer} />
                <PrivateRoute path="/profile/project/doOffert/:projectId/:offerId/:response"
                exact component={RespuestaOferta} />
                <PrivateRoute path="/profile/offers/myoffers/:userId" exact component={MyOffers} />
                <PrivateRoute path="/profile/do-reserve/:userId" exact component={DoReserve} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;