import React, {useState} from 'react'
import Button from "react-bootstrap/Button";
import CreateRoomModal from "./Room/CreateRoomModal";
import SearchModal from "./Room/SearchModal";
import Row from "react-bootstrap/Row";

const RoomButtonsGroup = ({roomState}) => {

    const [createShow, setCreateShow] = useState(false);
    const [searchShow, setSearchShow] = useState(false);

    return (
        <div className="container">
            <Row className="justify-content-around pt-2">
                <Button variant="info" onClick={() => setSearchShow(true)}>
                    Find by tag
                </Button>
                <Button variant="success" onClick={() => setCreateShow(true)}>
                    Create room
                </Button>
                <CreateRoomModal
                    show={createShow}
                    onHide={() => setCreateShow(false)}
                    roomState={roomState}
                />
                <SearchModal
                    show={searchShow}
                    onHide={() => setSearchShow(false)}
                />
            </Row>
        </div>
    )
}

export default RoomButtonsGroup