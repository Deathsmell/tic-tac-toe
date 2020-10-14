import {useCallback, useEffect, useState,} from 'react'
import useHttp from "./http.hook";


export const useAuth = () => {

    const {request} = useHttp()
    const [isAuthenticated, setAuthenticate] = useState(false)

    useEffect(() => {
        if (!isAuthenticated) {
            request('/auth')
                .then(res => {
                    res && res.status === 200 && setAuthenticate(true)
                })
                .catch(console.error)
        }
    }, [isAuthenticated])

    const login = useCallback(async ({username, password}) => {
        let formData = new FormData;
        formData.set('username', username)
        formData.set('password', password)
        const response = await request('/login', 'post', formData)
        setAuthenticate(() => response.status === 200)
    }, [])

    const logout = useCallback(async () => {
        await request("/logout", 'post')
        setAuthenticate(false)
    }, [])

    const registration = useCallback(async ({username, password}) => {
        await request('/registration', 'post', {username, password})
    }, [])

    return {registration, login, logout, isAuthenticated}

}