import React from 'react'
import BoardCell from "./BoardCell";

const BoardRow = ({row, index,hostId}) => {



    return (
        <div className="row no-gutters"
        >
            {row.map((cell, indexCell) => {
                return (
                    <BoardCell
                        key={`${indexCell}-cell`}
                        indexRow={index}
                        indexCell={indexCell}
                        cell={cell}
                        hostId={hostId}
                    />
                )
            })}
        </div>
    )
}

export default BoardRow