import { useState, useEffect } from 'react';
import { useToken } from '../useToken';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditSong(props) {

    const {songNav} = useParams();
    const [token] = useToken();
    const [user, setUser] = useState();
    const [song, setSong] = useState({});
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState(song.title);
    const [artist, setArtist] = useState(song.artist);
    const [is_requestable, setIsRequestable] = useState(song.is_requestable);
    const [category, setCategory] = useState(song.category);
    const [owner_artist, setOwnerArtist] = useState(song.owner_artist)
    const navigate = useNavigate();

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
          navigate("/login/")
        }
      } 
      if (token) {
        getCurrentUser();
      } 
    }, [token, navigate])

    useEffect(() => {
      async function loadSong() {
        const songUrl = `${process.env.REACT_APP_DJANGO_SERVICE}/api/songs/${(songNav)}/`;
        const fetchConfig = {
          method: "GET",
          credentials: "include",
          headers: { 'Content-Type': 'application/json' }
        };
        const songResponse = await fetch(songUrl, fetchConfig);
        if (songResponse.ok) {
          const songData = await songResponse.json();
          setSong(songData);
        }
      }
      loadSong()
    }, [user])

    useEffect(() => {
      async function fetchUpdatedCategories() {
        const catResponse = await fetch(
          `${process.env.REACT_APP_DJANGO_SERVICE}/api/categories/`,
          { credentials: 'include' }
        );
  
        if (catResponse.ok) {
          const catData = await catResponse.json();
          setCategories(catData.categories)
        } else if (catResponse.status === 403) {
          navigate('/login/')
        }
      }
      fetchUpdatedCategories();
    }, [token]);

    useEffect(() => {
      async function preLoad() {
        if (song) {
          setTitle(song.title)
          setArtist(song.artist)
          setCategory(song.category_id)
          setIsRequestable(song.is_requestable)
          setOwnerArtist(song.owner_artist)
        }
      }
      preLoad()
    }, [song])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOwnerArtist(user.artist_name);
    const data = {
      title: title,
      artist: artist,
      is_requestable: is_requestable,
      category: category,
      owner_artist: owner_artist,
    };
    const url = `${process.env.REACT_APP_DJANGO_SERVICE}/api/songs/${song.id}/`;
    const fetchConfig = {
      method: 'PUT',
      body: JSON.stringify(data),
      credentials: 'include',
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      navigate('/catalog/');
    }
  };

  async function handleDelete() {
    const url = `${process.env.REACT_APP_DJANGO_SERVICE}/api/songs/${song.id}/`;
    const fetchConfig = {
      method: 'DELETE',
      credentials: 'include',
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const deleteData = await response.json()
      console.log(deleteData)
      navigate('/catalog/');
    }

  }
    
    return (
      <>
        <div>
          <h1>EDIT SONG</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="title">TITLE</label>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={song.title}
                required
                type="text"
                name="title"
                id="title"
                className="form-control"
              />
            </div>
            <label htmlFor="title">ARTIST</label>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setArtist(e.target.value)}
                defaultValue={song.artist}            
                required
                type="text"
                name="artist"
                id="artist"
                className="form-control"
              />
            </div>
            <label htmlFor="title">CATEGORY</label>
            <div className="form-floating mb-3">
              <select
                onChange={(e) => setCategory(e.target.value)}
                defaultValue={song.category}            
                required
                name="category"
                id="category"
                className="form-control"
              >
                <option value="">Choose a category</option>
                  {categories.map((cat) => {
                    return (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <label htmlFor="title">IS REQUESTABLE</label>
            <div className="form-floating mb-3">
              <select
                onChange={(e) => setIsRequestable(e.target.value)}
                placeholder="is_requestable"
                required
                type="text"
                name="is_requestable"
                id="is_requestable"
                className="form-control"
              >
                <option value="">Choose an Option</option>
                <option value="True">True</option>
                <option value="False">False</option>
              </select>
            </div>
            <button className="btn btn-primary">UPDATE</button>
          </form>
            <button className="btn delete" onClick={() => handleDelete()}>DELETE</button>
        </div>
      </>
    )
    
}
