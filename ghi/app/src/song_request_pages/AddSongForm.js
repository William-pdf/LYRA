import React from "react";

class AddSongForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      artist: "",
      category: "",
      categories: [],
      // requestable: false,
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleArtistChange = this.handleArtistChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    console.log(data);
    delete data.categories;
    console.log(data);

    const songUrl = "http://localhost:8000/api/songs";
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const songResponse = await fetch(songUrl, fetchOptions);
    if (songResponse.ok) {
      const newSong = await songResponse.json();
      console.log(newSong);

      const cleared = {
        title: "",
        artist: "",
        category: "",
      };
      this.setState(cleared);
    }
  }

  async componentDidMount() {
    const url = "http://localhost:8000/api/categories/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ categories: data.categories });
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

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a song</h1>
            <form onSubmit={this.handleSubmit} id="create-automobile-form">
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
              <div className="mb-3">
                <select
                  value={this.state.category}
                  onChange={this.handleCategoryChange}
                  required
                  name="category"
                  id="category"
                  className="form-select"
                >
                  <option value="category">Choose a category</option>
                  {this.props.categories.categories.map(cat => {
                    return (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    );
                  })}
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

export default AddSongForm;
