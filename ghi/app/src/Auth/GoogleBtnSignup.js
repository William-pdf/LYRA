import React, { Component } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
const CLIENT_ID = '185659198707-b5fmgdl8h28km10ukjdgk7r9nilidh39.apps.googleusercontent.com';


class GoogleBtnSignup extends Component {
   constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: ''
    };

    this.login = this.login.bind(this);
    // this.handleLoginFailure = this.handleLoginFailure.bind(this);
    // this.logout = this.logout.bind(this);
    // this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login = async (response) => {
    const decodedCredential = jwt_decode(response.credential);
    console.log({loginResponse : decodedCredential});
    // navigate('/account/');
    if(response.credential){
      this.setState(state => ({
        isLogined: true,
        accessToken: response.credential
      }));

      // const data = {
      //   username: decodedCredential.sub,
      //   email: decodedCredential.email,
      //   password: decodedCredential.sub,
      // };
      // const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts/`;
      // console.log("signup", url);
      // const fetchConfig = {
      //   method: 'post',
      //   body: JSON.stringify(data),
      //   credentials: 'include',
      // };
  
      // const response = await fetch(url, fetchConfig);
      // if (response.ok) {
      //   this.login1(data.username, data.password);
      //   navigate('/account/');
      // }
    }

    
  }

  logout = (response) => {
    console.log({logoutResponse : response});
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));
  }

  handleLoginFailure = (response) => {
    console.log({failedResponse : response })
    alert('Failed to log in')
  }

  handleLogoutFailure = (response) => {
    alert('Failed to log out')
  }

  render() {
    return (
    <div>
      <GoogleLogin
  onSuccess={this.login}
  onError={this.handleLoginFailure}
/>
    </div>
    )
  }
}

export default GoogleBtnSignup;