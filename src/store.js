import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './reducers/messageReducer'
import testReducer from './reducers/testReducer'
import testsReducer from './reducers/testsReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
    reducer: {
        message: messageReducer,
        user: userReducer,
        tests: testsReducer,
        test: testReducer,
    }
})
  
export default store