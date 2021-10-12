import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import classes from './App.module.css';
import NavBar from './components/layout/NavBar';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import ToDoList from './components/layout/ToDoList';

const App = () => {
  const [ loggingIn, setLogginIn ] = useState(false);
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      setUser(jwtDecode(token).id)
    }
  }, [])

  const onGetLoginForm = () => {
    setLogginIn(!loggingIn)
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null)
  }

  return (
    <div className={classes.App}>
      <NavBar login={onGetLoginForm} status={loggingIn} loggedIn={user} logout={logout}/>
      {!loggingIn && !user && <SignUp signup={setUser} />}
      {loggingIn && !user && <Login login={setUser} />}
      {user && <ToDoList userId={user} />}
    </div>
  );
}

export default App;
