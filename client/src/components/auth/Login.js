import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import classes from './Login.module.css';
import Card from '../utility/Card';
import Input from '../utility/Input';

const Login = (props) => {
    const [ enteredEmail, setEnteredEmail ] = useState('');
    const [ enteredPassword, setEnteredPassword ] = useState('');

    const onEmailChange = (event) => {
        setEnteredEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setEnteredPassword(event.target.value)
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
        login(enteredEmail, enteredPassword)
    }

    return (
        <div className={classes.login}>
            <Card>
                <form onSubmit={onSubmitHandler}>
                    <div className={classes.inputs}>
                        <Input label='Email' settings={{
                            id: 'email',
                            type: 'email',
                            value: enteredEmail,
                            onChange: onEmailChange,
                        }} />
                        <Input label='Password' settings={{
                            id: 'password',
                            type: 'password',
                            value: enteredPassword,
                            onChange: onPasswordChange,
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