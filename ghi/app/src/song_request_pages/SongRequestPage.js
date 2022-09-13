import React, { useState, useEffect } from 'react';
import { useToken } from '../useToken';
import { useParams } from 'react-router-dom';
import './songrequests.css';

function SongRequestsPage(props) {
  const { songs } = props;
  const [token] = useToken();
  const [requestableSongs, setRequestableSongs] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  let { ownerArtist } = useParams();
  ownerArtist = ownerArtist.replaceAll('-', ' ');

  useEffect(() => {
    async function loadData() {
      setRequestableSongs(
        songs.filter(
          (song) =>
            song.is_requestable &&
            song.owner_artist.toLowerCase() === ownerArtist.toLowerCase()
        )
      );
    }
    // eslint-disable-next-line no-unused-expressions
    loadData();
  }, [ownerArtist, songs]);

  async function handleQueue(songID) {
    console.log(songID);
    const url = `http://localhost:8000/trl/api/songs/${songID}/`;
    const requestOption = {
      method: 'PUT',
      body: JSON.stringify({ is_requested: true }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    };
    const response = await fetch(url, requestOption);
    if (response.ok) {
      const filteredSongs = requestableSongs.filter(
        (song) => song.id !== songID
      );
      setRequestableSongs(filteredSongs);
    }
  }

  return (
    <>
      {token ? (
        <div className="center">
          <h1>Request a song</h1>
          <form id="song_list">
            <div className="main-search-input-wrap">
              <div className="main-search-input fl-wrap">
                <div className="main-search-input-item">
                  <input
                    className="prompt"
                    value={searchInput}
                    placeholder="Search song"
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </form>
          <table>
            <thead>
              <tr>
                <th>Songs</th>
              </tr>
            </thead>
            <tbody>
              {requestableSongs
                .filter((song) => song.is_requested === false)
                .filter((searched) => searched.title.includes(searchInput))
                .map((song) => {
                  return (
                    <tr key={song.id}>
                      <td>{song.title}</td>
                      <td>
                        <button
                          onClick={() => handleQueue(song.id)}
                          type="button"
                          className="btn btn-success"
                        >
                          Queue
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>You must be Logged In to view this page.</h1>
      )}
    </>
  );
}

export default SongRequestsPage;
