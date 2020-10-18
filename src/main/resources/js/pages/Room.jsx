import React, {useContext, useEffect, useState} from 'react'
import Board from "../components/Board/Board";
import RoomInfo from "../components/Room/RoomInfo";
import {RoomContext} from "../context/room/RoomContext";
import {AlertContext} from "../context/alert/AlertContext";
import {WebSocketContext} from "../context/websocket/WebSocketContext";

const Room = ({location}) => {

    const alert = useContext(AlertContext);
    const [board, setBoard] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    const [hash, setHash] = useState('')
    const [hostId, setHostId] = useState(null)
    const [host, setHost] = useState(null);
    const [opponent, setOpponent] = useState(null);
    const [updated, setUpdated] = useState(null);
    const {subscribe, addHandler, sendMessage} = useContext(WebSocketContext);
    const [joined, setJoined] = useState(false);
    const [subscribed, setSubscribed] = useState(true);

    const boardHandler = ({body}) => {
        const content = JSON.parse(body)
        if (content) {
            setBoard(content.board)
            setHash(content.hash)
            setHost(content.host)
            setOpponent(content.opponent)
            setUpdated(content.updated)
            setHostId(content.hostId)
            if (content.info) {
                alert.show(content.info)
            }
        } else {
            alert.show('Not have game message response', alert.statusType(500))
        }
    }

    useEffect(() => {
        console.log(board)
    }, [board])

    useEffect(() => {
        if (!joined) {
            subscribe('/topic' + location.pathname);
            setSubscribed(true)
        }
        return () => {
            setSubscribed(false)
        }
    }, [joined])

    useEffect(() => {
        if (subscribed) {
            sendMessage(location.pathname, {})
            addHandler(boardHandler)
            setJoined(true)
        }
    }, [subscribed])


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
                        <Board board={board}
                               hostId={hostId}
                        />
                    </div>
                    <div className="row justify-content-center pt-4">
                        <RoomInfo board={board}
                                  host={host}
                                  opponent={opponent}
                                  updated={updated}
                        />
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