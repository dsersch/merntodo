import classes from './App.module.css';
import NavBar from './components/layout/NavBar';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';

function App() {

  return (
    <div className={classes.App}>
      <NavBar />
      <SignUp />
      <Login />
    </div>
  );
}

export default App;
