import React from 'react';
import { useToken } from '../useToken';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserCatalog() {

    const [songs, setSongs] = useState([])
    const [filterSongs, setFilterSongs] = useState(null)
    const [user, setUser] = useState(null)
    const navigate = useNavigate
    const token = useToken
    let whenToUpdate = 0

    useEffect(() => {
        if(whenToUpdate === 0) {
            async function getCurrentUser() {
                const userUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/tokens/me/`;
                const userResponse = await fetch(userUrl, {
                  credentials: 'include',
                });
                if (userResponse.ok) {
                  const userData = await userResponse.json();
                  setUser(userData);
                } else {
                  navigate("/login/")
                }
              } 
            if (token) {getCurrentUser()} 
            
            async function getSongs() {
                const songsUrl = `${process.env.REACT_APP_DJANGO_SERVICE}/api/songs/`;
                const fetchOptions = {
                    method: "GET",
                    headers: {'Content-Type': 'application/json'},
                    credentials: "include"
                }
                const songResponse = await fetch(songsUrl, fetchOptions);
                if (songResponse.ok){
                    const songsData = await songResponse.json();
                    setSongs(songsData.songs)
                }
            }
            getSongs();
            whenToUpdate = 1
        } 
    }, [whenToUpdate])
    
    useEffect(() => {
        setFilterSongs(
            songs.filter(song => song.owner_artist === user.artist_name
            ))
        
        console.log("FILTERED SONGS:", filterSongs)
    }, [user, songs])
    
    // console.log("SONGS:", songs)
    // console.log("USER:", user)
    // console.log("ARTIST NAME:", user.artist_name)
    const addNav = () => {
        navigate("add/")
    }
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
                    {/* {tBodies} */}
                </table>
            </div>
        </>
    )
}