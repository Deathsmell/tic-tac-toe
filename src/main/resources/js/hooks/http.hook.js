import {useCallback, useState} from 'react'
import axios from 'axios'

const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'get', data = null, headers = {}, params) => {
        setLoading(true)
        let resultMessage = {status: 0, message: '', body: null}
        try {
            const response = await axios({
                method,
                url,
                data,
                baseUrl: 'http://localhost:8080',
                headers,
                params,
            });
            setLoading(false)
            resultMessage.status = response.status
            resultMessage.message = response.data.message || 'success actions'
            resultMessage.body = response.data
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