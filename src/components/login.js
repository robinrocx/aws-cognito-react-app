import React from 'react';
import functions from '../helpers/functions';
import { Redirect } from "react-router-dom";

const { login, setNewPassword, socialSignIn } = functions;

class Login extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        mode: "username",
        name:"",
        password: "",
        newPassword: "",
        user: props.authState?.user ?? "",
        isLoggedIn: props.authState?.isLoggedIn ?? false,
      }
    }

    handleChange = (e)=>{
      this.setState({
        mode: e.target.id,
      });
    }

    handleClick = async (e)=>{
      if(this.state.mode === "username"){
        const username = this.state.username;
        const password = this.state.password;
        const user = await login(username, password);
        if(user.message === "Incorrect username or password."){
          console.log(user.message);
        }
        else if(user.challengeName === "NEW_PASSWORD_REQUIRED"){
          this.setState({
            user,
          });
        }
        else{
          console.log("Successfully loggedIn");
          this.setState({
            user,
            isLoggedIn: true,
          })
          this.props.authState.setUserInState(this.state.user, true);
        }
      }
      if(this.state.mode === "google"){
        await socialSignIn();
      }
    }

    handleUserNameChange = (e)=>{
      this.setState({
        username: e.target.value
      });
    }

    handlePasswordChange = (e)=>{
      this.setState({
        password: e.target.value
      });
    }

    handleNewPasswordChange = (e)=>{
      this.setState({
        newPassword: e.target.value
      });
    }

    handleNameChange = (e)=>{
      this.setState({
        name: e.target.value
      });
    }

    handleSubmit = async(e)=>{
      e.preventDefault();
      const newPassword = this.state.newPassword;
      const name = this.state.name;
      const user = this.state.user;

      const loggedUser = await setNewPassword(name, newPassword, user);
      if(loggedUser){
        console.log("Password successfully set!");
        this.setState({
          user: loggedUser,
          isLoggedIn: true,
        })
        this.props.authState.setUserInState(this.state.user, true);
      }
    }

    render() {
      if(this.state.isLoggedIn){
        return (
          <Redirect to={"/"} />
        )
      }else if(this.state.user){
        return (
          <>
          <h1>Set your password</h1>
          <form onSubmit={ this.handleSubmit }>
          <div>
            <label>
              Name:
            <input type="text" onChange={ this.handleNameChange } />
            </label>
          </div>
          <div>
            <label>
              New Password:
            <input type="text" onChange={ this.handleNewPasswordChange } />
            </label>
          </div>
          <input type="submit" value="Submit" />
          </form>
          <div>
            <button onClick = { this.handleClick }>Go back</button>
          </div>
        </>
        )
      }
      else{
        return (
          <>
            <h1>Let us login</h1>
            <input type="checkbox" id="username" name="username" onChange = { this.handleChange } checked = { this.state.mode === "username" ? true : false }></input>
            <label htmlFor="username"> Username/Password</label>
            <input type="checkbox" id="google" name="google" onChange = { this.handleChange } checked = { this.state.mode === "google" ? true : false }></input>
            <label htmlFor="google">Google</label>
            <form id="user-inputs" className = { this.state.mode === "username" ? null : "hide" }>
              <div>
                <input type="text" id="username-input" onChange = { this.handleUserNameChange }></input>
              </div>
              <div>
                <input type="text" id="password-input" onChange = { this.handlePasswordChange }></input>
              </div>
            </form>
            <div>
              <button onClick = { this.handleClick }>
                {this.state.mode === "google" ? "Go to Google" : "Go"}
              </button>
            </div>
          </>
        )
      }
    }
}
  
export default Login;