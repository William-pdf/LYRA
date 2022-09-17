import React, { useState, useEffect } from 'react';
import { useToken } from '../useToken';
import './login.css';

export default function Login() {
  // eslint-disable-next-line no-unused-vars
  const [token, login] = useToken();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [willShowError, setWillShowError] = useState(false);

  useEffect(() => {
    document.title = 'Login';
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await login(username, password);
    if (error) {
      setWillShowError(true);
    } else if (!error) {
      login(username, password);
    }
  };

  return (
    <div className="wrap">
      <div className="card">
        <h1>Login</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div
            className={`alert alert-warning ${willShowError ? '' : 'd-none'}`}
            role="alert"
          >
            <div className="text-center">
              Login was unsuccessful. Please double check username and password.
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
          <button type="submit" className="btn btn-primary login-button">
            Log in
          </button>
          <div className="sign-up-link">
            Not a member? <a href="https://terminal-tyrants.gitlab.io/band-managing-app/signup/">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}
