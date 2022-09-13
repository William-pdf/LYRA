import { useState, useEffect } from 'react'
import { useToken } from '../useToken';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditSong(props) {

    const {songNav} = useParams();
    const [token] = useToken();
    const [user, setUser] = useState();
    const [song, setSong] = useState({});
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [is_requestable, setIsRequestable] = useState('');
    const [category, setCategory] = useState();
    const [owner_artist, setOwnerArtist] = useState('')
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setOwnerArtist(user.artist_name)
        const data = {
          title: title,
          artist: artist,
          is_requestable: is_requestable,
          category: category,
          owner_artist: owner_artist
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

      useEffect(() => {
        async function loadSong() {
          //const targetId = ;
          
          const songUrl = `${process.env.REACT_APP_DJANGO_SERVICE}/api/songs/${(songNav)}/`;
          const fetchConfig = {};
          const songResponse = await fetch(songUrl, {
            credentials: "include",
          });
          if (songResponse.ok) {
            const songRes = await songResponse.json();
            setSong(songRes);

          }

        }
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
        loadSong()
      }, [token])
    console.log("SONG IN EDIT:", song)
    console.log("USER FOR EDIT:", user)
    
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
                  {props.categories.categories.map((cat) => {
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
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <button className="btn btn-primary">UPDATE</button>
          </form>
        </div>
      </>
    )
    
}