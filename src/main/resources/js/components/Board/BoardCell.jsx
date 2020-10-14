import React from 'react'
import {FaRegCircle} from "react-icons/fa";
import {ImCross} from "react-icons/im";

const BoardCell = ({indexRow, cell, indexCell, boardState}) => {

    const defaultCellClass = "d-flex border-dark justify-content-center cell border"
    const cross = <FaRegCircle className="align-self-center" size="100px"/>
    const circle = <ImCross className="align-self-center" size="100px"/>

    const [board,setBoard] = boardState

    const cellHandler = (e) => {
        e.preventDefault()
        const targetIndexRow = e.target.getAttribute('row');
        const targetIndexCell = e.target.getAttribute('cell');
        const newBoard = board.map((row, indexRow) => {
            return indexRow.toString() === targetIndexRow
                ? row.map((cell, indexCell) => {
                    const rand = Math.round(0 - 0.5 + Math.random() * (2 + 1));
                    console.log(rand)
                    return indexCell.toString() === targetIndexCell
                        ? rand
                        : cell
                })
                : row
        })
        setBoard(newBoard)
    }

    return (
        <div className={defaultCellClass}
             row={indexRow}
             cell={indexCell}
             onClick={cellHandler}
        >
            {
                cell ? cell === 1
                    ? cross
                    : circle
                    : ''
            }
        </div>
    )
}

export default BoardCell