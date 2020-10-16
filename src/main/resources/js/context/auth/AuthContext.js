import {createContext} from 'react'

export const AuthContext = createContext({
    registration: () => {},
    login: () => {},
    logout: () => {},
    username: '',
    isAuthenticated: false
})