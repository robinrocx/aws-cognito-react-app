import './App.css';
import Home from './components/home';
import Login from './components/login';
import ResetPassword from './components/reset-password';
import { 
  BrowserRouter as Router, 
  Route, 
  Link, 
  Switch 
} from 'react-router-dom'; 

function App() {
  return (
    <Router> 
      <div className="App">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/resetPassword">Reset Password</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/resetPassword" component={ResetPassword}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;