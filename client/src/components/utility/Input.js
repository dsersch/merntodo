import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    
    return (
        <div className={classes['form-element']}>
            <label htmlFor={props.settings.id}>{props.label}</label>
            <input className={props.hasError ? classes.invalid : ''} {...props.settings}/>
            {props.hasError && <p>{props.message}</p>}
        </div>
    )
}

export default Input;