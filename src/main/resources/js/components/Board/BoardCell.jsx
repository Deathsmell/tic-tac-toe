import React, {useContext} from 'react'
import {FaRegCircle} from "react-icons/fa";
import {ImCross} from "react-icons/im";
import useHttp from "../../hooks/http.hook";
import {RoomContext} from "../../context/room/RoomContext";
import {AlertContext} from "../../context/alert/AlertContext";

const BoardCell = ({indexRow, cell, indexCell, hostId}) => {

    const defaultCellClass = "d-flex border-dark justify-content-center cell border"
    const cross = <FaRegCircle className="align-self-center" size="100px" row={indexRow} cell={indexCell}/>
    const circle = <ImCross className="align-self-center" size="100px" row={indexRow} cell={indexCell}/>

    const {request} = useHttp();
    const {board, hash, uuid} = useContext(RoomContext);
    const alert = useContext(AlertContext)
    const isCross = (cell, hostId) => cell === hostId ? cross : circle
    const showAlert = (response) => {
        const message = response.message;
        if (message.includes("wined") || message.includes("Game end")) {
            return alert.endGameAlert(message)
        }
        return alert.show(message)
    }

    const cellHandler = (e) => {
        e.preventDefault()
        const x = e.target.getAttribute('row');
        const y = e.target.getAttribute('cell');
        const GameMessageRequest = {board, hash, x, y}
        console.log(GameMessageRequest)
        request(
            '/room/' + uuid,
            'post',
            GameMessageRequest,
            null,
        )
            .then(showAlert)
            .catch(showAlert)
    }

    return (
        <div className={defaultCellClass}
             row={indexRow}
             cell={indexCell}
             onClick={cellHandler}
        >
            {
                cell !== 0 ? isCross(cell, hostId) : ''
            }
        </div>
    )
}


export default BoardCell