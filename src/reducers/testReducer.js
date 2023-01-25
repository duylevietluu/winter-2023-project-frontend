import { createSlice } from '@reduxjs/toolkit'
import testService from '../services/tests'
import { displayMessage } from './messageReducer'

const testSlice = createSlice({
    name: 'test',
    initialState: null,
    reducers: {
        setTest(state, action) {
            return action.payload
        },
        // appendPost(state, action) {
        //     const { id, comment } = action.payload
        //     return state.map(item => item.id === id ? {...item, comments: item.comments.concat(comment)} : item)
        // }
    },
})

const { setTest } = testSlice.actions

export const setTestId = (id) => {
    return async dispatch => {
        try {
            const test = await testService.getTest(id)
            dispatch(setTest(test))
        }
        catch (error) {
            dispatch(setTest(null))
            dispatch(displayMessage(false, `test with id ${id} not found!`))
        }
    }
}

export const createPost = (testId, content, afterSubmit) => {
    return async dispatch => {
        try {
            if (content) {
                dispatch(displayMessage(true, `your code is submitted to the server and being graded!`))
            }
            const post = await testService.createPost(testId, content)
            afterSubmit(post.id)
        } catch(error) {
            dispatch(displayMessage(false, `error: ${error.response.data.error}`))
        }
    }
}

export default testSlice.reducer
