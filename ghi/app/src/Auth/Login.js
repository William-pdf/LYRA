import React, { useState } from 'react';
import { useToken } from '../useToken';
import './login.css';

export default function Login() {
  // eslint-disable-next-line no-unused-vars
  const [token, login] = useToken();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-floating mb-3">
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
        <div className="form-floating mb-3">
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
