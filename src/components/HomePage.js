import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

const HomePage = () => {
    const style = {
        "paddingTop": "2rem",
        "paddingBottom": "2rem"
    }

    return (
        <Container>
            <h1 className="text-center" style={style}>Web Code Learning</h1>
            <Row>
                <Col xs='12' md='6' style={style}>
                    <h3>Learn by practicing</h3>
                    <div>Learn how to code in Python by solving simple problems! There are 10+ problems for you to challenge yourselves in coding. Please don't hesitate to learn, try and fail. Have fun! Happy hacking!</div>
                </Col>
                <Col xs='12' md='6' style={style}>
                    <h3>Problem format</h3>
                    <div>Each problem is written by the Admin team. You can try solving by clicking on <Link to="/tests">Problems</Link>. Each problem has a number of test cases, and you get grades based on the percentage of the test cases passed.</div>
                </Col>
            </Row>
            
            <Row>
                <Col xs='12' md='6' style={style}>
                    <h3>Developed by Duy</h3>
                    <div>
                        This is the result of <a href="https://github.com/OberlinCollaborativeCodingWinterTerm/winter-term-project-webcodelearning" target='#'>Duy Le's Winter Term project</a>. 
                        I have developed this website full-stack by JavaScript, and deployed this website to the Internet using <a href='https://fly.io/' target='#'>Fly.io</a>.
                    </div>
                </Col>
                <Col xs='12' md='6' style={style}>
                    <h3>Special thanks</h3>
                    <div>
                        Thank you to the course <a href="https://fullstackopen.com/en" target='#'>Full Stack Open</a> for
                        teaching me the basics of full-stack developing, which grants me knowledge to build this whole website. And thank you to <a href="https://github.com/Jaagrav/CodeX-API" target='#'>Jaagrav's CodeX API</a>, which I used for executing Python code in the server.
                    </div>
                </Col>
            </Row>
            
        </Container>
    )
}

export default HomePage