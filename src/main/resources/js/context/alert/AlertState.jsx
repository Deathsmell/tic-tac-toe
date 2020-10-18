import React, {useReducer} from 'react'
import {AlertContext} from './AlertContext'
import {alertReducer} from './AlertReducer'
import {HIDE_ALERT, SHOW_ALERT,SHOW_END_GAME_ALERT} from '../types'

export const AlertState = ({children}) => {
    const [state, dispatch] = useReducer(alertReducer, {visible: false})

    const show = (text, type = 'warning') => {
        dispatch({
            type: SHOW_ALERT,
            payload: {text, type}
        })
    }

    const endGameAlert = (text, type = 'warning') => {
        dispatch({
            type: SHOW_END_GAME_ALERT,
            payload: {text,type, redirect: true}
        })
    }

    const hide = () => dispatch({type: HIDE_ALERT})

    const statusType = status => {
        if (status < 100) return 'info'
        if (status < 200) return 'success'
        if (status < 300) return 'success'
        if (status < 400) return 'warning'
        if (status < 500) return 'danger'
    }

    return (
        <AlertContext.Provider value={{
            show,
            endGameAlert,
            hide,
            alert: state,
            statusType,
        }}>
            {children}
        </AlertContext.Provider>
    )
}
