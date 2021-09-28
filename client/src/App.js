import React, { useState } from 'react';
import classes from './App.module.css';
import NavBar from './components/layout/NavBar';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import ToDoList from './components/layout/ToDoList';

const App = () => {
  const [ loggingIn, setLogginIn ] = useState(false);
  const [ user, setUser ] = useState(true)

  const onGetLoginForm = () => {
    setLogginIn(!loggingIn)
  }

  return (
    <div className={classes.App}>
      <NavBar login={onGetLoginForm} status={loggingIn} />
      {!loggingIn && !user && <SignUp />}
      {loggingIn && !user && <Login />}
      {user && <ToDoList />}
    </div>
  );
}

export default App;
