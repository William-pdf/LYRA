import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

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
      navigate('/login/');
    }
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
          Sign Up
        </button>
      </form>
    </>
  );
}
