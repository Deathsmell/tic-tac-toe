import React, {useContext, useEffect, useState} from 'react'
import useWebSocket from "../hooks/ws.hook";
import {AuthContext} from "../context/auth/AuthContext";

const Test = () => {

    const {addHandler, subscribe, disconnect, sendMessage} = useWebSocket();
    const [string, setString] = useState('');

    useEffect(() => {
        console.log(string)
    }, [string])

    const connectHandler = async (e) => {
        e.preventDefault()
        console.log('start add')
        addHandler(setString)
        subscribe('/topic/public')
    }

    const sendHandler = (e) => {
        e.preventDefault()
        sendMessage({name: "TEST"})
    }

    const disconnectHandler = (e) => {
        e.preventDefault()
        disconnect()
    }


    return (
        <div className="container">
            <button className="btn btn-large btn-success"
                    onClick={connectHandler}
            >
                Подключ
            </button>
            <button className="btn btn-large btn-secondary"
                    onClick={sendHandler}
            >
                Отпр
            </button>
            <button className="btn btn-large btn-danger"
                    onClick={disconnectHandler}
            >
                Дисконект
            </button>
            {<p>{string}</p>}
        </div>
    )
}

export default Test


