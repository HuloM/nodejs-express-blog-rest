import './App.css'
import Header from './components/UI/Header/Header'
import Posts from './components/Posts/Posts'
import PostForm from './components/Posts/Post/PostForm/PostForm'
import {useState, useContext} from 'react'
import LoginForm from './components/LoginForm/LoginForm'
import SignupForm from './components/SignupForm/SignupForm'
import authContext from './context/AuthContext/auth-context'

function App() {
    const ctx = useContext(authContext)
    const [content, setContent] = useState(<Posts/>)
    const [contentStateString, setContentStateString] = useState('posts')

    const OpenLoginFormHandler = () => {
        setContent(<LoginForm/>)
        setContentStateString('Login form')
    }

    const OpenSignupFormHandler = () => {
        setContent(<SignupForm/>)
        setContentStateString('Sign up form')
    }

    const OpenPostFormHandler = () => {
        setContent(<Posts/>)
        setContentStateString('posts')
    }
    return (
        <div className='bg-gray-600 h-screen'>
            <Header onLoginButtonClick={OpenLoginFormHandler} onSignupButtonClick={OpenSignupFormHandler}
                    onPostButtonClick={OpenPostFormHandler} isLoggedIn={ctx.isLoggedIn}
            />
            <div className='grid grid-flow-row auto-rows-auto gap-20 bg-gray-600 justify-center'>
                <div>
                    {content}
                    {ctx.isLoggedIn && contentStateString === 'posts' && <PostForm/>}
                </div>
            </div>
        </div>
    )
}

export default App
