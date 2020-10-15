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
                    localStorage.setItem("username",res.body)
                })
                .catch(console.error)
        }
    }, [isAuthenticated])


    const login = useCallback(async ({username, password}) => {
        let formData = new FormData;
        formData.set('username', username)
        formData.set('password', password)
        const response = await request('/login', 'post', formData)
        if (response && response.status === 200) {
            setAuthenticate(true)
        }
        return response
    }, [])

    const logout = useCallback(async () => {
        await request("/logout", 'post')
        setAuthenticate(false)
    }, [])

    const registration = useCallback(async ({username, password}) => {
        const response = await request('/registration', 'post', {username, password})
        return response
    }, [])

    return {registration, login, logout, isAuthenticated}

}