import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import classes from './SignUp.module.css';
import Card from '../utility/Card'
import Input from '../utility/Input'

const SignUp = (props) => {
    const [ enteredUserName, setEnteredUserName ] = useState('');
    const [ enteredEmail, setEnteredEmail ] = useState('');
    const [ enteredFirstName, setEnteredFirstName ] = useState('');
    const [ enteredPassword, setEnteredPassword ] = useState('');
    const [ enteredConfirmPassword, setEnteredConfirmPassword ] = useState('')

    const onUserNameChange = (event) => {
        setEnteredUserName(event.target.value)
    }

    const onFirstNameChange = (event) => {
        setEnteredFirstName(event.target.value)
    }

    const onEmailChange = (event) => {
        setEnteredEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setEnteredPassword(event.target.value)
    }

    const onConfirmPasswordChange = (event) => {
        setEnteredConfirmPassword(event.target.value)
    }

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

    const onSubmitHandler = (event) => {
        event.preventDefault()
        const data = {
            userName: enteredUserName,
            firstName: enteredFirstName,
            email: enteredEmail,
            password: enteredPassword,
        }

        if (enteredPassword !== enteredConfirmPassword) {
          return console.log('passwords dont match....')
        } 

        signUp(data)
    }

    return (
        <div className={classes['sign-up']}>
            <Card>
                <form onSubmit={onSubmitHandler}>
                    <div className={classes.inputs}>
                        <Input label='User Name' settings={{
                            id: 'user-name',
                            type: 'text',
                            value: enteredUserName,
                            onChange: onUserNameChange,
                        }} />
                        <Input label='First Name' settings={{
                            id: 'first-name',
                            type: 'text',
                            value: enteredFirstName,
                            onChange: onFirstNameChange,
                        }} />
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
                        <Input label='Confirm Password' settings={{
                            id: 'confirm-password',
                            type: 'password',
                            value: enteredConfirmPassword,
                            onChange: onConfirmPasswordChange,
                        }} />
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