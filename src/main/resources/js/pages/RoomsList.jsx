import React, {useContext, useEffect, useState} from 'react'
import RoomCard from "../components/RoomCard";
import useHttp from "../hooks/http.hook";
import {AlertContext} from "../context/alert/AlertContext";

const RoomsList = () => {

    const alert = useContext(AlertContext);
    const {request} = useHttp();
    const [rooms, setRooms] = useState([]);

    const showAlert = ({status, message}) => alert.show(message, alert.statusType(status))

    const createHandler = async (e) => {
        e.preventDefault()
        const {body} = await request('/room/create', 'post');
        setRooms([...rooms,body])
    }

    useEffect(() => {
        request('/room/allRooms')
            .then((response) => {
                !response.body ? showAlert(response) : setRooms([...response.body])
            })
            .catch(showAlert)
    }, [])

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <button className="btn btn-large btn-secondary"
                        onClick={createHandler}
                >Create room</button>
            </div>
            <div className="row justify-content-center">
                {rooms.map(({id, uuid, host, opponent, tags, createdAt, status, img}, index) => {
                    return (
                        <div className="col-lg-4 col-md-12 col-sm-12 p-3"
                             key={index}
                        >
                            <RoomCard
                                roomId={id}
                                uuid={uuid}
                                host={host}
                                opponent={opponent}
                                tags={tags}
                                createdAt={createdAt}
                                status={status}
                                img={img}
                            />
                        </div>

                    )
                })}
            </div>
        </div>

    )
}

export default RoomsList