import { useEffect } from "react"
import { Button, Col, Container, Form, FormLabel, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import useField from "../hooks/useField"
import useTextArea from "../hooks/useTextArea"
import { createTest, initializeTests } from "../reducers/testsReducer"

const TestPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeTests())
    }, [dispatch])

    const tests = useSelector(state => state.tests)
    const user = useSelector(state => state.user)
    const createTestAble = (user && user.admin)

    const {reset: titleReset, ...title} = useField('title', 'text')
    const {reset: contentReset, ...content} = useTextArea('content', '8')

    const {reset: input1Reset, ...input1} = useTextArea('input1', '2')
    const {reset: output1Reset, ...output1} = useTextArea('output1', '2')
    const {reset: input2Reset, ...input2} = useTextArea('input2', '2')
    const {reset: output2Reset, ...output2} = useTextArea('output2', '2')
    const {reset: input3Reset, ...input3} = useTextArea('input3', '2')
    const {reset: output3Reset, ...output3} = useTextArea('output3', '2')

    const handleTest = (event) => {
        event.preventDefault()
        dispatch(createTest({ 
            title: title.value, 
            content: content.value,
            testCases: [
                { input: input1.value, output: output1.value },
                { input: input2.value, output: output2.value },
                { input: input3.value, output: output3.value }
            ]
        }, () => {
            titleReset()
            contentReset()
            input1Reset()
            output1Reset()
            input2Reset()
            output2Reset()
            input3Reset()
            output3Reset()
        }))
    }

    return (
        <Container>
            <Row>
                <Col xs="12" md={createTestAble ? "5" : "12"}>
                    <h3>Coding Challenges!</h3>
                    {tests.map(test => 
                        <div key={test.id}>
                            <Link  to={`/tests/${test.id}`}>
                                {test.title}
                            </Link>
                        </div>
                    )}
                </Col>
                
                { 
                    createTestAble ?
                    <Col xs="12" md="7">
                        <h3>(Admin) Create Challenge</h3>

                        <Form onSubmit={handleTest}>
                            <FormLabel>Title </FormLabel>
                            <Form.Control {...title} />
                            <FormLabel>Content </FormLabel>
                            <Form.Control as="textarea" {...content} />
                            <Row>
                                <Col>
                                    <FormLabel>Test Input</FormLabel>
                                    <Form.Control as="textarea" {...input1} />
                                    <Form.Control as="textarea" {...input2} />
                                    <Form.Control as="textarea" {...input3} />
                                </Col>
                                <Col>
                                    <FormLabel>Test Output</FormLabel>
                                    <Form.Control as="textarea" {...output1} />
                                    <Form.Control as="textarea" {...output2} />
                                    <Form.Control as="textarea" {...output3} />
                                </Col>
                            </Row>
                            
                            
                            <Button type="submit">create</Button>
                        </Form>

                    </Col> :
                    null
                }
            </Row>
        </Container>
    )
}

export default TestPage