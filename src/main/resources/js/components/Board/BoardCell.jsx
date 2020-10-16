import React, {useContext, useEffect} from 'react'
import {FaRegCircle} from "react-icons/fa";
import {ImCross} from "react-icons/im";
import useHttp from "../../hooks/http.hook";
import {RoomContext} from "../../context/room/RoomContext";

const BoardCell = ({indexRow, cell, indexCell}) => {

    const defaultCellClass = "d-flex border-dark justify-content-center cell border"
    const cross = <FaRegCircle className="align-self-center" size="100px" row={indexRow} cell={indexCell}/>
    const circle = <ImCross className="align-self-center" size="100px" row={indexRow} cell={indexCell}/>

    const {request} = useHttp();
    const {board, hash,uuid} = useContext(RoomContext);

    const cellHandler =  (e) => {
        e.preventDefault()
        const x = e.target.getAttribute('row');
        const y = e.target.getAttribute('cell');
        const GameMessageRequest = {board, hash, x, y}
        console.log(GameMessageRequest)
        request(
            '/room/'+uuid,
            'post',
            GameMessageRequest,
            null,
        );
    }


    return (
        <div className={defaultCellClass}
             row={indexRow}
             cell={indexCell}
             onClick={cellHandler}
        >
            {
                cell ? cell === 3 ? cross : circle : ''
            }
        </div>
    )
}

export default BoardCell