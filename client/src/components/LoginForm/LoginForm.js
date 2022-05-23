import {useContext, useCallback} from 'react'
import authContext from '../../context/AuthContext/auth-context'
import useInput from '../../hooks/use-input'

const LoginForm = () => {
    const ctx = useContext(authContext)
    let formIsValid = false

    const {
        enteredInput: passwordInput,
        enteredInputIsValid: passwordIsValid,
        inputIsInvalid: passwordIsInvalid,
        inputBlurHandler: passwordBlurHandler,
        inputChangeHandler: passwordChangeHandler,
        resetOnFormSubmitHandler: resetPassword
    } = useInput(useCallback(
        input => input.trim() !== '' && input.length > 8
    , []))

    const {
        enteredInput: emailInput,
        enteredInputIsValid: emailIsValid,
        inputIsInvalid: emailIsInvalid,
        inputBlurHandler: emailBlurHandler,
        inputChangeHandler: emailChangeHandler,
        resetOnFormSubmitHandler: resetEmail
    } = useInput(useCallback(input => input.trim() !== '' && input.includes('@') && input.length > 4, []))

    const FormSubmitHandler = event => {
        event.preventDefault()
        const email = emailInput
        const password = passwordInput
        ctx.UserLoginHandler({email: email, password: password})
        resetPassword()
        resetEmail()
    }
    if (emailIsValid && passwordIsValid)
        formIsValid = true

    return (
        <div className='pt-4 flex h-fit'>
            <form className='card bg-gray-500 justify-between grow w-96' onSubmit={FormSubmitHandler}>
                <div>
                    <h2 className='font-bold text-center text-white'>Login</h2>
                </div>
                {ctx.authError !== '' && <div className='bg-gray-800 text-center justify-center mt-3 rounded'>
                    <p className='text-rose-600'>{ctx.authError}</p>
                </div>}
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
                <button disabled={!formIsValid} type='submit'
                        className={`rounded-full 
                        ${formIsValid ? 'bg-gray-900 hover:bg-blue-700' : 'bg-gray-600'} text-white px-4 py-2 mt-1`}>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginForm