import React, {useCallback, useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import TagBadge from "../TagBadge";
import Button from "react-bootstrap/Button";
import {Hint} from 'react-autocomplete-hint';
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const SearchModal = ({onHide, show, roomState, filterState}) => {

    const [value, setValue] = useState('');
    const [tags, setTags] = useState([{}]);
    const [rooms] = roomState;
    const [filter, setFilter] = filterState;

    const pressEnterHandler = (e) => {
        if (e.key === "Enter") {
            addFilterHandler(e)
        }
    }

    const addFilterHandler = (e) => {
        const value = e.target.value || e.target.getAttribute('value')
        setFilter([...filter, ...tags.filter(({tag}) => tag === value)])
        setValue('')
    }

    const matchFilter = useCallback(({tag}) => tag && tag.startsWith(value), [value, tags])


    useEffect(() => {
        const roomTags = rooms.map(({roomTags}) => [...roomTags]).flatMap(x => x.concat())
        setTags(roomTags)
    }, [rooms])

    useEffect(() => {
        if (tags) {
            console.log(tags.map(({tag}) => tag))
        } else {
            console.log("No tags")
        }
    }, [tags])

    return (
        <Modal
            onHide={onHide}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create room
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="justify-content-center">
                    <h4>Search input: </h4>
                </Row>
                <Row className="justify-content-center mt-2">
                    <Hint options={tags && tags.map(({tag}) => tag) || ['']}>
                        <input
                            id="search-filter-input"
                            className="form-control form-control-lg"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            onKeyPress={pressEnterHandler}
                        />
                    </Hint>
                    <OverlayTrigger
                        key={'right'}
                        placement={'right'}
                        overlay={
                            <Tooltip id={`tooltip-${'right'}`}>
                                You must press enter.
                            </Tooltip>
                        }
                    >
                        <Button variant="info">Add</Button>
                    </OverlayTrigger>
                </Row>
                <Row className="justify-content-center mt-2">
                    <h4>Select tags: </h4>
                </Row>
                <Row className="container mt-2">
                    {
                        tags && tags.filter(matchFilter).map(({tag}) => (
                                <TagBadge tag={tag}
                                          onClick={addFilterHandler}
                                />
                            )
                        )
                    }
                </Row>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SearchModal