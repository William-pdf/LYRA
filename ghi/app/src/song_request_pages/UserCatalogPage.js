import React from 'react';
import { useToken } from '../useToken';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';











export default function UserCatalog() {
    const [songs, setSongs] = useState()
    const [token] = useToken();
    const [user, setUser] = useState();
    const navigate = useNavigate();
    
    
    
    
    function navToEdit(songID) {
        navigate(`/catalog/${songID}/`)
        
    }
    
    useEffect(() => {
        async function getCurrentUser() {
            const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/tokens/me/`;
            const response = await fetch(
                url, 
                { credentials: 'include',}
                );
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);  
                } else {
                    navigate("/login/")
                } 
            } if (token) {
                getCurrentUser();
            } 
            
            
    }, [token]);
        
    useEffect(() => {
        async function get_songs() {
            
            const url = `${process.env.REACT_APP_DJANGO_SERVICE}/api/songs/`
            const fetchConfig = {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include"
            }
            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                const songsData = await response.json();
                setSongs(songsData)
            }
            
        }
        get_songs();
    });

    useEffect(() => {
        function filterSongs() {
            const filteredSongs = songs.filter(song => {
                if (song.owner_artist === user.artist_name) {
                    return song
                }
            })
            setSongs(filteredSongs)
        }
        filterSongs();
    });

        
        
        console.log("SONGS:", songs)
        
        console.log("USER:", user)
        console.log("ARTISTNAME:", user)
        
    const tBodies = songs.map((song, index) => {
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
        <>  
            <div>
                <button onClick={() => navigate("add/")}>Add Song</button>
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
    )
}

