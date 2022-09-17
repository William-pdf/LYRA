import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../useToken';
import './signup.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [token, login] = useToken();
  const navigate = useNavigate();
  const [willShowError, setWillShowError] = useState(false);
  const [errorType, setErrorType] = useState('');

  useEffect(() => {
    document.title = 'Sign Up';
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password,
    };
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts/`;
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      credentials: 'include',
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      login(username, password);
      navigate('/account/');
    } else if (response.status === 409) {
      const jsonMessage = await response.json();
      const message = jsonMessage.message;

      if (message.includes('username')) {
        setErrorType('username');
      } else if (message.includes('email')) {
        setErrorType('email');
      }
      setWillShowError(true);
    }
  };

  return (
    <>
    <div className="wrap">
      <div className="card">
        <h1>Sign up</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div
            className={`alert alert-warning ${willShowError ? '' : 'd-none'}`}
            role="alert"
          >
            <div className="text-center">
              Signup was unsuccessful. That {errorType} already exists
            </div>
          </div>
          <div className="form-floating mb-3 text-field">
            <input
              required
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
              required
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
              required
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
          <button type="submit" className="btn btn-primary signup-button">
            Sign Up
          </button>
          <div className="login-link">
            Already a member? <a href="https://terminal-tyrants.gitlab.io/band-managing-app/login/">Log in</a>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
