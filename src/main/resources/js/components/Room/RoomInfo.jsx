import React, {useContext, useEffect, useState} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import useHttp from "../../hooks/http.hook";
import {RoomContext} from "../../context/room/RoomContext";
import {Redirect} from "react-router-dom"
import {AlertContext} from "../../context/alert/AlertContext";


const RoomInfo = ({board, host, opponent, updated}) => {

    const {request} = useHttp();
    const {uuid} = useContext(RoomContext);
    const alert = useContext(AlertContext);
    const [gameStatus, setGameStatus] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const showAlert = (response) => {
        const message = response.message;
        if (message.includes("surrendered")) {
            return alert.endGameAlert(message)
        }
        return alert.show(message)
    }

    useEffect(() => {
        board.forEach(row => {
            setGameStatus(() => row.includes(0))
        })
    }, [board])

    const surrenderHandler = () => {
        request(
            `/room/${uuid}/surrender`,
            'post'
        )
            .then(showAlert)
            .catch(showAlert)
    }

    const toMenuHandler = () => {
        setRedirect(true)
    }

    if (!redirect) {
        return (
            <Card className="border-info">
                <Card.Body>
                    <Card.Title>Room info</Card.Title>
                    <Card.Text>
                        Host: {host || 'none'}
                        <br/>
                        Opponent: {opponent || 'none'}
                        <br/>
                        Last update: {updated || 'none'}
                        <br/>
                        {!gameStatus && (<strong>Game end</strong>)}
                    </Card.Text>
                    <Row className="justify-content-between">
                        <Button variant="danger"
                                className="mr-3"
                                onClick={surrenderHandler}
                        >Surrender</Button>
                        <Button variant="warning"
                                onClick={toMenuHandler}
                        >Back to menu</Button>
                    </Row>
                </Card.Body>
            </Card>
        )
    } else {
        return (
            <Redirect to={"/ist}"}/>
        )
    }
}


export default RoomInfo