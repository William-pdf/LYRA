import React from 'react';
import { useToken } from '../useToken';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



export default function UserCatalog(props) {
    const { songs } = props;
    const [token] = useToken();
    // const [song, setSong] = useState('');
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
    const navToEdit = async (e) => {
        const songID = e.target.value
        navigate(`/catalog/${songID}`)
    }
    

    console.log(songs.songs)
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th colSpan="4">YOUR SONGS</th>
                    </tr>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Category</th>
                        <th>Requestable</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {songs.songs.filter(sng => {
                    if (sng.owner_artist === user.id) {
                        return sng;
                    } else {
                        console.log(sng)
                    }
                }).map(song => {
                    <tr>
                        <td value={song.id} onClick={() => navToEdit()}>
                            {song.title}
                        </td>
                        <td>{song.artist}</td>
                        <td>{song.category}</td>
                        <td>{song.requestable}</td>
                        <td value={song.id} onClick={() => navToEdit()}>
                            Edit
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </>
    );
}

