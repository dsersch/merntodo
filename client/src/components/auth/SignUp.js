import React from 'react';
import useInput from '../../hooks/use-input';
import jwtDecode from 'jwt-decode';
import classes from './SignUp.module.css';
import Card from '../utility/Card'
import Input from '../utility/Input'

const SignUp = (props) => {
    const {
        value: enteredUserName,
        isValid: userNameIsValid,
        hasError: userNameHasError,
        valueChangeHandler: onUserNameChange,
        inputBlurHandler: onUserNameBlur,
        reset: resetUserName,
    } = useInput(value => value.trim().length >= 5);

    const {
        value: enteredName,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: onNameChange,
        inputBlurHandler: onNameBlur,
        reset: resetName,
    } = useInput(value => value.trim().length >= 2);

    const {
        value: enteredEmail,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: onEmailChange,
        inputBlurHandler: onEmailBlur,
        reset: resetEmail,
    } = useInput(value => value.includes('@'));

    const {
        value: enteredPassword,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: onPasswordChange,
        inputBlurHandler: onPasswordBlur,
        reset: resetPassword,
    } = useInput(value => value.trim().length >= 6);

    const {
        value: enteredConfirmPassword,
        isValid: confirmPasswordIsValid,
        hasError: confirmPasswordHasError,
        valueChangeHandler: onConfirmPasswordChange,
        inputBlurHandler: onConfirmPasswordBlur,
        reset: resetConfirmPassword,
    } = useInput(value => value.trim().length >= 6);

    const signUp = async (data) => {
        try {
                const res = await fetch('/auth/register', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json"
                    }
                })
        
                const result = await res.json();
        
                if(result.token) {
                    const user = jwtDecode(result.token).id
                    localStorage.setItem('token', result.token)
                    props.signup(user);
                } else {
                    console.log(result)
                }
        } catch (err) {
            console.log(err);
        }
    }

    let formIsValid = false;

    if (userNameIsValid && nameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid && (enteredPassword === enteredConfirmPassword)) {
        formIsValid = true;
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        onUserNameBlur();
        onNameBlur();
        onEmailBlur();
        onPasswordBlur();
        onConfirmPasswordBlur();

        const data = {
            userName: enteredUserName,
            firstName: enteredName,
            email: enteredEmail,
            password: enteredPassword,
        }

        if (enteredPassword !== enteredConfirmPassword) {
            resetPassword();
            onPasswordBlur();
            resetConfirmPassword();
            onConfirmPasswordBlur();
          return console.log('passwords dont match....')
        } 

        if (formIsValid) {
            signUp(data);
            resetUserName();
            resetName();
            resetEmail();
            resetPassword();
            resetConfirmPassword();
        }
    }

    return (
        <div className={classes['sign-up']}>
            <Card>
                <form onSubmit={onSubmitHandler}>
                    <div className={classes.inputs}>
                        <Input hasError={userNameHasError}
                            message='User Name must be at least 5 characters long...'
                            label='User Name'
                            settings={{
                                id: 'user-name',
                                type: 'text',
                                value: enteredUserName,
                                onChange: onUserNameChange,
                                onBlur: onUserNameBlur,
                            }}
                        />
                        <Input hasError={nameHasError}
                            message='Name must be at least 2 characters long...'
                            label='First Name'
                            settings={{
                                id: 'first-name',
                                type: 'text',
                                value: enteredName,
                                onChange: onNameChange,
                                onBlur: onNameBlur,
                            }}
                        />
                        <Input hasError={emailHasError}
                            message='Email must contain an @ symbol...'
                            label='Email'
                            settings={{
                                id: 'email',
                                type: 'email',
                                value: enteredEmail,
                                onChange: onEmailChange,
                                onBlur: onEmailBlur,
                            }} 
                        />
                        <Input hasError={passwordHasError} 
                            message='Password must be at least 6 characters long...'
                            label='Password' 
                            settings={{
                                id: 'password',
                                type: 'password',
                                value: enteredPassword,
                                onChange: onPasswordChange,
                                onBlur: onPasswordBlur,
                            }} 
                        />
                        <Input hasError={confirmPasswordHasError}
                            message='Password must be at least 6 characters long...' 
                            label='Confirm Password' 
                            settings={{
                                id: 'confirm-password',
                                type: 'password',
                                value: enteredConfirmPassword,
                                onChange: onConfirmPasswordChange,
                                onBlur: onConfirmPasswordBlur,
                            }}
                        />
                    </div>
                    <div className={classes['form-controls']}>
                        <button type='submit'>Sign Up</button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default SignUp;