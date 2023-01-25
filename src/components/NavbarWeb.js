import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../reducers/userReducer"
import { Container, Nav, Navbar } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'
import { useState } from "react"

const NavbarWeb = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [expanded, setExpanded] = useState(false)

    return (
        <Navbar bg="light" expanded={expanded} expand="sm"  >
            <Container>
                <LinkContainer to="/"><Navbar.Brand>Learn Code</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" 
                    onClick={()=>setExpanded(!expanded)} 
                    onBlur={() => setExpanded(false)}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    {   user ?
                        <Nav>
                            <LinkContainer to="/"><Nav.Link>HomePage</Nav.Link></LinkContainer>
                            <LinkContainer to="/tests"><Nav.Link>Problems</Nav.Link></LinkContainer>
                            <LinkContainer to={`/users/${user.id}`}>
                                <Nav.Link>{user.admin ? 'Admin' : 'User'} {user.name}</Nav.Link>
                            </LinkContainer>
                            <Nav.Link onClick={() => {
                                if (window.confirm("Do you really want to logout?"))
                                    { dispatch(logoutUser()) }
                            }}>
                                Logout
                            </Nav.Link> 
                        </Nav> :
                        <Nav>
                            <LinkContainer to="/"><Nav.Link>HomePage</Nav.Link></LinkContainer>
                            <LinkContainer to="/tests"><Nav.Link>Problems</Nav.Link></LinkContainer>
                            <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer>
                            <LinkContainer to="/register"><Nav.Link>Register</Nav.Link></LinkContainer>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarWeb