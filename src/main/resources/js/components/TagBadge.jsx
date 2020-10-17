import React from "react";
import Badge from "react-bootstrap/Badge";


const TagBadge = ({tag, cross, onDelete, onClick}) => {

    return (
        <Badge className={`m-1 d-flex tag-badge ${onClick && 'pointer'}`}
               pill
               variant="primary"
        >
            <strong className="mr-1"
                    style={{height: '24px'}}
                    value={tag}
                    onClick={onClick}
            >
                {tag}
            </strong>
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