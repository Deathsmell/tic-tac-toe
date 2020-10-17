import React, {useState} from "react";
import ReactAutocomplete from 'react-autocomplete'
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import TagBadge from "../TagBadge";
import Button from "react-bootstrap/Button";
import {Col} from "react-bootstrap";

const SearchModal = ({onHide, show}) => {

    const [value, setValue] = useState('');
    const menuStyle = {
        borderRadius: '3px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '2px 0',
        fontSize: '90%',
        position: 'fixed',
        overflow: 'auto',
        maxHeight: '10%',
    }

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
                <Row>
                    <Col>
                        <h4>Search input: </h4>
                        <ReactAutocomplete
                            menuStyle={menuStyle}
                            items={[
                                {id: 'foo', label: 'foo'},
                                {id: 'bar', label: 'bar'},
                                {id: 'baz', label: 'baz'},
                            ]}
                            shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                            getItemValue={item => item.label}
                            renderItem={(item, highlighted) =>
                                <div
                                    key={item.id}
                                    style={{backgroundColor: highlighted ? '#eee' : 'transparent'}}
                                >
                                    {item.label}
                                </div>
                            }
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            onSelect={value => setValue(value)}
                        />
                    </Col>
                    <Col>
                        <h4>Select tags: </h4>
                        <Row>
                            <TagBadge tag={"Dark"}/>
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SearchModal