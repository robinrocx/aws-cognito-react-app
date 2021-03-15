import 'crypto-js/lib-typedarrays';
import { Auth } from 'aws-amplify';

const functions = {
  login: async (username, password)=>{
    try {
      const user = await Auth.signIn(username, password);
      return user;
    } catch (error) {
      console.log('error signing in', error);
      return error;
    }
  },
  setNewPassword: async (name, newPassword, user)=>{
    try{
      const loggedUser = await Auth.completeNewPassword(
        user,
        newPassword,
        {
            name
        }
      );

      return loggedUser;
    }catch(error){
      console.log("error changing password : ", error);
    }
  },

  changePassword: async (oldPassword, newPassword)=>{
    try{
      const user = await Auth.currentAuthenticatedUser();
      if(!user){
        console.log("The user is not authenticated");
        return false;
      }

      const result = await Auth.changePassword(user, oldPassword, newPassword);
      return result;
    }catch(error){
      console.log("Error changing password : ", error);
      return error;
    }
  },

  generateCodeForNewPassword: async ()=>{
    const result = await Auth.forgotPassword("robin@getproperly.com");

    return true;
  },

  submitCodeForNewPassword: async(code, newPassword)=>{
    const result = await Auth.forgotPasswordSubmit("robin@getproperly.com", code, newPassword);

    return true;
  },

  signOut: async ()=>{
    try{
      await Auth.signOut();
    }catch(error){
      console.log("Error signing out : ", error);
      return error;
    }
  },

  socialSignIn: async ()=>{
    const result = await Auth.federatedSignIn({provider: 'Google'});
    console.log("result : ", result);
    return true;
  }
}
export default functions;