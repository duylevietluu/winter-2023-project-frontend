import { createSlice } from '@reduxjs/toolkit'
import testService from '../services/tests'
import { displayMessage } from './messageReducer'

const testsSlice = createSlice({
    name: 'tests',
    initialState: [],
    reducers: {
        setTests(state, action) {
            return action.payload
        },
        appendTest(state, action) {
            state.push(action.payload)
        },
    },
})

const { setTests, appendTest } = testsSlice.actions

export const initializeTests = () => {
    return async dispatch => {
        const tests = await testService.getAll()
        dispatch(setTests(tests))
    }
}

export const createTest = (testInfo, afterCreate) => {
    return async dispatch => {
        try {
            const newTest = await testService.create(testInfo)
            dispatch(appendTest({ title: newTest.title, id: newTest.id }))

            dispatch(displayMessage(true, `created new test ${newTest.title}`))
            afterCreate()
        } catch(error) {
            if (error.response === undefined || error.response.data === undefined) {
                dispatch(displayMessage(false, 'ERROR: unknown error, see console'))
                console.error(error.response || error)
            }
            else {
                dispatch(displayMessage(false, error.response.data.error))
            }
        }
    }
}

export default testsSlice.reducer
