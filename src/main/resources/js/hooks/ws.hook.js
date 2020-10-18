import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {useEffect, useState} from "react";

const useWebSocket = (isAuthenticated) => {

    const [stompClient, setStompClient] = useState(null)
    const [hasConnect, setHasConnect] = useState(false)
    let handlers = []

    useEffect(() => {
        if (isAuthenticated) connect()
    }, [isAuthenticated])

    useEffect(() => {
        if (stompClient) {
            setTimeout(() => setHasConnect(true), 1000)
        } else {
            setHasConnect(false)
        }
    }, [stompClient])

    const connect = () => {
        const stomp = Stomp.over(new SockJS('/game-tic-tac-toe'));
        stomp.connect(localStorage.getItem('username'), frame => console.log(frame))
        setStompClient(stomp)
    }

    const addHandler = handler => handlers.push(handler)

    const responseHandler = (iMassage) => {
        handlers.forEach(handler => {
            console.log("HANDLER: ", iMassage, handler)
            handler(iMassage)
        })
    }

    const subscribe = (topic) => {
        console.log(stompClient, 'sub')
        if (hasConnect) {
            return stompClient.subscribe(topic, responseHandler);
        }
    }

    const sendMessage = (to, message = "") => {
        message = typeof message === "string" ? "" : JSON.stringify(message)
        stompClient.send(`/app${to}`, {}, message)
    }

    const disconnect = () => {
        if (stompClient !== null) {
            stompClient.disconnect()
            console.log("Disconnected")
        } else {
            console.log("Stomp client dont exist!")
        }
    }

    return {connect, disconnect, subscribe, sendMessage, addHandler, hasConnect}
}

export default useWebSocket