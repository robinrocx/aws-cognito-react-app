import React from 'react';
import functions from '../helpers/functions';
import { Redirect } from "react-router-dom";

const { signOut } = functions;

class SignOut extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        redirect: ""
      }
    }

    handleClick = async (e)=>{
      await signOut();
      this.props.authState.setUserInState("", false);
      this.setState({
        redirect: "/",
      });
    }

    componentWillUnmount = (e)=>{
      console.log("I am here");
    }

    render() {
      if(!this.props.authState.user && !this.state.redirect){
        return (
          <Redirect to={"/"} />
        )
      }else {
        return (
          <>
          <p>Are you sure you wish to sign out?</p>
          <div>
            <button onClick = { this.handleClick }> Sign out</button>
          </div>
        </>
        )
      }
    }
}
  
export default SignOut;