import {useCallback, useState} from 'react'
import axios from 'axios'

const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'get', data = null, headers = {}) => {
        setLoading(true)

        try {
            const response = await axios({
                method,
                url,
                data,
                baseUrl: 'http://localhost:8080',
                headers,
            });

            if (response.status === 200) {
                console.log("OK", response.data.message || "Success")
            } else {
                console.error("Not OK", response.data.message)
            }
            setLoading(false)

        } catch (e) {
            const errorMessage = e.response.data.message;
            setError(errorMessage)
            console.error('Error response:', errorMessage)
        }

    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, error, request, clearError}
}

export default useHttp