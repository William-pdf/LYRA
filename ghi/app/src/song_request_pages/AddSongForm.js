import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../useToken';

function AddSongFormWrapper(props) {
  const [token] = useToken();
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function getCurrentUser() {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/tokens/me/`;
      const response = await fetch(url, {
        credentials: 'include',
      });
      if (response.ok) {
        const user = await response.json();
        setUser(user);
      }
    }
    if (token) {
      getCurrentUser();
    }
  }, [token]);

  return (
    <AddSongForm
      categories={props.categories}
      user={user}
      navigate={navigate}
    />
  );
}

class AddSongForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      category: '',
      categories: [],
      is_requestable: "True",
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleArtistChange = this.handleArtistChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleRequestableChange = this.handleRequestableChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data['categories'];
    data['owner_artist'] = this.props.user.artist_name;
    data['is_requestable'] === 'true'
      ? (data['is_requestable'] = true)
      : (data['is_requestable'] = false);

    const songUrl = 'http://localhost:8000/trl/api/songs/';
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };
    const songResponse = await fetch(songUrl, fetchOptions);
    if (songResponse.ok) {
      const newSong = await songResponse.json();
      console.log(newSong);

      const cleared = {
        title: '',
        artist: '',
        category: '',
        is_requestable: "True",
      };
      this.setState(cleared);
      this.props.navigate('/catalog/');
    }
  }

  handleTitleChange(event) {
    const value = event.target.value;
    this.setState({ title: value });
  }

  handleArtistChange(event) {
    const value = event.target.value;
    this.setState({ artist: value });
  }

  handleCategoryChange(event) {
    const value = event.target.value;
    this.setState({ category: value });
  }

  handleRequestableChange(event) {
    const value = event.target.value;
    this.setState({ is_requestable: value });
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add A SONG</h1>
            <form onSubmit={this.handleSubmit} id="create-song-form">
              <div className="form-floating mb-3">
                <input
                  value={this.state.title}
                  onChange={this.handleTitleChange}
                  placeholder="Title"
                  required
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                />
                <label htmlFor="title">Title</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={this.state.artist}
                  onChange={this.handleArtistChange}
                  placeholder="Artist"
                  required
                  type="text"
                  name="artist"
                  id="artist"
                  className="form-control"
                />
                <label htmlFor="artist">Artist</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  value={this.state.category}
                  onChange={this.handleCategoryChange}
                  required
                  name="category"
                  id="category"
                  className="form-select"
                >
                  <option value="">Choose a category</option>
                  {this.props.categories.map((cat) => {
                    return (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <label htmlFor="requestable" className="form-label">
                  Is Requestable?
                </label>
                <select
                  value={this.state.is_requestable}
                  onChange={this.handleRequestableChange}
                  name="is_requestable"
                  id="is_requestable"
                  className="form-select"
                > 
                  <option value="">Choose an Option</option>
                  <option value="'True'">True</option>
                  <option value="'False'">False</option>
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddSongFormWrapper;
