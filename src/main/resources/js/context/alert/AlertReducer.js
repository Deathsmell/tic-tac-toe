import {HIDE_ALERT, SHOW_ALERT,SHOW_END_GAME_ALERT} from '../types'

const handlers = {
    [SHOW_ALERT]: (state, {payload}) => ({...payload, redirect: false,visible: true}),
    [SHOW_END_GAME_ALERT]: (state, {payload}) => ({...payload, redirect: true,visible: true}),
    [HIDE_ALERT]: state => ({...state, visible: false}),
    DEFAULT: state => state
}

export const alertReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}