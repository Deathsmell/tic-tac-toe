import React from 'react'

const RoomButtonsGroup = ({roomState}) => {

    const [rooms, setRooms] = roomState;

    const createHandler = async (e) => {
        e.preventDefault()
        const {body} = await request('/room/create', 'post');
        setRooms([...rooms, body])
    }

    return (
        <div className="row justify-content-center pt-2">
            <button className="btn btn-large btn-secondary"
                    onClick={createHandler}
            >Create room
            </button>
        </div>


    )
}

export default RoomButtonsGroup