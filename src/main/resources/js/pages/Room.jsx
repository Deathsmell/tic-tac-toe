import React, {useContext, useEffect, useState} from 'react'
import Board from "../components/Board/Board";
import RoomInfo from "../components/Room/RoomInfo";
import {RoomContext} from "../context/room/RoomContext";
import {AlertContext} from "../context/alert/AlertContext";
import {WebSocketContext} from "../context/websocket/WebSocketContext";

const Room = ({location}) => {

    const alert = useContext(AlertContext);
    const [board, setBoard] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    const {subscribe, addHandler,sendMessage} = useContext(WebSocketContext);
    const [joined, setJoined] = useState(false);
    const [subscribed, setSubscribed] = useState(true);
    const [hash, setHash] = useState('')

    const boardHandler = ({body}) => {
        const content = JSON.parse(body)
        console.log(content.board, "change")
        if (content) {
            if (content.board && content.hash) {
                setBoard(content.board)
                setHash(content.hash)
            } else if (content.info) {
                alert.show(content.info)
            }
        } else {
            alert.show('Not have game message response', alert.statusType(500))
        }
    }

    useEffect(()=>{
        console.log(board)
    },[board])

    useEffect( () => {
        if (!joined) {
            subscribe('/topic' + location.pathname);
            setSubscribed(true)
        }
        return () => {setSubscribed(false)}
    }, [])

    useEffect(()=>{
        if (subscribed) {
            sendMessage(location.pathname,{})
            console.log('set handler')
            addHandler(boardHandler)
            setJoined(true)
        }
    },[subscribed])


    if (joined) {
        return (
            <RoomContext.Provider value={{
                board,
                hash,
                joined,
                uuid: location.pathname.slice('/room/'.length)
            }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <Board board={board}/>
                    </div>
                    <div className="row justify-content-center pt-4">
                        <RoomInfo board={board}/>
                    </div>
                </div>
            </RoomContext.Provider>
        )
    } else {
        return (
            <div className="loading">
                <div className="container">
                    <div className="row justify-content-center">
                        <h1>LOADING...</h1>
                    </div>
                </div>
            </div>
        )
    }
}


export default Room