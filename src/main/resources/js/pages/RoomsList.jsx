import React, {useContext, useEffect, useState} from 'react'
import RoomCard from "../components/Room/RoomCard";
import useHttp from "../hooks/http.hook";
import {AlertContext} from "../context/alert/AlertContext";
import RoomButtonsGroup from "../components/RoomButtonsGroup";

const RoomsList = () => {

    const alert = useContext(AlertContext);
    const {request} = useHttp();
    const roomState = useState([]);
    const [rooms, setRooms] = roomState

    const showAlert = ({status, message}) => alert.show(message, alert.statusType(status))



    useEffect(() => {
        request('/room/allRooms')
            .then((response) => {
                !response.body ? showAlert(response) : setRooms([...response.body])
            })
            .catch(showAlert)
    }, [])

    return (
        <div className="container-fluid">
            <RoomButtonsGroup
                roomState={roomState}
            />
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