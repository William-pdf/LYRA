import React, { useState } from 'react';
import { useToken } from '../useToken';

export default function AuthDemo() {
  // eslint-disable-next-line no-unused-vars
  const [token, login, logout] = useToken();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(username, password);
    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    logout();
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
      <button
        onClick={() => handleLogout()}
        type="button"
        className="btn btn-primary"
      >
        Logout
      </button>
    </>
  );
}
