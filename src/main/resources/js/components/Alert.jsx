import React, {useContext, useState} from 'react'
import {CSSTransition} from 'react-transition-group'
import {AlertContext} from '../context/alert/AlertContext'
import {Redirect} from "react-router-dom"

export const Alert = () => {
    const col = 'col-xl-8 col-lg-10 col-md-12 col-sm-12'
    const {alert, hide} = useContext(AlertContext)
    const [redirect, setRedirect] = useState(false);

    const hideProxyHandler = () => {
        console.log(alert.redirect, "hide proxy")
        if (alert.redirect) {
            setRedirect(true)
        }
        hide()
    }

    return (
        <CSSTransition
            in={alert.visible}
            timeout={{
                enter: 500,
                exit: 350
            }}
            classNames={'alert'}
            mountOnEnter
            unmountOnExit
        >
            <div className="row justify-content-center">
                {redirect && <Redirect to={'/list'}/> }
                <div className={`${col} alert alert-${alert.type || 'warning'} alert-dismissible`}>
                    <strong>{alert.type && alert.type.toUpperCase() || ''}!</strong>
                    &nbsp;{alert.text}
                    <button onClick={hideProxyHandler} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </CSSTransition>
    )
}