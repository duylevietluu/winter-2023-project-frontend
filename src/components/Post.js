import { Card, Col, Container, Row } from "react-bootstrap"
import testService from "../services/tests"
import CodeMirror from '@uiw/react-codemirror'
import { python, pythonLanguage } from '@codemirror/lang-python';
import { useSelector } from "react-redux";

const { useState, useEffect } = require("react")
const { useParams, Link } = require("react-router-dom")

const Post = () => {
    const id = useParams().id
    const user = useSelector(state => state.user)
    const [post, setPost] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        setMessage("loading...")

        testService
            .getPost(id)
            .then(res => {setPost(res)})
            .catch(() => {
                setPost(null)
                setMessage("Post not found!")
            })
    }, [id, user])

    if (!post) {
        return (<Container>{message}</Container>)
    }

    return (<Container>
        {/* <h2>Coder {userView.username}</h2>
        <div>Name: {userView.name}</div>
        <div>Role: {userView.admin? "Admin" : "User"}</div>
        <div>Submissions added: {userView.posts.length}</div> */}
        <h3>
            Submission by 
            Coder <Link to={`/users/${post.user.id}`}>{post.user.username}</Link> for
            Challenge <Link to={`/tests/${post.test.id}`}>{post.test.title}</Link>
        </h3>
        <Row>
            <Col xs="12" md="5">
                <h5>Grade: {post.grade}</h5>
                <div>Time submitted: {post.date}</div>
                {
                    post.results ? 
                    post.results.map((item, i) => <TestCase key={item._id} result={item} order={i} /> )
                    //<div key={i}>Test {i+1} {item.success? "passed" : "failed"}</div>) 
                    :
                    null
                }
            </Col>
            
            {
                post.content ? 
                <Col xs="12" md="7">
                    <h5>Code:</h5>
                    <CodeMirror 
                        height="70vh"
                        value={post.content}
                        editable={false}
                        extensions={[python({ base: python, codeLanguages: pythonLanguage })]} 
                    />
                </Col> :
                null
            }
        </Row>
        
    </Container>)
}

const TestCase = ({ result, order }) => {
    return (
        <Card>
            <Card.Body>
            <Card.Title style={{"color": result.success? "green" : "red"}}>
                Test {order + 1} {result.success? "passed" : "failed"}
            </Card.Title>
            <Card.Text style={{"color": result.success? "green" : "red"}}>
                {result.message}
            </Card.Text>
            </Card.Body>
        </Card>
    )
    
}

export default Post