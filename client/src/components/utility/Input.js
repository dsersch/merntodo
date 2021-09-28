import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    return (
        <div className={classes['form-element']}>
            <label htmlFor={props.settings.id}>{props.label}</label>
            <input {...props.settings}/>
        </div>
    )
}

export default Input;