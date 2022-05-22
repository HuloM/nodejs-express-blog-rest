import {useCallback, useContext, useState} from 'react'
import useInput from '../../hooks/use-input'
import authContext from '../../context/AuthContext/auth-context'

const SignupForm = props => {
    let formIsValid = false
    const ctx = useContext(authContext)

    const [confirmPassword, setConfirmPassword] = useState('')
    const confirmPasswordChangeHandler = event => {
        setConfirmPassword(event.target.value)
    }

    const {
        enteredInput: usernameInput,
        enteredInputIsValid: usernameIsValid,
        inputIsInvalid: usernameIsInvalid,
        inputBlurHandler: usernameBlurHandler,
        inputChangeHandler: usernameChangeHandler,
        resetOnFormSubmitHandler: resetUsername
    } = useInput(useCallback(input => input.trim() !== '' && input.length > 8, []))

    const {
        enteredInput: firstnameInput,
        enteredInputIsValid: firstnameIsValid,
        inputIsInvalid: firstnameIsInvalid,
        inputBlurHandler: firstnameBlurHandler,
        inputChangeHandler: firstnameChangeHandler,
        resetOnFormSubmitHandler: resetFirstname
    } = useInput(useCallback(input => input.trim() !== '', []))

    const {
        enteredInput: lastnameInput,
        enteredInputIsValid: lastnameIsValid,
        inputIsInvalid: lastnameIsInvalid,
        inputBlurHandler: lastnameBlurHandler,
        inputChangeHandler: lastnameChangeHandler,
        resetOnFormSubmitHandler: resetLastname
    } = useInput(useCallback(input => input.trim() !== '', []))

    const {
        enteredInput: emailInput,
        enteredInputIsValid: emailIsValid,
        inputIsInvalid: emailIsInvalid,
        inputBlurHandler: emailBlurHandler,
        inputChangeHandler: emailChangeHandler,
        resetOnFormSubmitHandler: resetEmail
    } = useInput(useCallback(input => input.trim() !== '' && input.includes('@') && input.length > 4, []))

    const {
        enteredInput: passwordInput,
        enteredInputIsValid: passwordIsValid,
        inputIsInvalid: passwordIsInvalid,
        inputBlurHandler: passwordBlurHandler,
        inputChangeHandler: passwordChangeHandler,
        resetOnFormSubmitHandler: resetPassword
    } = useInput(useCallback(
        input => input.trim() !== '' && input.length > 8 && input === confirmPassword, [confirmPassword]
    ))
    
    const FormSubmitHandler = event => {
        event.preventDefault()
        const form = {
            email: emailInput,
            first_name: firstnameInput,
            last_name: lastnameInput,
            username: usernameInput,
            password: passwordInput,
            confirmPassword,
        }
        ctx.UserSignupHandler(form)
        resetUsername('')
        resetEmail('')
        resetFirstname('')
        resetLastname('')
        resetPassword('')
        setConfirmPassword('')
    }
    if (emailIsValid && usernameIsValid && passwordIsValid && firstnameIsValid && lastnameIsValid)
        formIsValid = true

    return (
        <div className='pt-4 flex h-fit'>
            <form className='card bg-gray-500 justify-between grow w-96' onSubmit={FormSubmitHandler}>
                <div>
                    <h2 className='font-bold text-center text-white'>Create a New Account</h2>
                </div>
                {ctx.authError !== '' && <div className='bg-gray-800 text-center justify-center mt-3 rounded'>
                    <p className='text-rose-600'>{ctx.authError}</p>
                </div>}
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className={`${usernameIsInvalid && 'text-red-700'}`}>Username</span>
                        <input type='text' className={`form-input rounded block w-full text-black 
                                ${usernameIsInvalid && 'border-red-700 border-2'}`}
                                onChange={usernameChangeHandler} value={usernameInput} onBlur={usernameBlurHandler}/>
                    </label>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className={`${firstnameIsInvalid && 'text-red-700'}`}>First Name</span>
                        <input type='text' className={`form-input rounded block w-1/2 text-black 
                                ${firstnameIsInvalid && 'border-red-700 border-2'}`}
                                onChange={firstnameChangeHandler} value={firstnameInput} onBlur={firstnameBlurHandler}/>
                        <span className={`${lastnameIsInvalid && 'text-red-700'}`}>Last Name</span>
                        <input type='text' className={`form-input rounded block w-1/2 text-black 
                                ${lastnameIsInvalid && 'border-red-700 border-2'}`}
                                onChange={lastnameChangeHandler} value={lastnameInput} onBlur={lastnameBlurHandler}/>
                    </label>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className={`${emailIsInvalid && 'text-red-700'}`}>Email</span>
                        <input type='email' className={`form-input rounded block w-full text-black 
                                ${emailIsInvalid && 'border-red-700 border-2'}`}
                                onChange={emailChangeHandler} value={emailInput} onBlur={emailBlurHandler}/>
                    </label>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className={`${passwordIsInvalid && 'text-red-700'}`}>Password</span>
                        <input type='password' className={`form-input rounded block w-full text-black 
                                ${passwordIsInvalid && 'border-red-700 border-2'}`}
                                onChange={passwordChangeHandler} value={passwordInput} onBlur={passwordBlurHandler}/>
                    </label>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className='text-white'>Confirm Password</span>
                        <input type='password' className='form-input rounded block w-full text-black' value={confirmPassword} 
                                onChange={confirmPasswordChangeHandler}/>
                    </label>
                </div>
                <button disabled={!formIsValid} type='submit'
                        className={`rounded-full 
                        ${formIsValid ? 'bg-gray-900 hover:bg-blue-700' : 'bg-gray-600'} text-white px-4 py-2 mt-1`}>
                    Sign up
                </button>
            </form>
        </div>
    )
}

export default SignupForm