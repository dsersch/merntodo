import React from 'react';
import useInput from '../../hooks/use-input';
import jwtDecode from 'jwt-decode';
import classes from './Login.module.css';
import Card from '../utility/Card';
import Input from '../utility/Input';

const Login = (props) => {
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
     } = useInput(value => value.trim().length > 5);

    let formIsValid = false;

    if (emailIsValid && passwordIsValid) {
        formIsValid = true;
    }

    const login = async (email, password) => {
        try {
            const res = await fetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: {
                    "Content-type": "application/json"
                },
            })

            const result = await res.json();

            if(result.token) {
                const user = jwtDecode(result.token).id
                localStorage.setItem('token', result.token)
                props.login(user);
            } else {
                console.log(result)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        onEmailBlur()
        onPasswordBlur()

        if (formIsValid) {
            login(enteredEmail, enteredPassword)
            resetEmail()
            resetPassword()
        }
        
    }

    return (
        <div className={classes.login}>
            <Card>
                <form onSubmit={onSubmitHandler}>
                    <div className={classes.inputs}>
                        <Input hasError={emailHasError} label='Email' settings={{
                            id: 'email',
                            type: 'email',
                            value: enteredEmail,
                            onChange: onEmailChange,
                            onBlur: onEmailBlur,
                        }} />
                        <Input hasError={passwordHasError} label='Password' settings={{
                            id: 'password',
                            type: 'password',
                            value: enteredPassword,
                            onChange: onPasswordChange,
                            onBlur: onPasswordBlur,
                        }} />
                    </div>
                    <div className={classes['form-controls']}>
                        <button type='submit'>Sign in</button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default Login;