import {createContext} from 'react'

export const RoomContext = createContext({
    board:[[],[],[]],
    hash: '',
    joined: false,
    uuid: ''
})