import React from 'react';
import classes from './NavBar.module.css';

const NavBar = (props) => {
    let buttonText;
    if(props.status) {
        buttonText = "Sign Up"
    } else {
        buttonText = 'Log In'
    }

    return (
        <nav className={classes['nav-bar']}>
            <h1>Mern ToDo</h1>
            <ul>
                {!props.loggedIn && <li onClick={props.login}>{buttonText}</li>}
                {props.loggedIn && <li onClick={props.logout}>Log Out</li>}
            </ul>
        </nav>
    )
}

export default NavBar;