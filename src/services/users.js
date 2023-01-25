import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/users'

const getAll = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async(newObject) => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

const getUser = async(id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const userService = { getAll, create, getUser }

export default userService