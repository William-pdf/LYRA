import React, { useState, useEffect } from "react";
import "./signup.css";
import { useToken} from "../useToken";

import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";

import { GoogleLogin } from '@react-oauth/google';

const CLIENT_ID = '185659198707-b5fmgdl8h28km10ukjdgk7r9nilidh39.apps.googleusercontent.com';







export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [token, login] = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Sign Up'
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password,
    };
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts/`;
    console.log("signup", url);
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      credentials: 'include',
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      login(username, password);
      navigate('/account/');
    }
  };

  const googleLogin = async (response) => {
    const decodedCredential = jwt_decode(response.credential);
    console.log({loginResponse : decodedCredential});
    // navigate('/account/');
    if(response.credential){
   
      const data = {
        username: decodedCredential.email,
        email: decodedCredential.email,
        password: decodedCredential.sub,
      };
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts/`;
      console.log("signup", url);
      const fetchConfig = {
        method: 'post',
        body: JSON.stringify(data),
        credentials: 'include',
      };
  
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        login(data.username, data.password);
        navigate('/account/');
      }
    }

  }


  const handleLoginFailureGoogle = (response) => {
    alert('Failed to log out')
  }

  return (
    <>
      <div className="center">
        <h1>Sign up</h1>
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
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
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
          <button type="submit" className="btn btn-primary signup-button">
            Sign Up
          </button>
          <div className="login-link">
            Already a member? <a href="/login/">Log in</a>
          </div>
        </form>
      </div>
    </>
  );
}
