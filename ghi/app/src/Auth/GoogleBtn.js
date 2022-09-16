import React, { Component } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";


const CLIENT_ID = '185659198707-b5fmgdl8h28km10ukjdgk7r9nilidh39.apps.googleusercontent.com';


class GoogleBtn extends Component {
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

  login = (response) => {
    const decodedCredential = jwt_decode(response.credential);
    console.log({loginResponse : decodedCredential});
    // navigate('/account/');
    if(response.credential){
      this.setState(state => ({
        isLogined: true,
        accessToken: response.credential
      }));
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

export default GoogleBtn;