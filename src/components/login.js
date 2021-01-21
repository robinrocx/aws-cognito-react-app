import React from 'react';

class Login extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        mode: "username"
      }
    }

    handleChange = (e)=>{
      this.setState({
        mode: e.target.id,
        username: "",
        password: ""
      });
    }

    handleClick = (e)=>{
      if(this.state.mode === "username"){

      }
    }

    handleUserNameChange = (e)=>{
      this.setState({
        username: e.target.value
      });
    }

    handlePasswordChange = (e)=>{
      console.log(e.target.value);
      this.setState({
        password: e.target.value
      });
    }

    render() {
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

const handleClick = (event) => {
}
  
export default Login;