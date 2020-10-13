import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import AuthPage from "./pages/AuthPage";
import {AlertState} from './context/alert/AlertState'
import {Alert} from "./components/Alert";

export default () => {
    return (
        <AlertState>
            <BrowserRouter>
                <Alert/>
                <Switch>
                    <Route path={"*"} component={AuthPage}/>
                </Switch>
            </BrowserRouter>
        </AlertState>
    )
}
