import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-grid";
import { useToken } from "../useToken";

function SongRequestsPage(props) {
  const [user, setUser] = useState("");
  const [token] = useToken();
  const [songInfo, setSongInfo] = useState({
    next_song: "",
    most_requested: "",
    search: "",
    requests: [],
    songs: [],
  });

  useEffect(() => {
    async function loadData() {
      const response = await fetch("http://localhost:8000/trl/api/songs/");
      if (response.ok) {
        const data = await response.json();
        setSongInfo({ ...songInfo, songs: data });
      }
      console.log(token);
      async function getCurrentUser() {
        const url = `${process.env.REACT_APP_ACCOUNTS_HOST}api/tokens/me/`;
        const response = await fetch(url, {
          credentials: "include",
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

  async function handleQueue(song) {
    console.log(song);
    const url = `http://localhost:8000/trl/api/songs/${song}/`;
    const requestOption = {
      method: "PUT",
      body: JSON.stringify(song),
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(url, requestOption);
    if (response.ok) {
      const data = await response.json();
      const updatedList = [...songInfo.songs];
      let index = updatedList.indexOf(song);
      const queuedSong = updatedList.splice(index, 1);
      setSongInfo({ ...songInfo, songs: updatedList });
    }
  }

  async function handleUnqueue(song) {
    console.log(song);
    const songsUrl = `http://localhost:8080/api/songs/${song}/`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(song),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  function handleSearchChange(e) {
    const value = e.target.value;
    setSongInfo({ ...songInfo, search: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const songs_list = songInfo.songs.filter((song) => {
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
              {songInfo.songs.songs?.map((song) => {
                return (
                  <tr key={song.id}>
                    <td>{song.title}</td>
                    <td>
                      <button
                        onClick={() => handleQueue(song.id)}
                        type="button"
                        className="btn btn-danger"
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
