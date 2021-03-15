import './App.css';
import React from 'react';
import Home from './components/home';
import Login from './components/login';
import ChangePassword from './components/change-password';
import ForgotPassword from './components/forgot-password';
import SignOut from './components/sign-out';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from 'react-router-dom'; 
import { Auth } from 'aws-amplify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: "",
      isLoggedIn: false,
    }
  }

  setUserInState = (user, isLoggedIn)=>{
    this.setState({
      user,
      isLoggedIn,
    });
  }

  componentDidMount = async ()=>{
    try{
      localStorage.clear();
      const accessToken = "ID_TOKEN";
      // format is `CognitoIdentityServiceProvider.${appClientId}.${username}`
      localStorage.setItem("CognitoIdentityServiceProvider.136r9tthnoquqlb8o28p90c748.71ccf24f-c537-408f-916e-8747329bff81.accessToken",accessToken);

      const idToken = "ID_TOKEN";
      localStorage.setItem("CognitoIdentityServiceProvider.136r9tthnoquqlb8o28p90c748.71ccf24f-c537-408f-916e-8747329bff81.idToken",idToken);

      const refreshToken = "REFRESH_TOKEN";
      localStorage.setItem("CognitoIdentityServiceProvider.136r9tthnoquqlb8o28p90c748.71ccf24f-c537-408f-916e-8747329bff81.refreshToken",refreshToken);

      const lastAuthUser = "71ccf24f-c537-408f-916e-8747329bff81";
      localStorage.setItem("CognitoIdentityServiceProvider.136r9tthnoquqlb8o28p90c748.LastAuthUser",lastAuthUser);

      const currentSession = await Auth.currentSession();
      console.log("currentSession : ", currentSession);
      const user = await Auth.currentAuthenticatedUser();
      this.setUserInState(user, true);
    }catch(error){
      console.log("error : ", error);
      console.log("No session found!");
      
    }
  }

  render(){
    const appStateAndProps = {
      user: this.state.user,
      isLoggedIn: this.state.isLoggedIn,
      setUserInState: this.setUserInState
    };

    return (
      <Router> 
        <div className="App">
          <ul>
            <li>
              <NavLink to="/" exact activeStyle={{color: 'aqua'}}>Home</NavLink>
            </li>
            <li>
              { this.state.user ? <NavLink to="/ChangePassword" exact activeStyle={{color: 'aqua'}}>Change Password</NavLink> : <NavLink to="/Login" exact activeStyle={{color: 'aqua'}}>Log in</NavLink>} 
            </li>
            <li>
              { this.state.user ? <NavLink to="/SignOut" exact activeStyle={{color: 'aqua'}}>Sign Out</NavLink> : <NavLink to="/ForgotPassword" exact activeStyle={{color: 'aqua'}}>Forgot Password</NavLink>} 
            </li>
            { this.state.user && <li id="loggedin-name"><p>Username : Robin</p></li>}
          </ul>
          <Switch>
            <Route exact path="/" render = {(props)=> <Home {...props } authState = { appStateAndProps }/>}></Route>
            <Route exact path="/login" render = {(props)=> <Login {...props} authState = { appStateAndProps } />}></Route>
            <Route exact path="/changePassword" render = {(props)=> <ChangePassword {...props} authState = { appStateAndProps } />}></Route>
            <Route exact path="/forgotPassword" render = {(props)=> <ForgotPassword {...props} authState = { appStateAndProps } />}></Route>
            <Route exact path="/signout" render = {(props)=> <SignOut {...props} authState = { appStateAndProps } />}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;