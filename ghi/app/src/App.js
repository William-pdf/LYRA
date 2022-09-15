import "./App.css";
import { AuthProvider } from "./useToken";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./nav/Nav";
import AddSongFormWrapper from "./song_request_pages/AddSongForm";
import ArtistFacingRequestPage from "./song_request_pages/ArtistFacingRequestPage";
import LandingPage from "./main_page/LandingPage";
import UserCatalog from "./song_request_pages/UserCatalogPage";
import EditSong from "./song_request_pages/EditSongPage";
import Login from "./Auth/Login";
import UserHome from "./Auth/UserHome";
import Signup from "./Auth/Signup";
import SongRequestsPage from "./song_request_pages/SongRequestPage";
import Footer from './Footer/footer'

function App() {
  
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  return (
    <div className="page-container">
      <BrowserRouter basename={basename}>
        <AuthProvider>
          <Nav />
          <div className="content-wrap">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="catalog/">
                <Route index element={<UserCatalog/>} />
                <Route
                  path="add/"
                  element={<AddSongFormWrapper/>}
                />
                <Route
                  path=":songNav/"
                  element={<EditSong/>}
                />
              </Route>
              <Route path="requests/">
                <Route
                  index
                  element={<ArtistFacingRequestPage/>}
                />
                <Route
                  path=":ownerArtist/"
                  element={
                    <SongRequestsPage/>}
                />
              </Route>
              <Route path="signup/" element={<Signup />} />
              <Route path="login/" element={<Login />} />
              <Route path="account/" element={<UserHome />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
