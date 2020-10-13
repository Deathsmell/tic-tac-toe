import React from 'react'
import RoomCard from "../components/RoomCard";

const RoomsList = () => {
    const imge = 'https://avatars.mds.yandex.net/get-pdb/1604805/b3aaa7cc-89cc-4319-951f-d767ed1570cc/s1200'



    const rooms = [
        {host: 'Alex', status: 'waiting', tags: ['fast', 'one game', 'cool time'], img: imge},
        {host: 'Maks', status: 'waiting', tags: ['fast', 'one game', 'cool time']},
        {host: 'German', status: 'waiting', tags: ['fast', 'one game', 'cool time']},
        {host: 'Voha', status: 'waiting', tags: ['fast', 'one game', 'cool time','cool time','cool time','cool time',
                'cool time','cool time','cool time','cool time']},
        {host: 'German', status: 'waiting', tags: ['fast', 'one game', 'cool time']},
        {host: 'German', status: 'waiting', tags: ['fast', 'one game', 'cool time']},
        {host: 'German', status: 'waiting', tags: ['fast', 'one game', 'cool time']},
        {host: 'German', status: 'waiting', tags: ['fast', 'one game', 'cool time']},
    ]

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                {rooms.map(({host, status, tags,img},index) => {
                    return (
                        <div className="col-lg-4 col-md-12 col-sm-12 p-3"
                             key={index}
                        >
                            <RoomCard
                                host={host}
                                tags={tags}
                                roomId={1}
                                lastUpdate={"3 min aho"}
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