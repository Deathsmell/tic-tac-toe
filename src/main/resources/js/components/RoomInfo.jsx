import React, {useEffect, useState} from 'react'

const RoomInfo = ({board}) => {

    const [gameStatus, setGameStatus] = useState(true);

    useEffect(() => {
        board.forEach(row => {
            setGameStatus(() => row.includes(0))
        })
        console.log(gameStatus)
    }, [board])


    return (
        <div>
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