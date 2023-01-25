import { createSlice } from '@reduxjs/toolkit'

const initialState = {text: "", timeoutID: null, success: true}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage(state, action) {
            clearTimeout(state.timeoutID)
            return action.payload
        },
        deleteMessageID(state, action) {
            return {...state, timeoutID: null}
        },
        deleteMessageText(state, action) {
            return {...state, text: ""}
        }
    }
})

export const { setMessage, deleteMessageID, deleteMessageText } = messageSlice.actions

export const displayMessage = (success, text) => {
    return (dispatch) => {
        const timeoutID = setTimeout(() => {
            dispatch(deleteMessageID())
        }, 3000)

        dispatch(setMessage({ text, timeoutID, success }))
    }
}

export default messageSlice.reducer