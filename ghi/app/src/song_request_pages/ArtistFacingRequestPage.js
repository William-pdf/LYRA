import React, { useState, useEffect } from 'react';
import { useToken } from '../useToken';
import { useNavigate, Link } from 'react-router-dom';
import './songrequests.css';

function ArtistFacingRequestPage() {
  const [songs, setSongs] = useState([]);
  const [token] = useToken();
  const [requestedSongs, setRequestedSongs] = useState([]);
  const [user, setUser] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    document.title = 'Live Request';

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

  useEffect(() => {
    async function fetchUpdatedSongs() {
      const songsResponse = await fetch(
        `${process.env.REACT_APP_DJANGO_SERVICE}/api/songs/`,
        { credentials: 'include' }
      );

      if (songsResponse.ok) {
        const songData = await songsResponse.json();
        setSongs(songData.songs);
      } else if (songsResponse.status === 403) {
        navigate('/login/');
      }
    }
    fetchUpdatedSongs();
  }, [user, navigate]);

  useEffect(() => {
    setRequestedSongs(
      songs.filter((song) => song.owner_artist === user.artist_name)
    );
  }, [user, songs]);

  async function handleDequeue(songID) {
    const url = `${process.env.REACT_APP_DJANGO_SERVICE}/api/songs/${songID}/`;
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
        <div className="wrap">
          <div className="center text-center">
            <h1>Queue of Song Requests</h1>
            <Link
              className="btn btn-primary"
              to={`/requests/${user.artist_name}`}
            >
              Your audience's request page.
            </Link>
            <form id="song_list"></form>
            <table className="table table-striped content-table">
              <thead className="table-header">
                <tr>
                  <th className="table-text">Title</th>
                  <th className="table-text">Artist</th>
                  <th></th>
                </tr>
              </thead>
              {
                <tbody>
                  {requestedSongs
                    .filter((song) => song.is_requested)
                    .map((song) => {
                      return (
                        <tr key={song.id}>
                          <td
                            className="text-left"
                            style={{ paddingRight: '10rem' }}
                          >
                            {song.title}
                          </td>
                          <td style={{ paddingRight: '15rem' }}>
                            {song.artist}
                          </td>
                          <td>
                            <button
                              onClick={() => handleDequeue(song.id)}
                              type="button"
                              className="btn queue-button"
                            >
                              Complete Request
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              }
            </table>
          </div>
        </div>
      ) : (
        <h1>You must be Logged In to view this page.</h1>
      )}
    </>
  );
}

export default ArtistFacingRequestPage;
