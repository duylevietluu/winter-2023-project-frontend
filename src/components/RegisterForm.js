// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { registerUser } from "../reducers/userReducer"
import { useState } from "react"
import { Button, Container, Form, FormLabel } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import useField from "../hooks/useField"
import { registerUser } from "../reducers/userReducer"

const RegisterForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {reset: nameReset, ...name} = useField('name', 'text')
    const {reset: usernameReset, ...username} = useField('username', 'text')
    const {reset: passwordReset, ...password} = useField('password', 'password')
    const {reset: adminCodeReset, ...adminCode} = useField('adminCode', 'password')
    const [count, setCount] = useState(0)

    const handleSubmit = event => {
        event.preventDefault()
        setCount(count + 1)
        dispatch(registerUser({ 
            username: username.value, 
            password: password.value,
            name: name.value,
            adminCode: adminCode.value
        }, () => {
            navigate('/')
            nameReset()
            usernameReset()
            passwordReset()
            adminCodeReset()
            setCount(0)
        }))
    }

    return (
        <Container className={"col-12 col-md-6 col-lg-5"}>
            <h3 className="text-center">Register</h3>
            <Form onSubmit={handleSubmit}>
                <FormLabel>Name:</FormLabel>
                <Form.Control {...name} />
                <FormLabel>Username:</FormLabel>
                <Form.Control {...username} />
                <FormLabel>Password:</FormLabel>
                <Form.Control {...password} />
                {
                    (count >= 5) ?
                    <>
                        <FormLabel>Admin Code</FormLabel>
                        <Form.Control {...adminCode} />
                    </> :
                    null
                }
                <Button type="submit">Register</Button>
            </Form>
        </Container>
    )
    
    // <>
    //     <h3>Register</h3>
        
    //     <form onSubmit={handleSubmit}>
    //         <div>
    //             name: <input {...name} />
    //         </div>
    //         <div>
    //             username: <input {...username} />
    //         </div>
    //         <div>
    //             password: <input {...password} />
    //         </div>
    //         {
    //             (count >= 5) ? 
    //             <div>adminCode: <input {...adminCode} /></div> :
    //             null
    //         }
    //         <button type="submit">register</button>
    //     </form>
    // </>)
}

export default RegisterForm