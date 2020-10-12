import React from "react";
import ReactDOM from "react-dom";
import {transitions, positions, Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from "./app";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

const options = {
    position: positions.TOP_CENTER,
    timeout: 3000,
    offset: '30px',
    transition: transitions.SCALE
}

const Root = (
    <AlertProvider template={AlertTemplate} {...options}>
        <App/>
    </AlertProvider>
)
ReactDOM.render(
    Root,
    document.querySelector("#root"));