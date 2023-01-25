import { Container, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import userService from "../services/users"

const { useState, useEffect } = require("react")
const { useParams } = require("react-router-dom")

const UserPage = () => {
    const id = useParams().id
    const [userView, setUserView] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        setMessage("loading...")

        userService
            .getUser(id)
            .then(res => {setUserView(res)})
            .catch(() => {
                setUserView(null)
                setMessage("User not found!")
            })
    }, [id])

    if (!userView) {
        return (<Container>{message}</Container>)
    }

    return (<Container>
        <h2>Coder {userView.username}</h2>
        <div>Name: {userView.name}</div>
        <div>Role: {userView.admin? "Admin" : "User"}</div>
        <div>Submissions added: {userView.posts.length}</div>
        <div>Submissions history: </div>
        
        <Table striped>
            <tbody>
            {[...userView.posts].reverse().map(post => 
                <tr key={post.id}>
                    <td>
                        <Link to={`/posts/${post.id}`}>{post.test.title}</Link> <strong>{post.grade}</strong>
                    </td>
                </tr>)}
            </tbody>
        </Table>
        
    </Container>)
}

export default UserPage