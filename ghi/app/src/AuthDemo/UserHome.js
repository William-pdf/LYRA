import React from "react";
import { useToken } from "../useToken";
import { useState, useEffect } from "react";

function UserHome() {
  // eslint-disable-next-line no-unused-vars
  const [token, login, logout] = useToken();
  const [user, setUser] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");

  useEffect(() => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: songTitle,
      artist: artist,
      category: 1,
      owner_artist: user.id,
    };
    const url = `${process.env.REACT_APP_DJANGO_SERVICE}/trl/api/songs/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      credentials: "include",
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      console.log("hooray");
      setSongTitle("");
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
          <div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="song"
                  name="song"
                  placeholder="song"
                  value={songTitle}
                  onChange={(e) => setSongTitle(e.target.value)}
                />
                <label htmlFor="song">Song</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="artist"
                  name="artist"
                  placeholder="artist"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                />
                <label htmlFor="artist">Artist</label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <button
              onClick={() => logout()}
              type="button"
              className="btn btn-primary"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="container shadow p-4 mt-4">
          <div>you are currently logged out</div>
        </div>
      )}
    </div>
  );
}

export default UserHome;
