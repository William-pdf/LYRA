import React, { useState, useEffect } from 'react';
import { useToken } from '../useToken';

function ArtistFacingRequestPage(props) {
  const { songs } = props;
  const [token] = useToken();
  const [requestedSongs, setRequestedSongs] = useState([]);
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
  }, [songs, token]);

  useEffect(() => {
    setRequestedSongs(
      songs.songs.filter((song) => song.owner_artist === user.artist_name)
    );
  }, [user, songs]);

  async function handleDequeue(songID) {
    console.log(songID);
    const url = `http://localhost:8000/trl/api/songs/${songID}/`;
    const requestOption = {
      method: 'PUT',
      body: JSON.stringify({ is_requested: false }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    };
    const response = await fetch(url, requestOption);
    if (response.ok) {
      const filteredSongs = requestedSongs.filter((song) => song.id !== songID);
      setRequestedSongs(filteredSongs);
    }
  }

  return (
    <>
      {token ? (
        <>
          <h1>Queue of Song Requests</h1>
          <table>
            <thead>
              <tr>
                <th>Requests</th>
              </tr>
            </thead>
            <tbody>
              {requestedSongs
                .filter((song) => song.is_requested)
                .map((song) => {
                  return (
                    <tr key={song.id}>
                      <td>{song.title}</td>
                      <td>
                        <button
                          onClick={() => handleDequeue(song.id)}
                          type="button"
                          className="btn btn-success"
                        >
                          Remove Request
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      ) : (
        <h1>You must be Logged In to view this page.</h1>
      )}
    </>
  );
}

export default ArtistFacingRequestPage;
