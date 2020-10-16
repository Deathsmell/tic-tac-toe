import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Alert} from "./components/Alert";
import Navbar from "./components/Navbar";
import {useAuth} from "./hooks/auth.hook";
import {useRoutes} from "./routes";
import {AlertState} from "./context/alert/AlertState";
import {AuthContext} from "./context/auth/AuthContext";
import {WebSocketContext} from "./context/websocket/WebSocketContext";
import useWebSocket from "./hooks/ws.hook";

export default () => {
    const {
        isAuthenticated,
        logout,
        login,
        registration,
        username
    } = useAuth();
    const routes = useRoutes(isAuthenticated);
    const webSocket = useWebSocket(isAuthenticated);


    return (
        <AlertState>
            <AuthContext.Provider value={{isAuthenticated, login, logout, registration, username}}>
                <WebSocketContext.Provider value={webSocket}>
                <BrowserRouter>
                    {isAuthenticated && <Navbar/>}
                    <div className={isAuthenticated ? "container pt-3" : "h-100"}>
                        <Alert/>
                        <div className={isAuthenticated ? "container pt-5" : "h-100"}>
                            {routes}
                        </div>
                    </div>
                </BrowserRouter>
                </WebSocketContext.Provider>
            </AuthContext.Provider>
        </AlertState>

    )
}
