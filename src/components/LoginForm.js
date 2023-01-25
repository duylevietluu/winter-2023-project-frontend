import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { loginUser } from "../reducers/userReducer"
import useField from "../hooks/useField"
import { Button, Container, Form, FormLabel } from "react-bootstrap"

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {reset: usernameReset, ...username} = useField('username', 'text')
    const {reset: passwordReset, ...password} = useField('password', 'password')

    const handleSubmit = event => {
        event.preventDefault()
        dispatch(loginUser({ username: username.value, password: password.value }, () => {
            usernameReset()
            passwordReset()
            navigate('/')
        }))
    }

    return (<Container className={"col-12 col-md-6 col-lg-5"}>
        <h3 className="text-center">Log In</h3>
        <Form onSubmit={handleSubmit}>
            <FormLabel>Username:</FormLabel>
            <Form.Control {...username} />
            <FormLabel>Password:</FormLabel>
            <Form.Control {...password} />
            <Button type="submit">Login</Button>
        </Form>
    </Container>)
}

export default LoginForm