import React from "react"
import {Route, Switch, Redirect} from "react-router-dom"
import AuthPage from "./pages/AuthPage"
import Room from "./pages/Room";
import RoomsList from "./pages/RoomsList";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path={"/game/:uuid"} component={Room}/>
                <Route path={"/list"} component={RoomsList}/>
                <Route path="/">
                    <Redirect to="/list"/>
                </Route>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path={"/login"} component={AuthPage}/>
                <Route path="*">
                    <Redirect to="/login"/>
                </Route>
            </Switch>
        )
    }
}