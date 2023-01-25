import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/tests'
const basePostUrl = 'http://localhost:8080/api/posts'

let token = null
let config = { headers: { Authorization: token } }

const setToken = newToken => {
    if (newToken) {
        token = `bearer ${newToken}`
        config = { headers: { Authorization: token } }
    }
    else {
        token = null
        config = { headers: { Authorization: null } }
    }
}

// just titles & ids
const getAll = async() => {
    const response = await axios.get(baseUrl, config)
    return response.data
}

// no posts: no config
const getTest = async(id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const create = async(newObject) => {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const getPosts = async(testId) => {
    const response = await axios.get(`${baseUrl}/${testId}/posts`, config)
    return response.data
}

const createPost = async(id, content) => {
    const response = await axios.post(`${baseUrl}/${id}/posts`, { content }, config)
    return response.data
}

const getPost = async(postId) => {
    const response = await axios.get(`${basePostUrl}/${postId}`, config)
    return response.data
}

// const update = async(id, newObject) => {
//     const response = await axios.put(`${ baseUrl }/${id}`, newObject)
//     return response.data
// }

// const remove = async (id) => {
//     const config = {
//         headers: { Authorization: token },
//     }

//     const response = await axios.delete(`${ baseUrl }/${id}`, config)

//     return response.data
// }

const testService = { getAll, getTest, setToken, create, getPosts, createPost, getPost }

export default testService