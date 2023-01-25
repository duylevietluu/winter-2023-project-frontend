import { useEffect, useState } from 'react'
import axios from 'axios'

const useResource = (baseUrl, startToken = null) => {
    const [resources, setResources] = useState([])
    let token = startToken

    useEffect(() => {
        const config = { headers: { Authorization: token } }
        axios.get(baseUrl, config).then(response => {setResources(response.data)})
    }, [baseUrl, token])

    const setToken = newToken => {
        if (newToken) {
            token = `bearer ${newToken}`
        }
        else {
            token = null
        }
    }

    const getAll = () => {
        const config = { headers: { Authorization: token } }

        axios
            .get(baseUrl, config)
            .then(response => {
                setResources(response.data)
                // return response.data
            })
    }
  
    const create = (newObject) => {
        const config = { headers: { Authorization: token } }

        axios
            .post(baseUrl, newObject, config)
            .then(response => {
                setResources(resources.concat(response.data))
                // return response.data
            })
    }

    const get = async(id) => {
        const config = { headers: { Authorization: token } }

        const response = await axios.get(`${baseUrl}/${id}`, config)
        return response.data
    }

    const service = {
        setToken,
        getAll,
        get,
        create
    }
  
    return [
        resources, 
        service
    ]
}

export default useResource