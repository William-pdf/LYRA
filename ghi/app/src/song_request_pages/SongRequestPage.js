import React from "react";
import { Container, Row, Col } from "react-grid";

class SongRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next_song: "",
      most_requested: "",
      search: "",
      requests: [],
      songs: [],
    };
    this.handleQueue = this.handleQueue.bind(this);
    this.handleUnqueue = this.handleUnqueue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // async componentDidMount() {
  //   const response = await fetch("http://localhost:8000/api/songs/");
  //   if (response.ok) {
  //     const data = await response.json();
  //   }
  // }

  async handleQueue(song) {
    console.log(song);
    const url = `http://localhost:8000/api/songs/${song}`;
    const requestOption = {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        credentials: 
      },

    };
    const response = await fetch(url, requestOption);
    if (response.ok) {
      const data = await response.json();
      const updatedList = [...this.state.songs];
      let index = updatedList.indexOf(song);
      const queuedSong = updatedList.splice(index, 1);
      this.setState({ songs: updatedList });
    }
  }

  async handleUnqueue(song) {
    console.log(song);
    const songsUrl = `http://localhost:8080/api/songs/${song}/`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(song),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  handleSearchChange(event) {
    const value = event.target.value;
    this.setState({ search: value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const songs_list = this.state.songs.filter((song) => {
      return song.name === this.state.name;
    });
    this.setState({ songs: songs_list });
  }

  render() {
    return (
      <>
        <h1>Request a song</h1>
        <form onSubmit={this.handleSubmit} id="song_list">
          <div className="main-search-input-wrap">
            <div className="main-search-input fl-wrap">
              <div className="main-search-input-item">
                <input
                  onChange={this.handleSearchChange}
                  value={this.state.search}
                  type="text"
                  placeholder="Search song"
                  requiredtype="text"
                  name="search"
                  id="search"
                />
              </div>
              <button className="main-search-button">Search</button>
            </div>
          </div>
        </form>
        <Container>
          <Row>
            <Col />
            <table>
              <thead>
                <tr>
                  <th>Songs</th>
                </tr>
              </thead>
              <tbody>
                {this.state.songs.map((song) => {
                  return (
                    <tr key={song.name}>
                      <td>{song.name}</td>
                      <td>
                        <button
                          onClick={() => this.handleQueue(song.id)}
                          type="button"
                          className="btn btn-danger"
                        >
                          Queue
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Col />
            <table>
              <thead>
                <tr>
                  <th>Next up</th>
                </tr>
              </thead>
              <tbody>
                {this.state.songs.map((song) => {
                  return (
                    <tr key={song.name}>
                      <td>{song.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Row>
        </Container>
      </>
    );
  }
}

export default SongRequests;
