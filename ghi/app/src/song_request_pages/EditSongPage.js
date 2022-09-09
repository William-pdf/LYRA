import { useState, useParams, useEffect } from 'react'
import { useToken } from '../useToken';
import { useNavigate } from 'react-router-dom';

export default function EditSong() {
    const {songNav} = useParams();
    const [token] = useToken();
    const [user, setUser] = useState();
    const [song, setSong] = useState({});
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [is_requestable, setIsRequestable] = useState('');
    const [category, setCategory] = useState();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
          title: title,
          artist: artist,
          is_requestable: is_requestable,
          category: category
        };
        const url = `${process.env.REACT_APP_DJANGO_SERVICE}/api/songs/`;
        const fetchConfig = {
          method: 'post',
          body: JSON.stringify(data),
          credentials: 'include',
        };
    
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          navigate('/catalog/');
        }
      };

      useEffect(() => {
        async function loadSong() {
          const url = `${process.env.REACT_APP_DJANGO_SERVICE}trl/api/songs/${songNav}/`;
          const songResponse = await fetch(url, {
            credentials: "include",
          });
          if (songResponse.ok) {
            song = await songResponse.json();
            setSong(song);
          }

          async function getCurrentUser() {
            const url = `${process.env.REACT_APP_ACCOUNTS_HOST}api/tokens/me/`;
            const response = await fetch(url, {
              credentials: 'include',
            });
            if (response.ok) {
              user = await response.json();
              setUser(user);
            }
            }
            if (token) {
              getCurrentUser();
            } else {
              navigate("login/")
            }
        }
        loadSong()

        async function loadSongData(song){
          title = setTitle(song.title),
          artist = setArtist(song.artist),
          is_requestable = setIsRequestable(song.is_requestable),
          category = setCategory(song.category.name)
        }
        loadSongData()
      })

      function handleTitleChange(e) {
        const value = e.target.value;
        setTitle(value);
      }
      function handleArtistChange(e) {
        const value = e.target.value;
        setArtist(value)
      }
      function handleRequestableChange(e) {
        const value = e.target.value;
        setIsRequestable(value)
      }
      function handleCategoryChange(e) {
        const value = e.target.value;
        setCategory(value)
      }

    
    return (
      <>
        <div>
          <h1>EDIT SONG</h1>
          <form onSubmit={() => handleSubmit()}>
            <div className="form-floating mb-3">
              <label htmlFor="title">TITLE</label>
              <input
                value={title}
                onChange={() => setTitle()}
                placeholder={song.title}
                required
                type="text"
                name="title"
                id="title"
                className="form-control"
              />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="title">ARTIST</label>
              <input
                value={artist}
                onChange={() => handleArtistChange()}
                placeholder="artist"
                required
                type="text"
                name="artist"
                id="artist"
                className="form-control"
              />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="title">CATEGORY</label>
              <input
                value={category}
                onChange={() => handleCategoryChange()}
                placeholder="category"
                required
                type="text"
                name="category"
                id="category"
                className="form-control"
              />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="title">IS REQUESTABLE</label>
              <input
                value={is_requestable}
                onChange={() => handleRequestableChange()}
                placeholder="is_requestable"
                required
                type="text"
                name="is_requestable"
                id="is_requestable"
                className="form-control"
              />
            </div>
          </form>
        </div>
      </>
    )
    
}