import React, {useContext} from 'react'
import {CSSTransition} from 'react-transition-group'
import {AlertContext} from '../context/alert/AlertContext'

export const Alert = () => {
    const col = 'col-xl-8 col-lg-10 col-md-12 col-sm-12'
    const {alert, hide} = useContext(AlertContext)

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
                <div className={`${col} alert alert-${alert.type || 'warning'} alert-dismissible`}>
                    <strong>Внимание!</strong>
                    &nbsp;{alert.text}
                    <button onClick={hide} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </CSSTransition>
    )
}