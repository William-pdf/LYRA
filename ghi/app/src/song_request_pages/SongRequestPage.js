import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-grid';
import { useToken } from '../useToken';
import { useParams } from 'react-router-dom';

function SongRequestsPage(props) {
  const { songs } = props;
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState('');
  const [token] = useToken();
  const [songInfo, setSongInfo] = useState({
    next_song: '',
    most_requested: '',
    search: '',
    is_requested: false,
    requests: [],
  });
  const [requestableSongs, setRequestableSongs] = useState([]);
  const { ownerArtist } = useParams();

  useEffect(() => {
    async function loadData() {
      //
      // TODO: Filter display songs by user passed in url param
      // Need to convert passed artist name string to artist id
      //
      songs.songs[0].owner_artist = 'test';
      setRequestableSongs(
        songs.songs.filter(
          (song) => song.is_requestable && song.owner_artist === ownerArtist
        )
      );

      async function getCurrentUser() {
        const url = `${process.env.REACT_APP_ACCOUNTS_HOST}api/tokens/me/`;
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
    }
    loadData();
  }, []);

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
      console.log(songs);
      const filteredSongs = requestableSongs.filter(
        (song) => song.id !== songID
      );
      setRequestableSongs(filteredSongs);
    }
  }

  async function handleUnqueue(song) {
    console.log(song);
    const songsUrl = `http://localhost:8080/api/songs/${song}/`;
    const fetchConfig = {
      method: 'PUT',
      body: JSON.stringify(song),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  function handleSearchChange(e) {
    const value = e.target.value;
    setSongInfo({ ...songInfo, search: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const songs_list = songs.filter((song) => {
      return song.name === songInfo.name;
    });
    setSongInfo({ ...songInfo, songs: songs_list });
  }

  return (
    <>
      <h1>Request a song</h1>
      <form onSubmit={handleSubmit} id="song_list">
        <div className="main-search-input-wrap">
          <div className="main-search-input fl-wrap">
            <div className="main-search-input-item">
              <input
                onChange={handleSearchChange}
                value={songInfo.search}
                type="text"
                placeholder="Search song"
                name="search"
                id="search"
              />
            </div>
            <button className="main-search-button">Search</button>
          </div>
        </div>
      </form>
      <Container>
        <Row>
          <table>
            <thead>
              <tr>
                <th>Songs</th>
              </tr>
            </thead>
            <tbody>
              {requestableSongs
                .filter((song) => {
                  if (song.is_requested === false) {
                    return song;
                  }
                })
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
        </Row>
      </Container>
    </>
  );
}

export default SongRequestsPage;
