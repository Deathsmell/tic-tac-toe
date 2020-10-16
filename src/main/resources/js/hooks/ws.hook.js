import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {useEffect, useState} from "react";

const useWebSocket = (isAuthenticated) => {

    const [stompClient,setStompClient] = useState(null)
    let handlers = []

    useEffect(() => {
        if (isAuthenticated) connect()
    }, [isAuthenticated])

    const connect = () => {
        const stomp = Stomp.over(new SockJS('/game'));
        stomp.connect(localStorage.getItem('username'), frame => console.log(frame))
        setStompClient(stomp)
    }

    const addHandler = handler => handlers.push(handler)

    const responseHandler = (iMassage) => {
        handlers.forEach(handler => {
            console.log("HANDLER: ",iMassage,handler)
            handler(iMassage)
        })
    }

    const subscribe = (topic) => {
        console.log(stompClient, 'sub')
        if (stompClient) {
            return stompClient.subscribe(topic, responseHandler);
        }
    }

    const sendMessage = (to,message = "") => {
        message = typeof message === "string" ? "" :  JSON.stringify(message)
        stompClient.send(`/app${to}`, {},message)
    }

    const disconnect = () => {
        if (stompClient !== null) {
            stompClient.disconnect()
            console.log("Disconnected")
        } else {
            console.log("Stomp client dont exist!")
        }
    }

    return {connect,disconnect, subscribe, sendMessage, addHandler}
}

export default useWebSocket