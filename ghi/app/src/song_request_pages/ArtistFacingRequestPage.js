import React, { useState, useEffect } from 'react';
import { useToken } from '../useToken';

function ArtistFacingRequestPage(props) {
  //   const { songs } = props;
  //   // eslint-disable-next-line no-unused-vars
  //   const [token] = useToken();
  //   const [requestableSongs, setRequestableSongs] = useState([]);
  //   const [searchInput, setSearchInput] = useState('');
  //   const [user, setUser] = useState('');

  //   useEffect(() => {
  //     async function getCurrentUser() {
  //       const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/tokens/me/`;
  //       const response = await fetch(url, {
  //         credentials: 'include',
  //       });
  //       if (response.ok) {
  //         const user = await response.json();
  //         setUser(user);
  //       }
  //     }
  //     if (token) {
  //       getCurrentUser();
  //     }

  //     async function loadData() {
  //       setRequestableSongs(
  //         songs.songs.filter(
  //           (song) => song.is_requested && song.owner_artist === user
  //         )
  //       );
  //     }

  //     getCurrentUser();
  //     loadData();
  //   }, [songs, token, user]);

  //   async function handleDequeue(songID) {
  //     console.log(songID);
  //     const url = `http://localhost:8000/trl/api/songs/${songID}/`;
  //     const requestOption = {
  //       method: 'PUT',
  //       body: JSON.stringify({ is_requested: false }),
  //       headers: { 'Content-Type': 'application/json' },
  //       credentials: 'include',
  //     };
  //     const response = await fetch(url, requestOption);
  //     if (response.ok) {
  //       const filteredSongs = requestableSongs.filter(
  //         (song) => song.id !== songID
  //       );
  //       setRequestableSongs(filteredSongs);
  //     }
  //   }

  //   return (
  //     <>
  //       {token ? (
  //         <>
  //           <h1>Queue of Song Requests</h1>
  //           <table>
  //             <thead>
  //               <tr>
  //                 <th>Requests</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {requestableSongs
  //                 .filter((song) => {
  //                   if (song.is_requested === false) {
  //                     return song;
  //                   }
  //                 })
  //                 .filter((searched) => {
  //                   if (searched.title.includes(searchInput)) {
  //                     return searched;
  //                   }
  //                 })
  //                 .map((song) => {
  //                   return (
  //                     <tr key={song.id}>
  //                       <td>{song.title}</td>
  //                       <td>
  //                         <button
  //                           onClick={() => handleDequeue(song.id)}
  //                           type="button"
  //                           className="btn btn-success"
  //                         >
  //                           Queue
  //                         </button>
  //                       </td>
  //                     </tr>
  //                   );
  //                 })}
  //             </tbody>
  //           </table>
  //         </>
  //       ) : (
  //         <h1>You must be Logged In to view this page.</h1>
  //       )}
  //     </>
  //   );
  return <h1>Don't look I ain't ready yet</h1>;
}

export default ArtistFacingRequestPage;
