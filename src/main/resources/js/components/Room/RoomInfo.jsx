import React, {useContext, useEffect, useState} from 'react'
import {RoomContext} from "../../context/room/RoomContext";

const RoomInfo = ({board}) => {

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
            Host: Alex
            <br/>
            Opponent: Garfield
            <br/>
            Game started: 3 min ago
            <br/>
            {!gameStatus && (<strong>Game end</strong>)}
        </div>
    )
}


export default RoomInfo