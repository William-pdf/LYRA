import React, { useState, useEffect } from "react";
import { useToken } from "../useToken";
import { useNavigate } from "react-router-dom"

function ArtistFacingRequestPage() {
  const [songs, setSongs] = useState([])
  const [token] = useToken();
  const [requestedSongs, setRequestedSongs] = useState([]);
  const [user, setUser] = useState("");
  let navigate = useNavigate();

  useEffect(() => {

    document.title = 'Live Request'

    async function getCurrentUser() {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/tokens/me/`;
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
  }, [token]);

  useEffect(() => {
    async function fetchUpdatedSongs() {
      const songsResponse = await fetch(
        `${process.env.REACT_APP_DJANGO_SERVICE}/api/songs/`,
        { credentials: 'include' }
      );

      if (songsResponse.ok) {
        const songData = await songsResponse.json();
        setSongs(songData.songs)
      } else if (songsResponse.status === 403) {
        navigate('/login/')
    }
    }
    fetchUpdatedSongs();
  }, [user]);

  useEffect(() => {
    setRequestedSongs(
      songs.filter((song) => song.owner_artist === user.artist_name)
    );
  }, [user, songs]);

  async function handleDequeue(songID) {
    console.log(songID);
    const url = `http://localhost:8000/trl/api/songs/${songID}/`;
    const requestOption = {
      method: "PUT",
      body: JSON.stringify({ is_requested: false }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
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
