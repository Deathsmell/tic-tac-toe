import React, {useState} from 'react'
import Board from "../components/Board/Board";
import RoomInfo from "../components/RoomInfo";

const Room = () => {

    const boardState = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    const [board,] = boardState

    return (
        <div className="container">
            <div className="row justify-content-center">
                <Board board={board}
                       boardState={boardState}
                />
            </div>
            <div className="row justify-content-center pt-4">
                <RoomInfo board={board}/>
            </div>
        </div>

    )
}


export default Room