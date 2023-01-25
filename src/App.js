import './App.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import Message from './components/Message'
import NavbarWeb from './components/NavbarWeb'
import HomePage from './components/HomePage'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import TestPage from './components/TestPage'
import Test from './components/Test'
import UserPage from './components/UserPage'

import { initUser } from './reducers/userReducer'
import Post from './components/Post'

const App = () => {
    const dispatch = useDispatch()

    // AT LOADING PAGE: LOAD PAST USER
    useEffect(() => {
        dispatch(initUser())
    }, [dispatch])

    return (
        <>
            <NavbarWeb />
            <Message />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/tests" element={<TestPage />} />
                <Route path="/tests/:id" element={<Test />} />
                <Route path="/users/:id" element={<UserPage />} />
                <Route path="/posts/:id" element={<Post />} />
                {/*<Route path="/users" element={<Users /> } />
                <Route path="/users/:id" element={<User />} />
                <Route path="/blogs/:id" element={<Blog />} /> */}
            </Routes>
            
        </>
    )
}

export default App

