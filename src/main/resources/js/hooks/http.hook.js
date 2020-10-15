import {useCallback, useState} from 'react'
import axios from 'axios'

const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'get', data = null, headers = {}) => {
        setLoading(true)
        let resultMessage = {status: 0, message: ''}
        try {
            const response = await axios({
                method,
                url,
                data,
                baseUrl: 'http://localhost:8080',
                headers,
            });
            setLoading(false)
            resultMessage.status = response.status
            resultMessage.message = response.data.message || 'success actions'
            return resultMessage
        } catch (e) {
            resultMessage.status = e.response.status
            resultMessage.message = e.response.data.message
            return resultMessage
        }

    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, error, request, clearError}
}

export default useHttp