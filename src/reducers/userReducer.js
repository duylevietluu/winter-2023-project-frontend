import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import testService from '../services/tests'
import { displayMessage } from './messageReducer'
import userService from '../services/users'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        // this is to grab window's localStorage data
        initUser(state, action) {
            const loggedUserJSON = window.localStorage.getItem('loggedDuyCodeUser')
            if (loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON)
                testService.setToken(user.token)
                return user
            } else {
                return null
            }
        },
        setUser(state, action) {
            return action.payload
        },
    },
})

export const { setUser, initUser } = userSlice.actions

export const loginUser = (userLogInfo, afterLogin) => {
    return async dispatch => {
        try {            
            const user = await loginService.login(userLogInfo)
            
            dispatch(setUser(user))
            dispatch(displayMessage(true, 'login successfully'))
            
            // set token
            testService.setToken(user.token)
            window.localStorage.setItem('loggedDuyCodeUser', JSON.stringify(user))

            afterLogin()
        } catch(error) {
            console.log(error)
            dispatch(displayMessage(false, 'error: wrong credentials'))
        }
    }
}

export const logoutUser = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedDuyCodeUser')
        testService.setToken(null)
        dispatch(setUser(null))
        dispatch(displayMessage(true, 'logout successfully'))
    }
}

export const registerUser = (userRegisterInfo, afterRegister) => {
    return async dispatch => {
        try {
            await userService.create(userRegisterInfo)
            const user = await loginService.login({
                username: userRegisterInfo.username, 
                password: userRegisterInfo.password
            })

            dispatch(setUser(user))
            dispatch(displayMessage(true, `registered successfully as ${userRegisterInfo.name}`))

            // set token
            testService.setToken(user.token)
            window.localStorage.setItem('loggedDuyCodeUser', JSON.stringify(user))

            afterRegister()
        } catch(error) {
            dispatch(displayMessage(false, `error: ${error.response.data.error}`))
        }
    }
}

export default userSlice.reducer
