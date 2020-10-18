import React, {useContext, useEffect} from 'react'
import {FaRegCircle} from "react-icons/fa";
import {ImCross} from "react-icons/im";
import useHttp from "../../hooks/http.hook";
import {RoomContext} from "../../context/room/RoomContext";

const BoardCell = ({indexRow, cell, indexCell,hostId}) => {

    const defaultCellClass = "d-flex border-dark justify-content-center cell border"
    const cross = <FaRegCircle className="align-self-center" size="100px" row={indexRow} cell={indexCell}/>
    const circle = <ImCross className="align-self-center" size="100px" row={indexRow} cell={indexCell}/>

    const {request} = useHttp();
    const {board, hash,uuid} = useContext(RoomContext);
    const isCross = (cell,hostId) => cell === hostId ? cross : circle

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

    useEffect(()=>{
        console.log(cell,hostId,cell === hostId);
    },[hostId,cell])

    return (
        <div className={defaultCellClass}
             row={indexRow}
             cell={indexCell}
             onClick={cellHandler}
        >
            {
                cell !== 0 ? isCross(cell,hostId) : ''
            }
        </div>
    )
}

export default BoardCell