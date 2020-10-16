import React, {useContext} from 'react'
import BoardRow from "./BoardRow";
import {RoomContext} from "../../context/room/RoomContext";


const Board = () => {

    const {board} = useContext(RoomContext);

    return (
        <div className="justify-content-center">
            {
                board.map((row, index) => {
                        return (
                            <BoardRow key={`${index}-row`}
                                      row={row}
                                      index={index}
                            />
                        )
                    }
                )
            }
        </div>
    )
}

export default Board