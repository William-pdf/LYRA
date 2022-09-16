import React from 'react';
import { useToken } from '../useToken';
import { useState, useEffect } from 'react';

function UserHome() {
  const [token] = useToken();
  const [user, setUser] = useState('');
  const [artistNameInput, setArtistNameInput] = useState('');
  const [willShowError, setWillShowError] = useState(false);

  useEffect(() => {
    document.title = 'Account';

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
      artist_name: artistNameInput,
    };
    const fetchConfig = {
      method: 'put',
      body: JSON.stringify(data),
      credentials: 'include',
    };
    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      const userDataObject = user;
      userDataObject['artist_name'] = artistNameInput;
      setUser(userDataObject);
      setArtistNameInput('');
      setWillShowError(false);
      window.location.reload(false);
    } else if (response.status === 500) {
      setWillShowError(true);
    }
  };

  return (
    <div>
      {token ? (
        <>
          <div className="container shadow bg-light p-4 mt-4 d-flex justify-content-around">
            <div className="text-left">
              <h3>Account Details:</h3>
              <div>Username: {user.username}</div>
              <div>Artist name: {user.artist_name}</div>
              <div>Email: {user.email}</div>
            </div>
            <div
              className={`d-flex flex-column ${
                user.artist_name ? 'd-none' : ''
              }`}
            >
              <p>
                Set your Artist Name to unlock the Catalog and Live Request
                features!
              </p>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-floating">
                  <input
                    type="text"
                    name="artist-name"
                    id="artist-name"
                    className={`form-control ${
                      willShowError ? 'is-invalid' : ''
                    }`}
                    placeholder="Enter your new Artist Name"
                    value={artistNameInput}
                    onChange={(e) => setArtistNameInput(e.target.value)}
                  />
                  <label htmlFor="artist-name">
                    Enter your new Artist Name
                  </label>
                  <div
                    id="validationServerUsernameFeedback"
                    className="invalid-feedback"
                  >
                    That Artist Name is already taken.
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary align-self-center"
                >
                  Set Name
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <h1>You must be Logged In to view this page.</h1>
      )}
    </div>
  );
}

export default UserHome;
