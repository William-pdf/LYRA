import React, { useEffect, useState } from "react";
import { useToken } from "../useToken";
import "./addsong.css";

function AddSongFormWrapper(props) {
  const [token] = useToken();
  const [user, setUser] = useState("");

  useEffect(() => {
    async function getCurrentUser() {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/tokens/me/`;
      const response = await fetch(url, {
        credentials: "include",
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

  return <AddSongForm categories={props.categories} user={user} />;
}

class AddSongForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      artist: "",
      category: "",
      categories: [],
      is_requestable: true,
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
    delete data["categories"];
    data["owner_artist"] = this.props.user.artist_name;

    const songUrl = "http://localhost:8000/trl/api/songs/";
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    const songResponse = await fetch(songUrl, fetchOptions);
    if (songResponse.ok) {
      const newSong = await songResponse.json();
      console.log(newSong);

      const cleared = {
        title: "",
        artist: "",
        category: "",
        is_requestable: true,
      };
      this.setState(cleared);
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
      <div className="offset-3 col-6 center-card">
        <h1>Add a song</h1>
        <form onSubmit={this.handleSubmit} id="create-song-form">
          <div className="form-floating mb-3 text-field">
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
          <div className="form-floating mb-3 text-field">
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
          <div className="mb-3 text-field">
            <select
              value={this.state.category}
              onChange={this.handleCategoryChange}
              required
              name="category"
              id="category"
              className="form-select"
            >
              <option value="">Choose a category</option>
              {this.props.categories.categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
            <div className="form-floating mb-3 text-field">
              <select
                value={this.state.is_requestable}
                onChange={this.handleRequestableChange}
                name="is_requestable"
                id="is_requestable"
                className="form-select"
              >
                <option value="">Is Song Requestable?</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>
          <button className="btn btn-primary add-button">Create</button>
        </form>
      </div>
    );
  }
}

export default AddSongFormWrapper;
