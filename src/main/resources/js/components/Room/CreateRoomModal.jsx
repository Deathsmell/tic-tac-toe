import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Row from 'react-bootstrap/Row'
import useHttp from "../../hooks/http.hook";
import TagBadge from "../TagBadge";


const CreateRoomModal = ({onHide, roomState, show}) => {


    const {request} = useHttp();
    const [rooms, setRooms] = roomState;
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState(null);

    const createHandler = async (e) => {
        e.preventDefault()
        const {body} = await request('/room/create', 'post', {tags})
        setRooms([...rooms, body])
        setTags([])
        onHide()
    }

    const enterEvent = (e) => {
        if (e.key === "Enter") {
            addHandler()
        }
    }

    const addHandler = () => {
        if (tag) {
            const newTags = tag
                .split(' ')
                .filter(tag => tag.trim() !== '')
                .map(tag => tag.toLowerCase())
                .filter(tag => !tags.includes(tag))

            setTags([...tags, ...newTags])
            setTag(null)
            document.getElementById('input').value = ''
        }
    }

    const deleteHandler = (e) => {
        const removeTag = e.target.getAttribute('value');
        setTags(tags.filter((tag) => tag !== removeTag))
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
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default">Tags:</InputGroup.Text>

                    </InputGroup.Prepend>
                    <FormControl
                        id="input"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={(e) => setTag(e.target.value)}
                        onKeyPress={enterEvent}
                    />
                    <InputGroup.Append>
                        <Button variant="info"
                                onClick={addHandler}
                        >Add</Button>
                    </InputGroup.Append>
                </InputGroup>
                <Row className="ml-4">
                    {tags && tags.map((tag, index) => {
                        return (
                            <TagBadge key={index}
                                      tag={tag}
                                      cross
                                      onDelete={deleteHandler}
                            />
                        )
                    })}
                    {tag && tag.trim() && <TagBadge tag={tag}/>}
                </Row>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                <Button variant="danger" onClick={onHide}>Close</Button>
                <Button variant="success" onClick={createHandler}>Create</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateRoomModal