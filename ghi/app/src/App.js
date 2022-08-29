import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import SongRequestPage from "./SongRequestPage";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="song_requests/" element={<SongRequestPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
