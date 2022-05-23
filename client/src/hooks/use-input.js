import {useState} from 'react'

const useInput = (validator, defaultValue=null) => {
    const [enteredInput, setEnteredInput] = useState(defaultValue || '')
    const [enteredInputTouched, setEnteredInputTouched] = useState(false)

    const enteredInputIsValid = validator(enteredInput)
    const inputIsInvalid = !enteredInputIsValid && enteredInputTouched

    const inputChangeHandler = event => {
        setEnteredInput(event.target.value)
    }

    const inputBlurHandler = () => {
        setEnteredInputTouched(true)
    }

    const resetOnFormSubmitHandler = () => {
        setEnteredInput('')
        setEnteredInputTouched(false)
    }

    return {
        enteredInput,
        enteredInputIsValid,
        inputIsInvalid,
        inputChangeHandler,
        inputBlurHandler,
        resetOnFormSubmitHandler
    }
}

export default useInput