import {createContext} from 'react'

export const AuthContext = createContext({
    registration: () => {},
    login: () => {},
    logout: () => {},
    isAuthenticated: false
})