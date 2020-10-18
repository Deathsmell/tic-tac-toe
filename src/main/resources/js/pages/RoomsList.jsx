import React, {useCallback, useContext, useEffect, useState} from 'react'
import RoomCard from "../components/Room/RoomCard";
import useHttp from "../hooks/http.hook";
import {AlertContext} from "../context/alert/AlertContext";
import RoomButtonsGroup from "../components/RoomButtonsGroup";
import Row from "react-bootstrap/Row";
import TagBadge from "../components/TagBadge";
import {onlyUniqueTag} from "../utils/tag";

const RoomsList = () => {

    const alert = useContext(AlertContext);
    const {request} = useHttp();
    const roomState = useState([]);
    const filterState = useState([]);
    const [filter,setFilter] = filterState
    const [rooms, setRooms] = roomState

    const showAlert = ({status, message}) => alert.show(message, alert.statusType(status))

    const deleteHandler = (e) => {
        const value1 = e.target.getAttribute('value');
        const filter1 = filter.filter(({tag}) => tag !== value1);
        console.log(filter1, value1);
        setFilter(filter1)
    }

    const noStrictFilterHandler = useCallback((room) => {
        if (filter && filter.length) {
            const booleans = room.roomTags.map(value => {
                const booleans = filter.map(filterTag => {
                    return filterTag.tag === value.tag
                });
                return booleans.includes(true)
            });
            return booleans.includes(true);
        } else {
            return true
        }
    },[filter])



    useEffect(() => {
        request('/room/allRooms')
            .then((response) => {
                response.body ? setRooms([...response.body]) : response ? showAlert(response) : ''
            })
            .catch(showAlert)
    }, [])

    return (
        <div className="container-fluid">
            <RoomButtonsGroup
                roomState={roomState}
                filterState={filterState}
            />
            {filter && filter.length !== 0 &&
            <Row className="justify-content-center mt-2">
                {filter.filter(onlyUniqueTag).map(({tag}, index) => <TagBadge key={index} tag={tag} cross
                                                        onDelete={deleteHandler}/>)}
            </Row>
            }
            <div className="row justify-content-center">
                {rooms.filter(noStrictFilterHandler).map(({id, uuid, host, opponent, roomTags, createdAt, status, img}, index) => {
                    return (
                        <div className="col-lg-4 col-md-12 col-sm-12 p-3"
                             key={index}
                        >
                            <RoomCard
                                roomId={id}
                                uuid={uuid}
                                host={host}
                                opponent={opponent}
                                tags={roomTags}
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