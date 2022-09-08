import React, { useState, useEffect, useRef } from "react";
import { useToken } from "../useToken";

function SongRequestsPage(props) {
  const { songs } = props;
  const [setUser] = useState("");
  const [token] = useToken();
  const [songInfo, setSongInfo] = useState({
    next_song: "",
    most_requested: "",
    is_requested: false,
    requests: [],
  });
  const [requestableSongs, setRequestableSongs] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function loadData() {
      setRequestableSongs(
        songs.songs.filter((song) => {
          if (song.is_requestable === true) {
            return song;
          }
        })
      );

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
    console.log("####", songs);
  }, []);

  async function handleQueue(songID) {
    console.log(songID);
    const url = `http://localhost:8000/trl/api/songs/${songID}/`;
    const requestOption = {
      method: "PUT",
      body: JSON.stringify({ is_requested: true }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    const response = await fetch(url, requestOption);
    if (response.ok) {
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
      method: "PUT",
      body: JSON.stringify(song),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const songs_list = requestableSongs.filter((song) => {
      console.log(song);
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
                className="prompt"
                value={searchInput}
                placeholder="Search song"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button className="main-search-button">Search</button>
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
            .filter((song) => {
              if (song.is_requested === false) {
                return song;
              }
            })
            .filter((searched) => {
              if (searched.title.includes(searchInput)) {
                return searched;
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
    </>
  );
}

export default SongRequestsPage;
