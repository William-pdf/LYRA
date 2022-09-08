import React from 'react';
import { useToken } from '../useToken';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



export default function UserCatalog(props) {
    const { songs } = props;
    const [token] = useToken();
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    
    useEffect(() => {
        async function getCurrentUser() {
            const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/tokens/me/`;
            const response = await fetch(
                url, 
                { credentials: 'include',}
            );
            if (response.ok) {
                const user = await response.json();
                setUser(user);
                console.log(user)
            }
        } if (token) {
            getCurrentUser();
        }
    }, [token]);
    function navToEdit(songID) {
        navigate(`/catalog/${songID}/`)
        console.log(songID)
    }
    

    console.log(songs.songs)
    const filterSongs = songs.songs.filter(sng => {
        if (sng.owner_artist === user.id) {
            return sng;
        } else {
            console.log(sng)
        }
    })
    console.log("Filter songs:", filterSongs)
    const tBodies = filterSongs.map((song, index) => {
        const songValues = Object.values(song)
        const songsRows = songValues.map((value, i) => {
            const songTitle = i === 0 ? <td rowSpan={songValues.length + 1} value={song.id} onClick={() => navToEdit(song.id)}>{song.title}</td> : null
            const songArtist = i === 0 ? <td rowSpan={songValues.length + 1}>{song.artist}</td> : null
            const songRequestable = i === 0 ? <td rowSpan={songValues.length + 1}>{song.is_requestable.toString().toUpperCase()}</td> : null
            const editLink = i === 0 ? <button rowSpan={songValues.length + 1} value={song.id} onClick={() => navToEdit(song.id)}>EDIT</button> : null
            return (
                <tr key={i}>
                    {songTitle}
                    {songArtist}
                    {songRequestable}
                    {editLink}
                </tr>
            )
        });
        return (
        <tbody key={index} className="catalog-body">
            {songsRows}
        </tbody>
        )
    })
    return (
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
    )
}

