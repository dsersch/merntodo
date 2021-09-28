import React from 'react';
import classes from './Login.module.css';
import Card from '../utility/Card';
import Input from '../utility/Input';

const Login = (props) => {
    const onSubmitHandler = (event) => {
        event.preventDefault()
        console.log('log in submitted...')
    }

    return (
        <div className={classes.login}>
            <Card>
                <form onSubmit={onSubmitHandler}>
                    <div className={classes.inputs}>
                        <Input label='Email' settings={{
                            id: 'email',
                            type: 'email',
                        }} />
                        <Input label='Password' settings={{
                            id: 'password',
                            type: 'password'
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