import React, {useContext, useEffect, useState} from 'react'
import {RoomContext} from "../../context/room/RoomContext";

const RoomInfo = ({board,host,opponent,updated}) => {

    const [gameStatus, setGameStatus] = useState(true);
    const {hash} = useContext(RoomContext);

    useEffect(() => {
        board.forEach(row => {
            setGameStatus(() => row.includes(0))
        })
        console.log(gameStatus)
    }, [board])


    return (
        <div>
            Hash: {hash}
            <br/>
            Host: {host || 'none'}
            <br/>
            Opponent: {opponent || 'none'}
            <br/>
            Last update: {updated || 'none'}
            <br/>
            {!gameStatus && (<strong>Game end</strong>)}
        </div>
    )
}


export default RoomInfo