import { Alert, Container, Collapse } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { deleteMessageText } from "../reducers/messageReducer"

const Message = () => {
    const message = useSelector(state => state.message)
    const dispatch = useDispatch()

    return (
        <Collapse in={message.timeoutID !== null} onExited={() => dispatch(deleteMessageText())}>
            <Container>
                <Alert variant={message.success? "success" : "danger"}>
                    {message.text}
                </Alert>
            </Container>
        </Collapse>
    )  
}

export default Message