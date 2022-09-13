import React from 'react';
import { useToken } from '../useToken';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserCatalog(props) {
  const [filterSongs, setFilterSongs] = useState([]);
  const [user, setUser] = useState({});
  let navigate = useNavigate();
  const [token] = useToken();

  useEffect(() => {
    async function getCurrentUser() {
      const userUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/tokens/me/`;
      const userResponse = await fetch(userUrl, {
        credentials: 'include',
      });
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData);
      } else {
        navigate('/login/');
      }
    }
    if (token) {
      getCurrentUser();
    }
  }, [token, navigate]);

  useEffect(() => {
    async function fetchUpdatedSongs() {
      const songsResponse = await fetch(
        `${process.env.REACT_APP_DJANGO_SERVICE}/api/songs/`,
        { credentials: 'include' }
      );

      if (songsResponse.ok) {
        const songData = await songsResponse.json();
        console.log('fetchupdated', songData);
        setFilterSongs(
          songData.songs.filter(
            (song) => song.owner_artist === user.artist_name
          )
        );
      }
    }

    fetchUpdatedSongs();
  }, [token, user]);

  //   useEffect(() => {
  //     setFilterSongs(
  //       props.songs.filter((song) => {
  //         if (song.owner_artist === user.artist_name) {
  //           return song;
  //         }
  //       })
  //     );
  //   }, [user]);

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
            rowSpan={songValues.length + 1}
            value={song.id}
            onClick={() => navigate(`/catalog/${song.id}/`)}
          >
            EDIT
          </button>
        ) : null;
      return (
        <tr key={i}>
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
      <div>
        <button onClick={() => navigate('add/')}>Add Song</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th colSpan="4">YOUR SONGS</th>
            </tr>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Requestable</th>
              <th></th>
            </tr>
          </thead>
          {tBodies}
        </table>
      </div>
    </>
  );
}
