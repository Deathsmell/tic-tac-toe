import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import AuthPage from "./pages/AuthPage";
import RoomsList from "./pages/RoomsList";
import {AlertState} from './context/alert/AlertState'
import {Alert} from "./components/Alert";

export default () => {
    return (
        <AlertState>
            <BrowserRouter>
                <Alert/>
                <div className="container pt-4">
                    <Switch>
                        <Route path={"/"} component={RoomsList}/>
                        {/*<Route path={"/"} component={AuthPage}/>*/}
                    </Switch>
                </div>
            </BrowserRouter>
        </AlertState>
    )
}
