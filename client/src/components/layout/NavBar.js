import React from 'react';
import classes from './NavBar.module.css';

const NavBar = (props) => {
    return (
        <nav className={classes['nav-bar']}>
            <h1>Mern ToDo</h1>
            <ul>
                <li>Sign up</li>
                <li>Log In</li>
            </ul>
        </nav>
    )
}

export default NavBar;