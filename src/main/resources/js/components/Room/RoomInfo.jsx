import React, {useEffect, useState} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const RoomInfo = ({board, host, opponent, updated}) => {

    const [gameStatus, setGameStatus] = useState(true);

    useEffect(() => {
        board.forEach(row => {
            setGameStatus(() => row.includes(0))
        })
    }, [board])


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

                    >Surrender</Button>
                    <Button variant="warning"
                    >Back to menu</Button>
                </Row>
            </Card.Body>
        </Card>

    )
}


export default RoomInfo