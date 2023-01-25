import { useEffect } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from 'react-router-dom'
import { createPost, setTestId } from "../reducers/testReducer"

import CodeMirror from '@uiw/react-codemirror'
import { python, pythonLanguage } from '@codemirror/lang-python'

const Test = () => {
    const testStyle = {
        "whiteSpace": "pre-wrap"
    }

    const id = useParams().id
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTestId(id))
    }, [dispatch, id])

    const test = useSelector(state => state.test)
    const user = useSelector(state => state.user)
    let grade = undefined

    let code = ""

    if (!test) {
        return null
    }
    else if (user) {
        grade = test.grades[user.id]
    }

    const handleSolution = event => {
        event.preventDefault()
        dispatch(createPost(id, code, (postId) => {
            navigate(`/posts/${postId}`)
            // resetCode()
        }))
    }

    return(
        <Container>
            <Row>
                <Col xs="12" md="5">
                    <h2>{test.title}</h2>
                    <div style={testStyle}>{test.content}</div>
                    <hr></hr>
                    <h4>Current Grade</h4>
                    {grade ? <h5>{grade}</h5> : <div>Please log in/ submit your code first!</div>}
                </Col>
                
                <Col xs="12" md="7">
                    <h3>Submit a Solution</h3>
                    {   user ?
                        <form onSubmit={handleSolution}>
                            <CodeMirror 
                                placeholder="Please enter Python code."
                                height="70vh"
                                value=""
                                onChange={(value) => {code = value}} 
                                extensions={[python({ base: python, codeLanguages: pythonLanguage })]} 
                            />
                            <Button type="submit">submit!</Button>
                        </form> :
                        <div>Please login/register to submit your code!</div>
                    }
                </Col>
            </Row>
           
            
            
        </Container>    
    )
}

export default Test