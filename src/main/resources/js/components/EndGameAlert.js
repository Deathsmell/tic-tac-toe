import React, {useState} from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router-dom"

const EndGameAlert = ({message}) => {
    const [show, setShow] = useState(true);
    const [redirect, setRedirect] = useState(false);

    const hideHandler = () => {
        setRedirect(true)
        setShow(false)
    }

    if (redirect) {
        return (
            <Redirect to={'/list'}/>
        )
    } else {
        return (
            <>
                <Alert show={show} variant="success">
                    <Alert.Heading>Game end. Congratulate!</Alert.Heading>
                    <p>
                        {message}
                    </p>
                    <hr/>
                    <div className="d-flex justify-content-end">
                        <Button onClick={hideHandler} variant="outline-success">
                            Close me y'all!
                        </Button>
                    </div>
                </Alert>

                {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
            </>
        );
    }
}

export default EndGameAlert