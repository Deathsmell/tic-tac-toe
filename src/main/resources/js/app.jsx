import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import AuthPage from "./pages/AuthPage";
import RoomsList from "./pages/RoomsList";
import Room from "./pages/Room";
import {AlertState} from './context/alert/AlertState'
import {Alert} from "./components/Alert";
import Navbar from "./components/Navbar";

export default () => {
    return (
        <AlertState>
            <BrowserRouter>
                <Navbar/>
                <div className="container pt-4">
                    <Alert/>
                    <div className="container pt-5 ">
                        <Switch>
                            <Route path={"/"} component={Room}/>
                            {/*<Route path={"/"} component={RoomsList}/>*/}
                            {/*<Route path={"/"} component={AuthPage}/>*/}
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </AlertState>
    )
}
