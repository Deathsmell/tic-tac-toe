import React, {useContext, useState} from 'react'
import useHttp from "../../hooks/http.hook";
import {Redirect} from "react-router-dom"
import {AlertContext} from "../../context/alert/AlertContext";

const RoomCard = ({roomId, uuid, host, opponent, tags, createdAt, status, img}) => {

    const {request} = useHttp();
    const alert = useContext(AlertContext);
    const showAlert = ({status, message}) => alert.show(message, alert.statusType(status))
    const [redirect, setRedirect] = useState(false);

    const isDeletingRoom = status => status && status.toLowerCase() === "deleting"
    const localUsername = localStorage.getItem('username');
    const isHost = host && (localUsername === host.username);
    const isOpponent = opponent && (localUsername === opponent.username);

    const joinOrReconnect = () => isHost || isOpponent ? 'Reconnect' : 'Join'


    const joinHandler = (e) => {
        e.preventDefault()
        request('/room/join', 'post', null, null, {uuid: e.target.value})
            .then((response) => {
                showAlert(response)
                if (response.status === 200) {
                    setRedirect(true)
                }
            })
            .catch(showAlert)
    }

    return (
        <div className="card"

        >
            {redirect && <Redirect to={`/game/${uuid}`}/>}
            <div className="card-header">
                <div className="d-flex justify-content-between">
                    <div className="align-self-center">
                        <strong>Room {roomId}</strong>
                    </div>
                    <div className="">
                        <button className="btn btn-primary rounded"
                                disabled={isDeletingRoom()}
                                value={uuid}
                                onClick={joinHandler}
                        >{joinOrReconnect()}
                        </button>
                    </div>
                </div>
            </div>
            <div className="row no-gutters">
                {img && <div className="col-md-4">
                    <img src={img}
                         style={{
                             objectFit: 'cover',
                             width: "100%",
                             height: '100%'
                         }}
                         className="card-img img-fluid"
                         alt={"..."}
                    />
                </div>}
                <div className={`col-md-${img ? 8 : 12}`}>
                    <div className="card-body">
                        <h6 className="card-title">Host: {host && host.username || 'Unknown'} </h6>
                        <h6 className="card-title">Opponent: {opponent && opponent.username || 'Unknown'} </h6>
                        <p className="card-text">
                            Tags:&nbsp;
                            {tags && tags.map((tag, index) => {
                                return (
                                    <span className="mr-1 badge badge-pill badge-primary"
                                          key={index}
                                    >
                                        {tag}
                                    </span>
                                )
                            })}
                        </p>
                    </div>

                </div>
            </div>
            <div className="card-footer">
                <small className="text-muted">Last updated {createdAt}</small>
            </div>
        </div>
    )
}

export default RoomCard