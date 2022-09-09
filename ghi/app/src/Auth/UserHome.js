import React from 'react';
import { useToken } from '../useToken';
import { useState, useEffect } from 'react';

function UserHome() {
  const [token] = useToken();
  const [user, setUser] = useState('');
  const [artistName, setArtistName] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts/${user.id}/`;
    const data = {
      artist_name: artistName,
    };
    const fetchConfig = {
      method: 'put',
      body: JSON.stringify(data),
      credentials: 'include',
    };
    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      const userDataObject = user;
      userDataObject['artist_name'] = artistName;
      setUser(userDataObject);
      setArtistName('');
    }
  };

  return (
    <div>
      {token ? (
        <>
          <div className="container shadow p-4 mt-4">
            <h3>Account Details:</h3>
            <div>username: {user.username}</div>
            <div>artist name: {user.artist_name}</div>
            <div>email: {user.email}</div>
          </div>
          <form className="d-flex" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-floating">
              <input
                type="text"
                name="artist-name"
                id="artist-name"
                className="form-control"
                placeholder="Enter your new Artist Name"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
              />
              <label htmlFor="artist-name">Enter your new Artist Name</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Set Name
            </button>
          </form>
        </>
      ) : (
        <h1>You must be Logged In to view this page.</h1>
      )}
    </div>
  );
}

export default UserHome;
