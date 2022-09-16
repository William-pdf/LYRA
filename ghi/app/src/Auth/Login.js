import React, { useState, useEffect } from 'react';
import { useToken } from '../useToken';
import './login.css';
import GoogleBtn from './GoogleBtn';
// client Id
// 185659198707-b5fmgdl8h28km10ukjdgk7r9nilidh39.apps.googleusercontent.com

// client secret
// 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
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { GoogleLogin } from '@react-oauth/google';

const CLIENT_ID = '185659198707-b5fmgdl8h28km10ukjdgk7r9nilidh39.apps.googleusercontent.com';


export default function Login() {
  // eslint-disable-next-line no-unused-vars
  const [token, login] = useToken();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login'
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(username, password);
    setUsername('');
    setPassword('');
  };

  const googleLogin = async (response) => {
    const decodedCredential = jwt_decode(response.credential);
    console.log({loginResponse : decodedCredential});
    
    if(response.credential){
   
      const data = {
        username: decodedCredential.email,       
        password: decodedCredential.sub,
      };
     
      login(data.username, data.password);
      navigate('/account/');
      
    }

  }



  
  

  const handleLoginFailureGoogle = (response) => {
    alert('Failed to log out')
  }

  return (
    <>
      <div className="center">
        <h1>Login</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-floating mb-3 text-field">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating mb-3 text-field">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div>
            <GoogleLogin
              onSuccess={googleLogin}
              onError={handleLoginFailureGoogle}
            />
                </div>
          <button type="submit" className="btn btn-primary login-button">
            Log in
          </button>
          
          <div className="sign-up-link">
            Not a member? <a href="/signup/">Sign up</a>
          </div>
        </form>
      </div>
    </>
  );
}
