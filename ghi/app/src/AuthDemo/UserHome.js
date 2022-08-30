import React from 'react';
import { useToken } from '../useToken';
import { useState, useEffect } from 'react';

function UserHome() {
  // eslint-disable-next-line no-unused-vars
  const [token] = useToken();
  const [user, setUser] = useState('');

  useEffect(() => {
    async function getCurrentUser() {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/tokens/me/`;
      const response = await fetch(url, {
        credentials: 'include',
      });
      if (response.ok) {
        const user = await response.json();
        setUser(user);
      }
    }
    if (token) {
      getCurrentUser();
    }
  }, [token]);

  return (
    <div>
      {token ? (
        <div className="container shadow p-4 mt-4">
          <h3>Account Details:</h3>
          <div>username: {user.username}</div>
          <div>artist name: {user.artist_name}</div>
          <div>email: {user.email}</div>
        </div>
      ) : (
        <div className="container shadow p-4 mt-4">
          <div>you are currently logged out</div>
        </div>
      )}
    </div>
  );
}

export default UserHome;
