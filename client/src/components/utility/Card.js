import React from 'react';
import classes from './Card.module.css';

const Card = (props) => {
    let classList;
    props.className ? classList = `${classes.card} ${props.className}` : classList = `${classes.card}`
    
    return (
        <div className={classList}>{props.children}</div>
    )
}

export default Card;