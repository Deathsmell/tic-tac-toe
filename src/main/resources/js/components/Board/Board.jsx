import React from 'react'
import BoardRow from "./BoardRow";


const Board = ({board, boardState}) => {
    return (
        <div className="justify-content-center">
            {
                board.map((row, index) => {
                        return (
                            <BoardRow key={`${index}-row`}
                                      row={row}
                                      index={index}
                                      board={boardState}
                            />
                        )
                    }
                )
            }
        </div>
    )
}

export default Board