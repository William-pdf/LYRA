import "./App.css";
import { AuthProvider } from "./useToken";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserHome from "./AuthDemo/UserHome";
import AuthDemo from "./AuthDemo/AuthDemo";
import Nav from "./Nav";
import SongRequestPage from "./SongRequestPage";
import AddSongForm from "./AddSongForm";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="song_requests/" element={<SongRequestPage />} />
          <Route path="add_song/" element={<AddSongForm />} />
          <Route path="login/" element={<AuthDemo />} />
          <Route path="user_home/" element={<UserHome />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
