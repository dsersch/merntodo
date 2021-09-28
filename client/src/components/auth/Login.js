import React from 'react';
// import classes from './Login.module.css';
import Card from '../utility/Card';
import Input from '../utility/Input';

const Login = (props) => {
    const onSubmitHandler = (event) => {
        event.preventDefault()
        console.log('log in submitted...')
    }

    return (
        <Card>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <Input label='Email' settings={{
                        id: 'email',
                        type: 'email',
                    }} />
                    <Input label='Password' settings={{
                        id: 'password',
                        type: 'password'
                    }} />
                </div>
                <div>
                    <button type='submit'>Sign in</button>
                </div>
            </form>
        </Card>
    )
}

export default Login;