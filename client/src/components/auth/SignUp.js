import React from 'react';
import classes from './SignUp.module.css';
import Card from '../utility/Card'
import Input from '../utility/Input'

const SignUp = (props) => {
    const onSubmitHandler = (event) => {
        event.preventDefault()
        console.log('form submitted...')
    }

    return (
        <Card>
            <form onSubmit={onSubmitHandler}>
                <div className={classes.inputs}>
                    <Input label='User Name' settings={{
                        id: 'user-name',
                        type: 'text',
                    }} />
                    <Input label='First Name' settings={{
                        id: 'first-name',
                        type: 'text',
                    }} />
                    <Input label='Email' settings={{
                        id: 'email',
                        type: 'email',
                    }} />
                    <Input label='Password' settings={{
                        id: 'password',
                        type: 'password',
                    }} />
                </div>
                <div className={classes.controls}>
                    <button type='submit'>Sign Up</button>
                </div>
            </form>
        </Card>
    )
}

export default SignUp;