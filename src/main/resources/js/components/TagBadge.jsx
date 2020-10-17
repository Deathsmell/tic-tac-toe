import React from "react";
import Badge from "react-bootstrap/Badge";


const TagBadge = ({tag, cross, onDelete}) => {

    return (
            <Badge className="m-1 d-flex" pill variant="primary">
                <strong className="mr-1 pt-1"
                    style={{height: '24px'}}
                >{tag}</strong>
                {
                    cross && <button type="button"
                                     className="close"
                                     aria-label="Close"
                                     value={tag}
                                     onClick={onDelete}
                    >
                        <span aria-hidden="true" value={tag}>&times;</span>
                    </button>
                }
            </Badge>

    )
}

export default TagBadge