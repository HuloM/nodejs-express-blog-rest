import React, {useState, useEffect, useCallback} from 'react'

import AuthContext from './auth-context'

const AuthProvider = props => {
    // state variables that hold user related data if they are logged in.

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')
    const [username, setUsername] = useState('')
    const [userId, setUserId] = useState('')
    const [authError, setAuthError] = useState('')

    const ENDPOINT_URL = 'http://localhost:8080'

    const UserSignupHandler = async authdata => {
        setAuthError('')

        // creates a formData with all of the form inputs that can be passed to the endpoint
        const formData = new FormData()
        formData.append('username', authdata.username)
        formData.append('first_name', authdata.first_name)
        formData.append('last_name', authdata.last_name)
        formData.append('email', authdata.email)
        formData.append('password', authdata.password)
        formData.append('confirmPassword', authdata.confirmPassword)
        console.log(formData)
        // sends a PUT request to the signup endpoint that will use the form data to create a new user
        const response = await fetch(`${ENDPOINT_URL}/signup`, {
            method: 'PUT',
            body: formData
        })
        const data = await response.json()
        if (response.status !== 200) {
            if (response.status !== 422)
            {
                setAuthError('Error signing up user, please try again later')
                return
            }
            // const data = await response.json()
            setAuthError(data.message)
        }
    }

    const UserLoginHandler = async authData => {
        setAuthError('')

        const formData = new FormData()
        formData.append('email', authData.email)
        formData.append('password', authData.password)

        const response = await fetch(`${ENDPOINT_URL}/login`, {
            method: 'POST',
            body: formData
        })
        const data = await response.json()
        if (response.status !== 201) {
            console.log('err')
            if (response.status !== 422 && response.status !== 401)
            {
                setAuthError('Error logging user in, please try again later')
                return
            }
            setAuthError(data.message)
            return
        }

        // sets cached data so the user can retain their login credentials after exiting the website
        const milliseconds = 60 * 60 * 1000
        localStorage.setItem('token', `${data.token}`)
        // cached data will no longer be available after 1hr since last login or re-entry
        const expDate = new Date(new Date().getTime() + milliseconds)
        localStorage.setItem('expiryDate', expDate.toISOString())

        setToken(`${data.token}`)
        setUsername(data.username)
        setUserId(data.userId)

        localStorage.setItem('username', data.username)
        localStorage.setItem('userId', data.userId)

        AutoLogoutUserHandler(milliseconds)

        setIsLoggedIn(true)
    }

    const AutoLogoutUserHandler = useCallback((milliseconds) => {
        setTimeout(() => {
            LogoutUserHandler()
        }, milliseconds)
    }, [])

    const LogoutUserHandler = () => {
        // when user logs out, remove all cached data and reset states to default
        setIsLoggedIn(false)
        setToken('')
        setUsername('')
        setUserId('')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('userId')
        localStorage.removeItem('expiryDate')
    }

    const ClickAuthModalError = () => {
        setAuthError('')
    }

    useEffect(() => {
        // when first initialized, look for cached data to log user back in
        const cookieToken = localStorage.getItem('token')
        const expiryDate = localStorage.getItem('expiryDate')
        if (!cookieToken || !expiryDate) {
            return
        }
        if (new Date(expiryDate) <= new Date()) {
            LogoutUserHandler()
            return
        }
        const cookieUsername = localStorage.getItem('username')
        const cookieUserId = localStorage.getItem('userId')
        setToken(cookieToken)
        setUsername(cookieUsername)
        setUserId(cookieUserId)
        const milliseconds = 60 * 60 * 1000

        const expDate =
            new Date(new Date().getTime() + milliseconds).toISOString()
        localStorage.setItem('expiryDate', expDate)

        setIsLoggedIn(true)
        AutoLogoutUserHandler(milliseconds)
    }, [AutoLogoutUserHandler])

    // pass auth context values to AuthContext provider
    const authContext = {
        token,
        username,
        userId,
        isLoggedIn,
        authError,
        ClickAuthModalError,
        UserSignupHandler,
        UserLoginHandler,
        LogoutUserHandler,
    }

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider