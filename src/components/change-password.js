import React from 'react';
import functions from '../helpers/functions';
import { Redirect } from "react-router-dom";

const { changePassword } = functions;

class ChangePassword extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        error: false,
        oldPassword: "",
        newPassword: "",
        passwordChanged: false,
      }
    }

    handleOldPasswordChange = (e)=>{
      this.setState({
        oldPassword: e.target.value,
        error:false,
        passwordChanged:false,
      });
    }

    handleNewPasswordChange = (e)=>{
      this.setState({
        newPassword: e.target.value,
        error: false,
        passwordChanged: false
      });
    }

    handleSubmit = async (e)=>{
      e.preventDefault();
      const oldPassword = this.state.oldPassword;
      const newPassword = this.state.newPassword;
      console.log("oldPassword : ", oldPassword);
      console.log("newPassword : ", newPassword);
      const result = await changePassword(oldPassword, newPassword);
      console.log("result : ", result);
      if(result !== "SUCCESS"){
        this.setState({
          error: true,
          passwordChanged: false
        })
      }else{
        this.setState({
          error: false,
          passwordChanged: true
        })
      }
    }

    render() {
      if(!this.props.authState.user){
        return (
          <Redirect to={"/"} />
        )
      }else {
        return (
          <>
          <form onSubmit={ this.handleSubmit }>
          <div>
            <label>
              Old password:
            <input type="text" onChange={ this.handleOldPasswordChange } />
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
          { this.state.error && <p>Error changing password</p>}
          { this.state.passwordChanged && <p>Successfully changed your password</p>}
          </>
        )
      }
    }
}
  
export default ChangePassword;