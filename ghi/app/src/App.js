import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import SongRequestPage from "./SongRequestPage";
import AddSongForm from "./AddSongForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="song_requests/" element={<SongRequestPage />} />
          <Route path="add_song/" element={<AddSongForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
