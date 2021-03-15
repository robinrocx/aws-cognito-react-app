import React from 'react';
import functions from '../helpers/functions';
import { Redirect } from "react-router-dom";

const { generateCodeForNewPassword, submitCodeForNewPassword } = functions;

class ForgotPassword extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        confirmationSent: false,
        passwordSet: false,
        code:"",
        newPassword:""
      }
    }

    handleClick = async (e)=>{
      await generateCodeForNewPassword();
      this.setState({
        confirmationSent: true,
        code:"",
        passwordSet: false,
      });
    }

    handleCodeChange = (e)=>{
      this.setState({
        code: e.target.value,
      });
    }

    handleNewPasswordChange = (e)=>{
      this.setState({
        newPassword: e.target.value,
      });
    }

    handleSubmit = async (e)=>{
      e.preventDefault();
      const code = this.state.code;
      const newPassword = this.state.newPassword;
      const result = await submitCodeForNewPassword(code, newPassword);
      this.setState({
        passwordSet: true,
        confirmationSent: false,
      });
    }

    render() {
      if(this.props.authState.user){
        return (
          <Redirect to={"/"} />
        )
      }else{
        return (
          <>
            <div>
              <button onClick = { this.handleClick }>Generate Code</button>
            </div>
            { this.state.confirmationSent && 
            <form onSubmit={ this.handleSubmit }>
              <div>
                <label>
                  Please enter the code sent to your email :
                  <input type="text" onChange={ this.handleCodeChange } />
                </label>
                <label>
                  New password :
                  <input type="text" onChange={ this.handleNewPasswordChange } />
                </label>
              </div>
              <input type="submit" value="Submit" />
            </form>}

            { this.state.passwordSet && <p>Password set successfully. You can login now</p>}
          </>
        )
      }
    }
}
  
export default ForgotPassword;