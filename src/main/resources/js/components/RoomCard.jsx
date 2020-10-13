import React from 'react'

const RoomCard = ({roomId,host,tags,lastUpdate,img}) => {

    return (
        <div className="card">
            <div className="card-header">
                <div className="d-flex justify-content-between">
                    <div className="align-self-center">
                        <strong>Room {roomId}</strong>
                    </div>
                    <div className="">
                        <a href="#" className="btn btn-primary rounded">Join</a>
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
                        <h5 className="card-title">Host: {host}</h5>
                        <p className="card-text">
                            Tags:&nbsp;
                            {tags.map((tag,index) => {
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
                <small className="text-muted">Last updated {lastUpdate}</small>
            </div>
        </div>
    )
}

export default RoomCard