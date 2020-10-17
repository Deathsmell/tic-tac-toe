import React, {useState} from 'react'
import Button from "react-bootstrap/Button";
import CreateRoomModal from "./Room/CreateRoomModal";
import SearchModal from "./Room/SearchModal";
import Row from "react-bootstrap/Row";

const RoomButtonsGroup = ({roomState, filterState}) => {

    const [createShow, setCreateShow] = useState(false);
    const [searchShow, setSearchShow] = useState(false);
    const [filter,setFilter] = filterState

    const filterEmpty = filter.length === 0;
    return (
        <div className="container">
            <Row className="justify-content-around pt-2">
                <Button variant="info" onClick={() => setSearchShow(true)}>
                    Find by tag
                </Button>
                <Button variant={filterEmpty ? "outline-secondary" :"secondary"}
                        disabled={filterEmpty}
                        onClick={() => setFilter([])}
                >
                    Remove filter
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
                    filterState={filterState}
                    roomState={roomState}
                    onHide={() => setSearchShow(false)}
                />
            </Row>
        </div>
    )
}

export default RoomButtonsGroup