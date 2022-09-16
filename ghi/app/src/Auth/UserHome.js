import React from 'react';
import { useToken } from '../useToken';
import { useState, useEffect } from 'react';
import "./userHome.css"

function UserHome() {
  const [token] = useToken();
  const [user, setUser] = useState('');
  const [artistName, setArtistName] = useState('');

  useEffect(() => {

    document.title = 'Account'
    
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
            <div className='detailContainer'>
            <h3 className='accountTitle'>Account Details</h3>
            <div className='userNameContainer'><p className='userNameTitle'>Username: </p> <p className='userNameText'>{user.username}</p></div>
            <div className='userNameContainer'><p className='artistNameTitle'>artist name: </p> <p className='artistNameText'>{user.artist_name}</p></div>
            <div className='userNameContainer'><p className='emailTitle'>email: </p><p className='emailText'>{user.email}</p></div>
            </div>
          </div>
          <form className="containerform" onSubmit={(e) => handleSubmit(e)}>
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
              <label htmlFor="artist-name">Enter Your New Artist Name</label>
            </div>
            <button type="submit" className="btn-setName">
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
