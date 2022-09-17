import React from 'react';
import { useToken } from '../useToken';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './usercatalogpage.css';

export default function UserCatalog(props) {
  const [filterSongs, setFilterSongs] = useState([]);
  const [user, setUser] = useState({});
  let navigate = useNavigate();
  const [token] = useToken();

  useEffect(() => {
    document.title = 'My Song Catalog';

    async function getCurrentUser() {
      const userUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/tokens/me/`;
      const userResponse = await fetch(userUrl, {
        credentials: 'include',
      });
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData);
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
        setFilterSongs(
          songData.songs.filter(
            (song) => song.owner_artist === user.artist_name
          )
        );
      } else if (songsResponse.status === 403) {
        navigate('/login/');
      }
    }
    fetchUpdatedSongs();
  }, [user, navigate]);

  async function navToEdit(songID) {
    navigate(`/catalog/${songID}/`);
  }

  const tBodies = filterSongs.map((song, index) => {
    const songValues = Object.values(song);
    const songsRows = songValues.map((value, i) => {
      const songTitle =
        i === 0 ? (
          <td
            rowSpan={songValues.length + 1}
            value={song.id}
            onClick={() => navToEdit(song.id)}
          >
            {song.title}
          </td>
        ) : null;
      const songArtist =
        i === 0 ? <td rowSpan={songValues.length + 1}>{song.artist}</td> : null;
      const songRequestable =
        i === 0 ? (
          <td rowSpan={songValues.length + 1}>
            {song.is_requestable.toString().toUpperCase()}
          </td>
        ) : null;
      const editLink =
        i === 0 ? (
          <button
            className="edit-button"
            rowSpan={songValues.length + 1}
            value={song.id}
            onClick={() => navToEdit(song.id)}
          >
            EDIT
          </button>
        ) : null;
      return (
        <tr className="table-text" key={i}>
          {songTitle}
          {songArtist}
          {songRequestable}
          {editLink}
        </tr>
      );
    });
    return (
      <tbody key={index} className="catalog-body">
        {songsRows}
      </tbody>
    );
  });
  return (
    <>
      <div className="wrap">
        <div>
          <div className="catalog-center">
            <div className="d-flex justify-content-between p-3">
              <h3>Your songs</h3>
              <button
                type="button"
                id="add-btn"
                className="btn btn-primary btn-lg"
                onClick={() => navigate('add/')}
              >
                Add Song
              </button>
            </div>
            <table className="table table-striped content-table">
              <thead className="table-header">
                <tr>
                  <th className="table-text">Title</th>
                  <th className="table-text">Artist</th>
                  <th className="table-text">Requestable</th>
                  <th></th>
                </tr>
              </thead>
              {tBodies}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
