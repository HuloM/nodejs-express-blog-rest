import React from 'react'

const AuthContext = React.createContext({
    token: '',
    username: '',
    userId: '',
    isLoggedIn: false,
    authError: '',
    ClickAuthModalError: () => {},
    UserSignupHandler: (authdata) => {},
    UserLoginHandler: (authData) => {},
    LogoutUserHandler: () => {}
})

export default AuthContext