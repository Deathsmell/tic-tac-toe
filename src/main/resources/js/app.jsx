import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Alert} from "./components/Alert";
import Navbar from "./components/Navbar";
import {useAuth} from "./hooks/auth.hook";
import {useRoutes} from "./routes";
import {AlertState} from "./context/alert/AlertState";
import {AuthContext} from "./context/auth/AuthContext";

export default () => {
    const {isAuthenticated, logout, login, registration} = useAuth();
    const routes = useRoutes(isAuthenticated);

    return (
        <AlertState>
            <AuthContext.Provider value={{isAuthenticated, login, logout, registration}}>
                <BrowserRouter>
                    {isAuthenticated && <Navbar/>}
                    <div className="container pt-4">
                        <Alert/>
                        <div className="container pt-5 ">
                            {routes}
                        </div>
                    </div>
                </BrowserRouter>
            </AuthContext.Provider>
        </AlertState>

    )
}
